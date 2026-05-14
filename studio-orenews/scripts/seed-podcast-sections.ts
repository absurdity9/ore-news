/**
 * Generic chaptered-transcript seeder.
 *
 * Reads a markdown file shaped like Cragglebear's transcript (`# Title`,
 * speaker lines, `## Heading` chapter markers), pairs each chapter with the
 * earliest matching utterance in a whisper `full.json` captions file to
 * derive a timestamp, and patches the matching podcast doc's `sections`.
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/seed-podcast-sections.ts \
 *     --episode 4 \
 *     --transcript scripts/data/madhatter-transcript.md \
 *     --captions   scripts/data/madhatter-full.json \
 *     [--dry-run]
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const args = process.argv.slice(2)
const getArg = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}
const dryRun = args.includes('--dry-run')
const episodeStr = getArg('episode')
const transcriptArg = getArg('transcript')
const captionsArg = getArg('captions')
const show = getArg('show') ?? 'ore-insiders'

if (!episodeStr || !transcriptArg || !captionsArg) {
  console.error(
    'Usage: tsx scripts/seed-podcast-sections.ts --episode <N> --transcript <path.md> --captions <path.json> [--show ore-insiders] [--dry-run]',
  )
  process.exit(1)
}

const episode = Number(episodeStr)
const transcriptPath = resolve(__dirname, '..', transcriptArg)
const captionsPath = resolve(__dirname, '..', captionsArg)

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN ?? process.env.SANITY_TOKEN,
  useCdn: false,
})

interface ParsedSection {
  heading: string
  paragraphs: string[]
}

function parseMarkdown(md: string): ParsedSection[] {
  const lines = md.split('\n')
  const sections: ParsedSection[] = []
  let current: ParsedSection | null = null
  let buffer: string[] = []

  const flush = () => {
    if (!current) return
    const text = buffer.join('\n').trim()
    buffer = []
    if (!text) return
    text
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n/g, ' ').trim())
      .filter(Boolean)
      .forEach((p) => current!.paragraphs.push(p))
  }

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      flush()
      current = {heading: h2[1], paragraphs: []}
      sections.push(current)
      continue
    }
    if (line.startsWith('# ')) continue
    if (line.trim() === '---') continue
    if (!current) continue
    buffer.push(line)
  }
  flush()
  return sections
}

interface Caption {
  text: string
  startMs: number
  durationMs: number
}

function loadCaptions(path: string): Caption[] {
  const raw = JSON.parse(readFileSync(path, 'utf-8'))
  return raw.map((c: any) => ({text: c.text, startMs: c.startMs, durationMs: c.durationMs}))
}

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .replace(/\*\*[^*]+:\*\*/g, '') // strip "**Speaker:**" prefix
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

function tryMatch(needleWordsAll: string[], captions: Caption[], searchFromMs: number): number | undefined {
  for (const len of [10, 8, 6, 5, 4]) {
    if (needleWordsAll.length < len) continue
    const needle = needleWordsAll.slice(0, len).join(' ')
    for (let i = 0; i < captions.length; i++) {
      if (captions[i].startMs < searchFromMs) continue
      let combined = ''
      for (let j = i; j < Math.min(captions.length, i + 16); j++) {
        combined += ' ' + normalize(captions[j].text)
        if (combined.trim().length > needle.length + 300) break
        if (combined.includes(needle)) return Math.floor(captions[i].startMs / 1000)
      }
    }
  }
  return undefined
}

function findTimestamp(paragraphs: string[], captions: Caption[], searchFromMs: number): number | undefined {
  for (const para of paragraphs.slice(0, 3)) {
    const words = normalize(para).split(' ').filter(Boolean)
    const ts = tryMatch(words, captions, searchFromMs)
    if (typeof ts === 'number') return ts
  }
  return undefined
}

let keyCounter = 0
const key = () => `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`

const paragraphsToBlocks = (paragraphs: string[]) =>
  paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [],
    children: [{_type: 'span' as const, _key: key(), text, marks: []}],
  }))

async function main() {
  if (!process.env.SANITY_API_TOKEN && !process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_API_TOKEN env var')
  }

  const md = readFileSync(transcriptPath, 'utf-8')
  const parsed = parseMarkdown(md)
  const captions = loadCaptions(captionsPath)

  console.log(`Parsed ${parsed.length} sections from ${transcriptPath}`)
  console.log(`Loaded ${captions.length} caption utterances from ${captionsPath}`)

  let lastTimestampMs = 0
  const sections = parsed.map((s, i) => {
    let ts = findTimestamp(s.paragraphs, captions, lastTimestampMs)
    if (typeof ts !== 'number' && i === 0) ts = 0
    if (typeof ts === 'number') lastTimestampMs = ts * 1000
    const label = typeof ts === 'number' ? `${ts}s` : '—'
    console.log(`  [${String(label).padStart(7)}]  ${s.heading}  (${s.paragraphs.length} paragraphs)`)
    return {
      _type: 'section',
      _key: key(),
      heading: s.heading,
      timestamp: ts,
      body: paragraphsToBlocks(s.paragraphs),
    }
  })

  const target: {_id: string; title: string} | null = await client.fetch(
    `*[_type == "podcast" && show == $show && episode == $episode][0]{_id, title}`,
    {show, episode},
  )
  if (!target) {
    throw new Error(`No podcast doc found for show=${show} episode=${episode}`)
  }
  console.log(`\nTarget: ${target._id}  (${target.title})`)

  if (dryRun) {
    console.log('Dry-run — not patching.')
    return
  }

  await client.patch(target._id).set({sections}).unset(['transcript']).commit()
  console.log('Patched: sections set, flat transcript unset.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Mapping from markdown section heading → timestamp in seconds.
// Sections without a clean clip match leave timestamp undefined (TOC scroll only).
const TIMESTAMPS: Record<string, number | undefined> = {
  'Introduction': 0,
  'Compound ORE & the Mine Master Competition': 261,
  "Spuddy's Secret Development Mode & Lotto Mining": 443,
  "Craggle Bear's First Exposure to Bitcoin (2015)": 684,
  "Brian's Early Mining Story": undefined,
  'Why ORE: Fair Distribution & No VCs': undefined,
  "Craggle Bear's Crypto Journey: From Coinbase to Solana": 1129,
  'The Meme Coin Reverse Midas Touch': undefined,
  'From NFTs to Meteora to ORE': 1385,
  'Joining MineMore': 1420,
  'Seeker Phone vs. Ethereum Phone': 1533,
  "The Pain of Ethereum's Fragmented Chains": undefined,
  "ORE's Staying Power in the Bear Market": 1796,
  "APY, Revenue & ORE's Long-Term Value": 1985,
  'DeFi Future of ORE': 2142,
  'The ORE Foundation & Community Marketing': 2472,
  'Mining Strategies & Sharing Knowledge': 2844,
  "Brian's Multi-Platform Mining Approach": 2976,
  'Splitting ORE Across Accounts': 3098,
  'Market Conditions & Holding Through Chaos': 3185,
  'Closing': undefined,
}

interface ParsedSection {
  heading: string
  paragraphs: string[]
}

function parseMarkdown(md: string): ParsedSection[] {
  const lines = md.split('\n')
  const sections: ParsedSection[] = []
  let current: ParsedSection | null = null
  let buffer: string[] = []

  const flushBuffer = () => {
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
      flushBuffer()
      current = {heading: h2[1], paragraphs: []}
      sections.push(current)
      continue
    }
    if (line.startsWith('# ')) continue
    if (line.trim() === '---') continue
    if (!current) continue
    buffer.push(line)
  }
  flushBuffer()
  return sections
}

let keyCounter = 0
function key(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [],
    children: [{_type: 'span' as const, _key: key(), text, marks: []}],
  }))
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var')
  }
  const dryRun = process.argv.includes('--dry-run')

  const mdPath = resolve(__dirname, 'data/cragglebear-transcript.md')
  const md = readFileSync(mdPath, 'utf-8')
  const parsed = parseMarkdown(md)

  console.log(`Parsed ${parsed.length} sections from markdown:`)
  for (const s of parsed) {
    const ts = TIMESTAMPS[s.heading]
    const tsLabel = typeof ts === 'number' ? `${ts}s` : '—'
    console.log(`  [${tsLabel.padStart(6)}]  ${s.heading}  (${s.paragraphs.length} paragraphs)`)
  }

  const missingKeys = parsed.filter((s) => !(s.heading in TIMESTAMPS)).map((s) => s.heading)
  if (missingKeys.length) {
    throw new Error(
      `Headings parsed from markdown not in TIMESTAMPS map:\n  - ${missingKeys.join('\n  - ')}`,
    )
  }

  const sections = parsed.map((s) => ({
    _type: 'section',
    _key: key(),
    heading: s.heading,
    timestamp: TIMESTAMPS[s.heading],
    body: paragraphsToBlocks(s.paragraphs),
  }))

  const target: {_id: string; title: string} | null = await client.fetch(
    `*[_type == "podcast" && show == "ore-insiders" && episode == 2][0]{_id, title}`,
  )
  if (!target) {
    throw new Error('No Ore Insiders Ep. 2 podcast document found in Sanity')
  }
  console.log(`\nTarget: ${target._id}  (${target.title})`)

  if (dryRun) {
    console.log('Dry-run — would patch sections (count =', sections.length, ')')
    return
  }

  await client.patch(target._id).set({sections}).commit()
  console.log('Patched.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

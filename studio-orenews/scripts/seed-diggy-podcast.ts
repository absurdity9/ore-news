import {createClient} from '@sanity/client'
import {readFileSync, createReadStream} from 'fs'
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

// Section heading → seek timestamp (seconds into the YouTube video).
// Sections without a clean YouTube-meta match are left undefined: TOC scrolls but doesn't seek.
const TIMESTAMPS: Record<string, number | undefined> = {
  'Introduction': 0,
  "Diggy's Crypto Journey: From Cardano NFTs to Solana": 59,
  'Buying ORE at $11 & the $700 Pump Vacation': 276,
  'Explaining ORE to Newcomers': 326,
  'The ORE Foundation & Future Growth': 564,
  'ORE as a Slot Machine Everybody Owns': 664,
  'Community Education & Onboarding Tools': 850,
  'Exploring the ORE Ecosystem': undefined,
  'Solana vs. Ethereum & Should ORE Expand?': 1050,
  'Liquidity, Staking & DeFi Strategies': 1200,
  'The Churn Debate: Renters & Short-Term Miners': 1392,
  'Security, Attack Surface & the Drift Exploit': 1800,
  'No VCs, No KOLs & Organic Growth': 2122,
  "Solana's Maturation: From NFTs to Memes to Store of Value": 2378,
  'Market Conditions & Conviction Investing': 2544,
  'El Dorado & the Future of ORE': undefined,
  'V4 Speculation & Copycats': 3132,
  'Closing': 3402,
}

const SLUG = 'ep-5-diggys-ore-journey-11-buy-700-pump-leaving-his-ledger-at-home'
const TITLE = "Diggy's ORE Journey: $11 Buy, $700 Pump & Leaving His Ledger at Home"
const EPISODE = 5
const SHOW = 'ore-insiders'
const VIDEO_ID = 'KQcR1SS2sCs'
const URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`
const PUBLISHED_AT = '2026-05-05'
const COLOR = '#9e4aff' // Purple — completes the triadic rotation of the other 4 episodes
const DESCRIPTION = `MineMore Insiders Chat with Diggy — an Australian miner who discovered ORE through the Solana NFT community and Monkey DAO. Brian hosts as Diggy shares his crypto journey from Cardano NFTs to Solana, buying ORE at $11, and why he sees it as the long-term store of value on Solana. They cover mining strategies, the churn debate, security vs. PerpDexes, why ORE doesn't need KOLs or VCs, and what El Dorado and V4 could mean for the ecosystem.

🎙️ Host: Brian
🎤 Guest: Diggy
📍 MineMore Insiders Chat`

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

  const mdPath = resolve(__dirname, 'data/diggy-transcript.md')
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

  const existing: {_id: string; title: string} | null = await client.fetch(
    `*[_type == "podcast" && slug.current == $slug][0]{_id, title}`,
    {slug: SLUG},
  )
  if (existing) {
    throw new Error(
      `Podcast doc already exists for slug "${SLUG}": ${existing._id} (${existing.title}). Delete it first or change SLUG.`,
    )
  }

  if (dryRun) {
    console.log('\nDry-run — would create podcast doc:')
    console.log(`  title:        ${TITLE}`)
    console.log(`  slug:         ${SLUG}`)
    console.log(`  episode:      ${EPISODE}`)
    console.log(`  show:         ${SHOW}`)
    console.log(`  videoId:      ${VIDEO_ID}`)
    console.log(`  color:        ${COLOR}`)
    console.log(`  publishedAt:  ${PUBLISHED_AT}`)
    console.log(`  thumbnail:    diggy-main.png (would upload)`)
    console.log(`  sections:     ${sections.length}`)
    return
  }

  console.log('\nUploading thumbnail...')
  const thumbnailPath = resolve(__dirname, 'data/diggy-main.png')
  const thumbnailAsset = await client.assets.upload('image', createReadStream(thumbnailPath), {
    filename: 'diggy-main.png',
  })
  console.log(`  -> asset ${thumbnailAsset._id}`)

  console.log('Creating podcast document...')
  const doc = await client.create({
    _type: 'podcast',
    title: TITLE,
    slug: {_type: 'slug', current: SLUG},
    episode: EPISODE,
    show: SHOW,
    description: DESCRIPTION,
    color: COLOR,
    videoId: VIDEO_ID,
    url: URL,
    publishedAt: PUBLISHED_AT,
    thumbnail: {
      _type: 'image',
      asset: {_type: 'reference', _ref: thumbnailAsset._id},
    },
    sections,
  })
  console.log(`Created: ${doc._id}`)
  console.log(`Visit: https://orenews.supply/podcast.html?slug=${SLUG}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

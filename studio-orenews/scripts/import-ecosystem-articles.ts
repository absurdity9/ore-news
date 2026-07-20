/**
 * Import long-form ecosystem articles (MH, Starship Fronk, Wisemen) into Sanity.
 *
 * Usage (from studio-orenews/):
 *   SANITY_TOKEN=... npx tsx scripts/import-ecosystem-articles.ts
 *
 * Idempotent: skips articles whose slug already exists.
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const TW_EPOCH = 1288834974657

const AUTHORS = [
  {
    key: 'mh',
    name: 'MH',
    xHandle: '@pokerchessman',
    xUrl: 'https://x.com/pokerchessman',
  },
  {
    key: 'starship-fronk',
    name: 'Starship Fronk',
    xHandle: '@Starship_Fronk',
    xUrl: 'https://x.com/Starship_Fronk',
  },
  {
    key: 'wisemen',
    name: 'Wisemen',
    xHandle: '@Wisemenmentors',
    xUrl: 'https://x.com/Wisemenmentors',
  },
] as const

type AuthorKey = (typeof AUTHORS)[number]['key']

interface ArticleSpec {
  docId: string
  authorKey: AuthorKey
  /** Preferred original X post URL (from the "X link:" line). */
  xUrl: string
  /** Optional override if the Google Doc title is messy. */
  titleOverride?: string
  tags?: string[]
}

const ARTICLES: ArticleSpec[] = [
  {
    docId: '1N4C3sEpekwBBfXCjXnHgs5NUQ3bnSiz9HkcWuwU6rOI',
    authorKey: 'mh',
    xUrl: 'https://x.com/pokerchessman/status/2014418635469783256',
  },
  {
    docId: '1dC7AbxbyOKLVJt7rKqkJb3brcHdjj2oWB5R5msgwOMA',
    authorKey: 'mh',
    xUrl: 'https://x.com/pokerchessman/status/2032893011651096863',
  },
  {
    docId: '1oAYrIhPxf-XtKef5nK4zoqDxQlDcdgJ-6wxCUUXm3u8',
    authorKey: 'mh',
    xUrl: 'https://x.com/pokerchessman/status/2078150343548907963',
  },
  {
    docId: '1Gza6mV0bZDEYku1N6x2L7umlUVmRvj5QPfDpHMYFH9g',
    authorKey: 'starship-fronk',
    xUrl: 'https://x.com/Starship_Fronk/status/2076325688454365391',
  },
  {
    docId: '1b0k2IOb3wh29NR9ypx0eBj_0D6Gxm-WwM8vRgs5qriY',
    authorKey: 'starship-fronk',
    xUrl: 'https://x.com/Starship_Fronk/status/2073851634946281896',
  },
  {
    docId: '1bCCH86CvS77y3eiVJEAjSouFnT2-_iu9945bNJ8ZZ2k',
    authorKey: 'mh',
    xUrl: 'https://x.com/pokerchessman/status/2071445196403798175',
  },
  {
    docId: '1V4NmZ3m6n_GYeAfHRqBWE1vzs2AW9jdwlJqguJV12ZY',
    authorKey: 'starship-fronk',
    xUrl: 'https://x.com/Starship_Fronk/status/2066240576232866202',
  },
  {
    docId: '1nP_M2aGiWos64fJHlm17q-Jv-6Abt_ZLCN39cmw-pQE',
    authorKey: 'starship-fronk',
    xUrl: 'https://x.com/Starship_Fronk/status/2071279631320105108',
  },
  {
    docId: '1fOmfHyEaukE3WuZV7eMnqFQ41VH2SyrtfQHQ48g3_Ts',
    authorKey: 'mh',
    xUrl: 'https://x.com/pokerchessman/status/2051371747752976486',
  },
  {
    docId: '1BvLWx_nNq5g4EPp5HDHioCbYw6nzVOL-Rb6Oz9Cy480',
    authorKey: 'wisemen',
    xUrl: 'https://x.com/Wisemenmentors/status/2066735255663374524',
  },
  {
    docId: '1ipoDiEfDa1Kmmb7Zku_QVb8ti6Evola8qN-rH65HLYE',
    authorKey: 'wisemen',
    xUrl: 'https://x.com/Wisemenmentors/status/2061267182403592346',
  },
  {
    docId: '1w4IXuIBdWMPKRkix-iruFpEDCyvPTRORSK0gc20xkVg',
    authorKey: 'wisemen',
    xUrl: 'https://x.com/Wisemenmentors/status/2054251908026585492',
  },
]

let keyCounter = 0
function key(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [] as [],
    children: [{_type: 'span' as const, _key: key(), text, marks: [] as string[]}],
  }))
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

function publishedAtFromXUrl(xUrl: string): string {
  const id = xUrl.split('/').pop()?.split('?')[0]
  if (!id || !/^\d+$/.test(id)) return new Date().toISOString()
  const ms = (BigInt(id) >> 22n) + BigInt(TW_EPOCH)
  return new Date(Number(ms)).toISOString()
}

function parseDocText(raw: string): {title: string; paragraphs: string[]; xUrl?: string} {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim()
  const lines = text.split('\n')

  // Prefer the explicit "X link:" line (last one wins if multiple)
  let xUrl: string | undefined
  for (const line of lines) {
    const m = line.match(/X\s*link:\s*(https:\/\/x\.com\/\S+)/i)
    if (m) xUrl = m[1].replace(/[.,;)]+$/, '')
  }

  // Drop trailing editorial footer (dashes + X link / signatures)
  const cleanedLines: string[] = []
  for (const line of lines) {
    if (/^[—\-]{3,}\s*$/.test(line.trim())) break
    if (/^X\s*link:/i.test(line.trim())) break
    cleanedLines.push(line)
  }

  // Title = first non-empty line
  let title = ''
  let bodyStart = 0
  for (let i = 0; i < cleanedLines.length; i++) {
    const t = cleanedLines[i].trim()
    if (t) {
      title = t
      bodyStart = i + 1
      break
    }
  }

  // Collapse into paragraphs on blank lines; drop trailing signature-ish lines
  const paras: string[] = []
  let buf: string[] = []
  const flush = () => {
    const p = buf.join(' ').replace(/\s+/g, ' ').trim()
    if (p) paras.push(p)
    buf = []
  }
  for (let i = bodyStart; i < cleanedLines.length; i++) {
    const line = cleanedLines[i]
    if (!line.trim()) {
      flush()
      continue
    }
    // Skip lone signature lines at the end
    if (/^(-The Wisemen|^-Wisemen|^Hardhats stay on!)/i.test(line.trim()) && i > cleanedLines.length - 6) {
      continue
    }
    buf.push(line.trim())
  }
  flush()

  return {title, paragraphs: paras, xUrl}
}

async function fetchDoc(docId: string): Promise<string> {
  const url = `https://docs.google.com/document/d/${docId}/export?format=txt`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch Google Doc ${docId}: HTTP ${res.status}`)
  return res.text()
}

async function ensureAuthor(spec: (typeof AUTHORS)[number]): Promise<string> {
  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "author" && (xHandle == $handle || name == $name)][0]{ _id }`,
    {handle: spec.xHandle, name: spec.name},
  )
  if (existing?._id) {
    await client
      .patch(existing._id)
      .set({
        name: spec.name,
        xHandle: spec.xHandle,
        xUrl: spec.xUrl,
      })
      .commit()
    console.log(`Author exists: ${spec.name} (${existing._id})`)
    return existing._id
  }

  const created = await client.create({
    _type: 'author',
    name: spec.name,
    xHandle: spec.xHandle,
    xUrl: spec.xUrl,
  })
  console.log(`Author created: ${spec.name} (${created._id})`)
  return created._id
}

async function ensureTag(title: string): Promise<string> {
  const slug = slugify(title)
  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "tag" && slug.current == $slug][0]{ _id }`,
    {slug},
  )
  if (existing?._id) return existing._id
  const created = await client.create({
    _type: 'tag',
    title,
    slug: {_type: 'slug', current: slug},
  })
  return created._id
}

function makeExcerpt(paragraphs: string[]): string {
  const text = paragraphs.join(' ').replace(/\s+/g, ' ').trim()
  if (text.length <= 220) return text
  return text.slice(0, 220).replace(/\s+\S*$/, '') + '…'
}

async function importOne(
  spec: ArticleSpec,
  authorIds: Record<AuthorKey, string>,
): Promise<'created' | 'skipped'> {
  const raw = await fetchDoc(spec.docId)
  const parsed = parseDocText(raw)
  const title = (spec.titleOverride || parsed.title).trim()
  const slug = slugify(title)
  const xUrl = spec.xUrl || parsed.xUrl
  const sourceDocUrl = `https://docs.google.com/document/d/${spec.docId}/edit`
  const publishedAt = publishedAtFromXUrl(xUrl || '')
  const paragraphs = parsed.paragraphs

  if (!title || paragraphs.length === 0) {
    throw new Error(`Empty content for doc ${spec.docId}`)
  }

  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "article" && slug.current == $slug][0]{ _id }`,
    {slug},
  )
  if (existing?._id) {
    console.log(`Skip (exists): ${title} → ${slug}`)
    return 'skipped'
  }

  const tagTitles = spec.tags || ['ORE', 'Ecosystem']
  const tagIds = await Promise.all(tagTitles.map(ensureTag))

  const introParas = paragraphs
  const doc = {
    _type: 'article',
    title,
    slug: {_type: 'slug', current: slug},
    eyebrow: 'Article',
    excerpt: makeExcerpt(paragraphs),
    publishedAt,
    author: {_type: 'reference', _ref: authorIds[spec.authorKey]},
    tags: tagIds.map((id) => ({_type: 'reference', _ref: id, _key: id.slice(-8)})),
    intro: toBlocks(introParas),
    sections: [],
    xUrl,
    sourceDocUrl,
    metaDescription: makeExcerpt(paragraphs),
    keywords: ['ORE', 'Solana', ...tagTitles],
  }

  const created = await client.create(doc)
  console.log(`Created: ${title} (${created._id}) — ${slug}`)
  return 'created'
}

async function main() {
  if (!process.env.SANITY_TOKEN && !process.env.SANITY_API_TOKEN) {
    throw new Error(
      'Set SANITY_TOKEN (or SANITY_API_TOKEN) env var with write access to project w9x60sjf',
    )
  }

  console.log('Ensuring authors…')
  const authorIds = {} as Record<AuthorKey, string>
  for (const a of AUTHORS) {
    authorIds[a.key] = await ensureAuthor(a)
  }

  let created = 0
  let skipped = 0
  for (const spec of ARTICLES) {
    const result = await importOne(spec, authorIds)
    if (result === 'created') created++
    else skipped++
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, total ${ARTICLES.length}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

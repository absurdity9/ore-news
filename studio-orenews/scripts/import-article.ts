import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const AUTHOR_ID = 'OE33piSrLEszcsMfOuQKLu'
const TAG_IDS = [
  'Aw0ws0oWa8IaFM3iGyA4L7', // Auto Miners
  'Aw0ws0oWa8IaFM3iGyA55P', // Motherlode
  'OE33piSrLEszcsMfOuQMdb', // Protocol Updates
  'OE33piSrLEszcsMfOuQNQB', // Community
  'iG7LJCIXmUyigSDTCexDGc', // DeFi
  'iG7LJCIXmUyigSDTCexDpE', // Privacy
  'Aw0ws0oWa8IaFM3iIB0i4z', // stORE
  'iG7LJCIXmUyigSDTCuHTNS', // Mining Strategies
  'iG7LJCIXmUyigSDTCuHTfE', // Governance
  'iG7LJCIXmUyigSDTCuHTiy', // Metrics
]

export interface ArticleInput {
  title: string
  slug: string
  eyebrow?: string
  subtitle?: string
  publishedAt: string
  intro: string[]
  sections: {heading: string; date?: string; body: string[]}[]
  xUrl?: string
  metaDescription?: string
  keywords?: string[]
}

export interface MagazineInput {
  title: string
  week: string
  publishedAt: string
  url: string
}

let keyCounter = 0
function key(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [],
    children: [{_type: 'span' as const, _key: key(), text, marks: []}],
  }))
}

export async function importArticle(article: ArticleInput, magazine: MagazineInput) {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var (create at https://www.sanity.io/manage)')
  }

  const articleDoc = {
    _type: 'article',
    title: article.title,
    slug: {_type: 'slug', current: article.slug},
    eyebrow: article.eyebrow,
    subtitle: article.subtitle,
    publishedAt: article.publishedAt,
    author: {_type: 'reference', _ref: AUTHOR_ID},
    tags: TAG_IDS.map((id) => ({_type: 'reference', _ref: id, _key: id.slice(-8)})),
    intro: toBlocks(article.intro),
    sections: article.sections.map((s) => ({
      _type: 'section',
      _key: key(),
      heading: s.heading,
      date: s.date,
      body: toBlocks(s.body),
    })),
    xUrl: article.xUrl,
    metaDescription: article.metaDescription,
    keywords: article.keywords,
  }

  console.log('Creating article:', article.title)
  const createdArticle = await client.create(articleDoc)
  console.log('Article created:', createdArticle._id)

  const magazineDoc = {
    _type: 'magazine',
    title: magazine.title,
    week: magazine.week,
    publishedAt: magazine.publishedAt,
    url: magazine.url,
    article: {_type: 'reference', _ref: createdArticle._id},
  }

  console.log('Creating magazine:', magazine.title)
  const createdMagazine = await client.create(magazineDoc)
  console.log('Magazine created:', createdMagazine._id)

  console.log('\nDone! Remember to add the cover image in Sanity Studio.')
  return {articleId: createdArticle._id, magazineId: createdMagazine._id}
}

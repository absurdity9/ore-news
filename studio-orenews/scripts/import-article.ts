import {createClient} from '@sanity/client'
import {createReadStream} from 'fs'
import {basename} from 'path'

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
  /** Set to "The MineShaft Weekly" for the article to appear on the newsstand. */
  eyebrow?: string
  subtitle?: string
  publishedAt: string
  /** Local path to the newsstand cover image (~2.5:1 landscape banner). Required for the shelf. */
  cover?: string
  intro: string[]
  sections: {heading: string; date?: string; body: string[]}[]
  /** Link to the X / Twitter thread for this issue. */
  xUrl?: string
  metaDescription?: string
  keywords?: string[]
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

export async function importArticle(article: ArticleInput) {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var (create at https://www.sanity.io/manage)')
  }

  let cover: {_type: 'image'; asset: {_type: 'reference'; _ref: string}} | undefined
  if (article.cover) {
    console.log('Uploading cover:', article.cover)
    const asset = await client.assets.upload('image', createReadStream(article.cover), {
      filename: basename(article.cover),
    })
    cover = {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
    console.log('Cover uploaded:', asset._id)
  }

  const articleDoc = {
    _type: 'article',
    title: article.title,
    slug: {_type: 'slug', current: article.slug},
    eyebrow: article.eyebrow,
    subtitle: article.subtitle,
    cover,
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

  if (cover) {
    console.log('\nDone! Article is on the newsstand (eyebrow + cover set).')
  } else {
    console.log('\nDone! Add a Cover Image in Sanity Studio so it appears on the newsstand.')
  }
  return {articleId: createdArticle._id}
}

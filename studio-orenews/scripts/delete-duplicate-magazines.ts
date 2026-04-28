import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

interface Magazine {
  _id: string
  title: string
  week: string
  url: string
  publishedAt: string
  articleId: string | null
  articleXUrl: string | null
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var')
  }

  const allMagazines: Magazine[] = await client.fetch(`
    *[_type == "magazine"] | order(publishedAt desc) {
      _id,
      title,
      week,
      url,
      publishedAt,
      "articleId": article->_id,
      "articleXUrl": article->xUrl
    }
  `)

  const withArticle = allMagazines.filter((m) => m.articleId)
  const withoutArticle = allMagazines.filter((m) => !m.articleId)

  console.log(`Total magazines: ${allMagazines.length}`)
  console.log(`With article reference: ${withArticle.length}`)
  console.log(`Without article reference (duplicates): ${withoutArticle.length}\n`)

  for (const dup of withoutArticle) {
    const match = withArticle.find((m) => m.publishedAt === dup.publishedAt)

    if (!match) {
      console.log(`⚠ No match for "${dup.title}" (${dup.publishedAt}) — skipping`)
      continue
    }

    console.log(`"${dup.title}" (${dup.publishedAt})`)
    console.log(`  → matched article: ${match.articleId}`)
    console.log(`  → X URL to save: ${dup.url}`)

    if (match.articleXUrl) {
      console.log(`  → article already has xUrl: ${match.articleXUrl} — skipping patch`)
    } else {
      await client.patch(match.articleId!).set({xUrl: dup.url}).commit()
      console.log(`  → patched xUrl on article`)
    }

    await client.delete(dup._id)
    console.log(`  → deleted duplicate magazine ${dup._id}\n`)
  }

  console.log('Done!')
}

main()

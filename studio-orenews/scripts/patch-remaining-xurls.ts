import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const patches: {slug: string; xUrl: string}[] = [
  {slug: 'the-mineshaft-weekly-the-mines-are-revenue-specialists', xUrl: 'https://x.com/zinnresearch/status/2047736741931704502'},
  {slug: 'the-mineshaft-weekly-more-platforms-integrate-ore', xUrl: 'https://x.com/zinnresearch/status/2045249146211258832'},
  {slug: 'the-mineshaft-weekly-more-composability', xUrl: 'https://x.com/zinnresearch/status/2019876172998275123'},
  {slug: 'the-mineshaft-weekly-a-new-ath-for-the-motherlode', xUrl: 'https://x.com/zinnresearch/status/2017332329644278225'},
  {slug: 'the-mineshaft-weekly-yields-galore', xUrl: 'https://x.com/zinnresearch/status/2014789030886441308'},
  {slug: 'the-mineshaft-weekly-ii-ores-chat-is-back', xUrl: 'https://x.com/zinnresearch/status/2012237627538235564'},
]

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var')
  }

  for (const {slug, xUrl} of patches) {
    const article = await client.fetch(
      `*[_type == "article" && slug.current == $slug][0]{ _id, title }`,
      {slug},
    )

    if (!article) {
      console.log(`⚠ No article found for slug: ${slug}`)
      continue
    }

    await client.patch(article._id).set({xUrl}).commit()
    console.log(`✅ ${article.title}`)
    console.log(`   → ${xUrl}\n`)
  }

  console.log('Done!')
}

main()

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const newTags = [
  {title: 'stORE', slug: 'store'},
  {title: 'Mining Strategies', slug: 'mining-strategies'},
  {title: 'Governance', slug: 'governance'},
  {title: 'Metrics', slug: 'metrics'},
]

async function main() {
  console.log('Creating 4 new tags...')
  const createdTags = []
  for (const tag of newTags) {
    const doc = await client.create({
      _type: 'tag',
      title: tag.title,
      slug: {_type: 'slug', current: tag.slug},
    })
    console.log(`  Created tag: ${tag.title} (${doc._id})`)
    createdTags.push(doc)
  }

  const allTagIds = [
    'Aw0ws0oWa8IaFM3iGyA4L7', // Auto Miners
    'Aw0ws0oWa8IaFM3iGyA55P', // Motherlode
    'OE33piSrLEszcsMfOuQMdb', // Protocol Updates
    'OE33piSrLEszcsMfOuQNQB', // Community
    'iG7LJCIXmUyigSDTCexDGc', // DeFi
    'iG7LJCIXmUyigSDTCexDpE', // Privacy
    ...createdTags.map((t) => t._id),
  ]

  const articleId = 'OE33piSrLEszcsMfPyYgXf'
  const authorId = 'OE33piSrLEszcsMfOuQKLu'

  console.log('\nPatching article with author and all 10 tags...')
  await client
    .patch(articleId)
    .set({
      author: {_type: 'reference', _ref: authorId},
      tags: allTagIds.map((id) => ({_type: 'reference', _ref: id, _key: id.slice(-8)})),
    })
    .commit()

  console.log('Done!')
}

main()

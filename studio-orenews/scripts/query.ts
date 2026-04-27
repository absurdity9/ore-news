import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  const authors = await client.fetch('*[_type=="author"]')
  const tags = await client.fetch('*[_type=="tag"]')
  console.log('Authors:', JSON.stringify(authors, null, 2))
  console.log('Tags:', JSON.stringify(tags, null, 2))
}

main()

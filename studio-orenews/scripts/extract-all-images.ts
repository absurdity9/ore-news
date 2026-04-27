import {createClient} from '@sanity/client'
import {extractAndUploadImages} from './extract-and-upload-images'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Google Doc IDs in order of publication date (Jan 9 through Apr 24)
const GOOGLE_DOC_IDS = [
  '1RG_wOoc8MryqCJu8-EqEpIe05BMZgWsSCQ3Bp5ATUXg', // Jan 9
  '1ETiksWAP-t6ddpHQikFZbxVF3wO6nQFATZnZjrYtaUc', // Jan 16
  '1hypEouQGXC4rBQmwqUVIw0lFlTsgt6lulb53effACfs', // Jan 23
  '1sg2Celn85-QzeCsxJYEvUZwTpQII37Tm9vBD_p8NebE', // Jan 30
  '1lWKtu9Tsok5uqRbG5B5524yWDx3viwOWwEa93ydl8eI', // Feb 6
  '1LIm1mW_L9GxyJLBLFpsQDRh7zUx_ZjcJW9006ymIpxQ', // Feb 13
  '1EfF-VYiLzyiDiYKY72_8oRzIoSY3avyLVvCbdgAlrtc', // Feb 20
  '1GuPfi-qTu9GZa6alD7tgYQHWtxXjZ7Vhfu9_ZM8pRGE', // Feb 27
  '1vm1OToGs9yGHBxzbrsRyF_J3Ox7gW0P7YXsMq9JkleY', // Mar 6
  '1jTBxqzsNwZgHRduXinYfhyCaoCxqOzVMw5mKl5eTWBQ', // Mar 13
  '15rpTDANAg_Qj5zktXitj3ogsum_1u-cXWaKoQx_wMjM', // Mar 20
  '1dyMpiD4aPPrqxu4e8bz3EPTI3DiVBVMJYTJLer0nm6w', // Mar 27
  '1sgi8ia1gLuA4Ke7wW6JE4ppknUD0X6akEw3Y0cV0ZAg', // Apr 3
  '1LlyRNrpNdosgbLQsIzh9cl8vGMlLCXHsXpoWCDXizk4', // Apr 10
  '13xiB5vMtI1yIixcvBdQE--AZD-QTvd2aYM-NL5CRqRw', // Apr 17
  '1OKxecvWl--z4Wub6WeOCvt9KvFkXoSgagjgPUEufFqs', // Apr 24
]

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var (create at https://www.sanity.io/manage)')
  }

  // Fetch all articles ordered by publishedAt ascending
  console.log('Fetching all articles from Sanity...\n')
  const articles = await client.fetch<{_id: string; title: string; publishedAt: string; slug: string}[]>(
    `*[_type == "article"] | order(publishedAt asc) {
      _id, title, publishedAt,
      "slug": slug.current
    }`,
  )

  console.log(`Found ${articles.length} article(s):\n`)
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i]
    const docId = GOOGLE_DOC_IDS[i] || '(no doc ID)'
    console.log(`  ${i + 1}. [${a.publishedAt?.split('T')[0]}] "${a.title}" → Doc: ${docId.slice(0, 20)}...`)
  }

  if (articles.length !== GOOGLE_DOC_IDS.length) {
    console.warn(
      `\nWARNING: Found ${articles.length} articles but have ${GOOGLE_DOC_IDS.length} Google Doc IDs.`,
    )
    console.warn(`Will process the first ${Math.min(articles.length, GOOGLE_DOC_IDS.length)} articles.\n`)
  }

  const count = Math.min(articles.length, GOOGLE_DOC_IDS.length)

  for (let i = 0; i < count; i++) {
    const article = articles[i]
    const docId = GOOGLE_DOC_IDS[i]

    console.log(`\n${'='.repeat(80)}`)
    console.log(`Processing article ${i + 1}/${count}: "${article.title}"`)
    console.log(`  Sanity ID: ${article._id}`)
    console.log(`  Google Doc: ${docId}`)
    console.log(`${'='.repeat(80)}\n`)

    try {
      await extractAndUploadImages(docId, article._id)
    } catch (err) {
      console.error(`\nERROR processing article ${i + 1} ("${article.title}"):`, err)
      console.error('Continuing to next article...\n')
    }
  }

  console.log(`\n${'='.repeat(80)}`)
  console.log(`All done! Processed ${count} article(s).`)
  console.log(`${'='.repeat(80)}`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})

import {createClient} from '@sanity/client'
import {createReadStream, readdirSync} from 'fs'
import {resolve, extname, basename} from 'path'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const COVERS_DIR = resolve(new URL('.', import.meta.url).pathname, 'covers')

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp']

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var')
  }

  // Newsstand covers live on the article itself (eyebrow "The MineShaft Weekly").
  const articles = await client.fetch<{_id: string; title: string; publishedAt: string}[]>(
    `*[_type == "article" && eyebrow == "The MineShaft Weekly" && !defined(cover.asset)] | order(publishedAt asc) {
      _id, title, publishedAt
    }`
  )

  console.log(`${articles.length} article(s) missing covers:\n`)
  console.log('Date        | Expected filename')
  console.log('------------|------------------')
  for (const a of articles) {
    console.log(`${a.publishedAt.slice(0, 10)}  | ${a.publishedAt.slice(0, 10)}.png (or .jpg/.jpeg/.webp)`)
  }

  const files = readdirSync(COVERS_DIR).filter((f) => IMAGE_EXTS.includes(extname(f).toLowerCase()))

  if (files.length === 0) {
    console.log(`\nNo images found in ${COVERS_DIR}`)
    console.log(`Save cover images there using the publish date (YYYY-MM-DD) as filename, then re-run.`)
    return
  }

  console.log(`\nFound ${files.length} image(s) to upload:\n`)

  for (const file of files) {
    const date = basename(file, extname(file))
    const article = articles.find((a) => a.publishedAt.slice(0, 10) === date)

    if (!article) {
      console.log(`SKIP: ${file} — no article without a cover for date ${date}`)
      continue
    }

    console.log(`Uploading ${file} → "${article.title}"...`)
    const filePath = resolve(COVERS_DIR, file)
    const asset = await client.assets.upload('image', createReadStream(filePath), {filename: file})
    await client.patch(article._id).set({cover: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}}).commit()
    console.log(`  Done! Asset: ${asset._id}`)
  }

  console.log('\nAll covers uploaded.')
}

main()

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

  const magazines = await client.fetch<{_id: string; title: string; publishedAt: string; hasCover: boolean}[]>(
    `*[_type == "magazine" && !defined(cover.asset)] | order(publishedAt asc) {
      _id, title, publishedAt,
      "hasCover": defined(cover.asset)
    }`
  )

  console.log(`${magazines.length} magazine(s) missing covers:\n`)
  console.log('Date        | Expected filename')
  console.log('------------|------------------')
  for (const m of magazines) {
    console.log(`${m.publishedAt}  | ${m.publishedAt}.png (or .jpg/.jpeg/.webp)`)
  }

  const files = readdirSync(COVERS_DIR).filter((f) => IMAGE_EXTS.includes(extname(f).toLowerCase()))

  if (files.length === 0) {
    console.log(`\nNo images found in ${COVERS_DIR}`)
    console.log(`Save cover images there using the date as filename, then re-run.`)
    return
  }

  console.log(`\nFound ${files.length} image(s) to upload:\n`)

  for (const file of files) {
    const date = basename(file, extname(file))
    const mag = magazines.find((m) => m.publishedAt === date)

    if (!mag) {
      console.log(`SKIP: ${file} — no magazine without a cover for date ${date}`)
      continue
    }

    console.log(`Uploading ${file} → "${mag.title}"...`)
    const filePath = resolve(COVERS_DIR, file)
    const asset = await client.assets.upload('image', createReadStream(filePath), {filename: file})
    await client.patch(mag._id).set({cover: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}}).commit()
    console.log(`  Done! Asset: ${asset._id}`)
  }

  console.log('\nAll covers uploaded.')
}

main()

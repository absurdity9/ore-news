import {createClient} from '@sanity/client'
import {extractAndUploadImages} from './extract-and-upload-images'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var')
  }

  // Fix 1: Article 1 (Jan 9) — 1 image skipped due to heading "stORE - " vs "stORE — "
  // The image was uploaded but not inserted. Find and insert it.
  console.log('=== Fix 1: Article 1 heading mismatch ===\n')
  const article1Id = 'OE33piSrLEszcsMfPyYgXf'
  const article1 = await client.fetch<{sections: {_key: string; heading: string; body: any[]}[]}>(
    `*[_id == $id][0]{ sections }`,
    {id: article1Id},
  )
  const storeSection = article1.sections.find((s) => s.heading.includes('stORE'))
  if (storeSection) {
    const sectionIndex = article1.sections.indexOf(storeSection)
    // The image was for this section heading in the Google Doc:
    // "The big development of stORE - Ore's official liquid staking token."
    // It was the 2nd image in the doc (after the intro image which was prepended to this section).
    // We need to find the uploaded asset. Search recent image assets.
    const recentImages = await client.fetch<{_id: string; originalFilename: string}[]>(
      `*[_type == "sanity.imageAsset" && originalFilename == "article-image-1.png"] | order(_createdAt desc)[0...5]{ _id, originalFilename }`,
    )
    if (recentImages.length > 0) {
      // Check if this section already has images (from the prepended intro image)
      const existingImages = storeSection.body?.filter((b: any) => b._type === 'image') || []
      if (existingImages.length < 2) {
        const key = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
        const imageBlock = {
          _type: 'image',
          _key: key,
          asset: {_type: 'reference', _ref: recentImages[0]._id},
        }
        const body = [...(storeSection.body || []), imageBlock]
        await client.patch(article1Id).set({[`sections[${sectionIndex}].body`]: body}).commit()
        console.log(`  Appended image to section "${storeSection.heading}"`)
      } else {
        console.log(`  Section already has images, skipping`)
      }
    } else {
      console.log(`  Could not find the uploaded asset, skipping`)
    }
  }

  // Fix 2: Remove incorrectly inserted images from "The History of Ore"
  console.log('\n=== Fix 2: Clean up "The History of Ore" ===\n')
  const historyId = 'Aw0ws0oWa8IaFM3iGyAYLz'
  const historyArticle = await client.fetch<{sections: {_key: string; heading: string; body: any[]}[]}>(
    `*[_id == $id][0]{ sections }`,
    {id: historyId},
  )
  if (historyArticle?.sections) {
    let cleaned = false
    for (let i = 0; i < historyArticle.sections.length; i++) {
      const section = historyArticle.sections[i]
      const originalLen = section.body?.length || 0
      const filteredBody = (section.body || []).filter((b: any) => b._type !== 'image')
      if (filteredBody.length < originalLen) {
        await client.patch(historyId).set({[`sections[${i}].body`]: filteredBody}).commit()
        console.log(`  Removed ${originalLen - filteredBody.length} image(s) from "${section.heading}"`)
        cleaned = true
      }
    }
    if (!cleaned) console.log('  No images to remove')
  }

  // Fix 3: Re-run doc 15 images on the CORRECT article
  console.log('\n=== Fix 3: Doc 15 → "mORE platforms integrate Ore" ===\n')
  const doc15Id = '13xiB5vMtI1yIixcvBdQE--AZD-QTvd2aYM-NL5CRqRw'
  const correctArticle15Id = 'Aw0ws0oWa8IaFM3iIBFfg5'

  // First remove any incorrectly inserted images from doc 16's run
  const art15 = await client.fetch<{sections: {_key: string; heading: string; body: any[]}[]}>(
    `*[_id == $id][0]{ sections }`,
    {id: correctArticle15Id},
  )
  if (art15?.sections) {
    for (let i = 0; i < art15.sections.length; i++) {
      const section = art15.sections[i]
      const filteredBody = (section.body || []).filter((b: any) => b._type !== 'image')
      if (filteredBody.length < (section.body?.length || 0)) {
        await client.patch(correctArticle15Id).set({[`sections[${i}].body`]: filteredBody}).commit()
        console.log(`  Cleaned ${(section.body?.length || 0) - filteredBody.length} wrong image(s) from "${section.heading}"`)
      }
    }
  }
  await extractAndUploadImages(doc15Id, correctArticle15Id)

  // Fix 4: Run doc 16 images on the CORRECT article
  console.log('\n=== Fix 4: Doc 16 → "The Mines are Revenue specialists" ===\n')
  const doc16Id = '1OKxecvWl--z4Wub6WeOCvt9KvFkXoSgagjgPUEufFqs'
  const correctArticle16Id = 'iG7LJCIXmUyigSDTCuKMc4'
  await extractAndUploadImages(doc16Id, correctArticle16Id)

  console.log('\n=== All fixes applied! ===')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})

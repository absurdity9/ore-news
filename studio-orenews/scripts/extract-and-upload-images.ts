import {createClient} from '@sanity/client'
import {JSDOM} from 'jsdom'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

function generateKey(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

interface ImageInfo {
  index: number
  dataUri: string
  contentType: string
  sizeBytes: number
  sectionHeading: string | null // null = intro (before first heading)
}

interface SanitySection {
  _type: string
  _key: string
  heading: string
  date?: string
  body: Array<{_type: string; _key: string; [k: string]: unknown}>
}

interface SanityArticle {
  _id: string
  title: string
  intro: Array<{_type: string; _key: string; [k: string]: unknown}>
  sections: SanitySection[]
}

function parseDataUri(dataUri: string): {buffer: Buffer; contentType: string} | null {
  const match = dataUri.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  const contentType = match[1]
  const base64 = match[2]
  const buffer = Buffer.from(base64, 'base64')
  return {buffer, contentType}
}

function extensionFromMime(mime: string): string {
  const map: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp',
  }
  return map[mime] || 'png'
}

async function fetchGoogleDocHtml(docId: string): Promise<string> {
  const url = `https://docs.google.com/document/d/${docId}/export?format=html`
  console.log(`Fetching Google Doc HTML: ${url}`)

  const response = await fetch(url, {redirect: 'follow'})

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Doc: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  console.log(`Fetched HTML: ${html.length} characters`)
  return html
}

function extractImagesWithSections(html: string): ImageInfo[] {
  const dom = new JSDOM(html)
  const document = dom.window.document
  const body = document.body

  const images: ImageInfo[] = []
  let currentHeading: string | null = null
  let imageIndex = 0

  // Walk through all elements in document order
  const walker = document.createTreeWalker(body, 1 /* SHOW_ELEMENT */)

  let node: Node | null = walker.currentNode
  while (node) {
    const el = node as Element
    const tagName = el.tagName?.toLowerCase()

    // Check if this is a heading
    if (tagName && /^h[1-6]$/.test(tagName)) {
      const headingText = el.textContent?.trim()
      if (headingText) {
        currentHeading = headingText
      }
    }

    // Check if this is an image
    if (tagName === 'img') {
      const src = el.getAttribute('src') || ''
      if (src.startsWith('data:')) {
        const parsed = parseDataUri(src)
        if (parsed && parsed.buffer.length >= 1024) {
          // Skip images < 1KB (spacers/decorators)
          images.push({
            index: imageIndex,
            dataUri: src,
            contentType: parsed.contentType,
            sizeBytes: parsed.buffer.length,
            sectionHeading: currentHeading,
          })
          imageIndex++
        } else if (parsed) {
          console.log(
            `  Skipping tiny image #${imageIndex} (${parsed.buffer.length} bytes) — likely a spacer`,
          )
          imageIndex++
        }
      }
    }

    node = walker.nextNode()
  }

  return images
}

function normalizeHeading(text: string): string {
  // Normalize for comparison: lowercase, trim, collapse whitespace
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function findMatchingSection(
  sections: SanitySection[],
  heading: string,
): SanitySection | undefined {
  const normalized = normalizeHeading(heading)

  // Try exact match first
  let match = sections.find((s) => normalizeHeading(s.heading) === normalized)
  if (match) return match

  // Try contains match (Google Docs headings might have extra formatting)
  match = sections.find(
    (s) =>
      normalizeHeading(s.heading).includes(normalized) ||
      normalized.includes(normalizeHeading(s.heading)),
  )
  if (match) return match

  // Try matching by significant words (at least 3 chars) — skip short words like "the", "and"
  const words = normalized.split(' ').filter((w) => w.length >= 3)
  if (words.length > 0) {
    match = sections.find((s) => {
      const sectionNorm = normalizeHeading(s.heading)
      return words.every((w) => sectionNorm.includes(w))
    })
    if (match) return match
  }

  return undefined
}

export async function extractAndUploadImages(
  googleDocId: string,
  sanityArticleId: string,
): Promise<void> {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var (create at https://www.sanity.io/manage)')
  }

  // Step 1: Fetch the Google Doc as HTML
  const html = await fetchGoogleDocHtml(googleDocId)

  // Step 2: Extract images with their section mappings
  const images = extractImagesWithSections(html)
  console.log(`\nFound ${images.length} image(s) (>= 1KB):`)
  for (const img of images) {
    console.log(
      `  Image #${img.index}: ${(img.sizeBytes / 1024).toFixed(1)}KB, ` +
        `type=${img.contentType}, section="${img.sectionHeading || '(intro)'}"`,
    )
  }

  if (images.length === 0) {
    console.log('No images found in the document. Done.')
    return
  }

  // Step 3: Fetch the existing article from Sanity
  console.log(`\nFetching article ${sanityArticleId} from Sanity...`)
  const article = await client.fetch<SanityArticle>(
    `*[_id == $id][0]{ _id, title, intro, sections }`,
    {id: sanityArticleId},
  )

  if (!article) {
    throw new Error(`Article not found: ${sanityArticleId}`)
  }

  console.log(`Article: "${article.title}"`)
  console.log(`Sections: ${article.sections?.length || 0}`)
  for (const s of article.sections || []) {
    console.log(`  - "${s.heading}"`)
  }

  // Step 4: Upload images to Sanity and build section patches
  // Group images by section heading
  const imagesBySection = new Map<string | null, ImageInfo[]>()
  for (const img of images) {
    const key = img.sectionHeading
    if (!imagesBySection.has(key)) {
      imagesBySection.set(key, [])
    }
    imagesBySection.get(key)!.push(img)
  }

  // Upload all images and collect asset references
  const uploadedAssets: Map<number, string> = new Map() // image index -> asset ID
  for (const img of images) {
    const parsed = parseDataUri(img.dataUri)
    if (!parsed) continue

    const ext = extensionFromMime(img.contentType)
    const filename = `article-image-${img.index}.${ext}`
    console.log(`\nUploading image #${img.index} (${filename}, ${(img.sizeBytes / 1024).toFixed(1)}KB)...`)

    const asset = await client.assets.upload('image', parsed.buffer, {
      contentType: img.contentType,
      filename,
    })
    console.log(`  Uploaded: ${asset._id}`)
    uploadedAssets.set(img.index, asset._id)
  }

  // Step 5: Patch sections with image blocks
  console.log('\nPatching article sections with image blocks...')

  const sections = article.sections || []

  for (const [heading, sectionImages] of imagesBySection.entries()) {
    if (heading === null) {
      // Images in the intro (before first heading)
      // Note: the intro field in the schema only supports 'block' type, not images.
      // We'll add these images to the first section instead, or skip with a warning.
      console.log(
        `\n  Intro images (${sectionImages.length}): intro schema does not support images.`,
      )
      if (sections.length > 0) {
        console.log(`  Adding intro images to the beginning of the first section instead.`)
        const firstSection = sections[0]
        const imageBlocks = sectionImages
          .map((img) => {
            const assetId = uploadedAssets.get(img.index)
            if (!assetId) return null
            return {
              _type: 'image' as const,
              _key: generateKey(),
              asset: {_type: 'reference' as const, _ref: assetId},
            }
          })
          .filter(Boolean)

        if (imageBlocks.length > 0) {
          const existingBody = firstSection.body || []
          const sectionIndex = sections.indexOf(firstSection)
          await client
            .patch(sanityArticleId)
            .set({
              [`sections[${sectionIndex}].body`]: [...imageBlocks, ...existingBody],
            })
            .commit()
          console.log(
            `  Prepended ${imageBlocks.length} image(s) to section "${firstSection.heading}"`,
          )
        }
      } else {
        console.log(`  No sections available, skipping intro images.`)
      }
      continue
    }

    // Find matching section in Sanity
    const matchedSection = findMatchingSection(sections, heading)
    if (!matchedSection) {
      console.log(`\n  WARNING: No matching section found for heading "${heading}"`)
      console.log(`  Skipping ${sectionImages.length} image(s).`)
      continue
    }

    const sectionIndex = sections.indexOf(matchedSection)
    const imageBlocks = sectionImages
      .map((img) => {
        const assetId = uploadedAssets.get(img.index)
        if (!assetId) return null
        return {
          _type: 'image' as const,
          _key: generateKey(),
          asset: {_type: 'reference' as const, _ref: assetId},
        }
      })
      .filter(Boolean)

    if (imageBlocks.length > 0) {
      const existingBody = matchedSection.body || []
      await client
        .patch(sanityArticleId)
        .set({
          [`sections[${sectionIndex}].body`]: [...existingBody, ...imageBlocks],
        })
        .commit()
      console.log(
        `\n  Section "${matchedSection.heading}": appended ${imageBlocks.length} image(s)`,
      )
    }
  }

  console.log('\nDone! Images extracted, uploaded, and inserted into article sections.')
}

// CLI entry point — only runs when this file is executed directly (not imported)
const isDirectRun =
  process.argv[1] &&
  import.meta.url.endsWith(process.argv[1].replace(/.*\//, ''))

if (isDirectRun) {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error(
      'Usage: npx tsx scripts/extract-and-upload-images.ts <google-doc-id> <sanity-article-id>',
    )
    console.error('\nExample:')
    console.error(
      '  SANITY_TOKEN=... npx tsx scripts/extract-and-upload-images.ts 1RG_wOoc8MryqCJu8-EqEpIe05BMZgWsSCQ3Bp5ATUXg abc123',
    )
    process.exit(1)
  }

  const [googleDocId, sanityArticleId] = args
  extractAndUploadImages(googleDocId, sanityArticleId).catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  })
}

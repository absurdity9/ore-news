import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {JSDOM} from 'jsdom'

const COVERS_DIR = resolve(new URL('.', import.meta.url).pathname, 'covers')

const DOCS = [
  {date: '2026-01-09', id: '1RG_wOoc8MryqCJu8-EqEpIe05BMZgWsSCQ3Bp5ATUXg'},
  {date: '2026-01-16', id: '1ETiksWAP-t6ddpHQikFZbxVF3wO6nQFATZnZjrYtaUc'},
  {date: '2026-01-23', id: '1hypEouQGXC4rBQmwqUVIw0lFlTsgt6lulb53effACfs'},
  {date: '2026-01-30', id: '1sg2Celn85-QzeCsxJYEvUZwTpQII37Tm9vBD_p8NebE'},
  {date: '2026-02-06', id: '1lWKtu9Tsok5uqRbG5B5524yWDx3viwOWwEa93ydl8eI'},
  {date: '2026-02-13', id: '1LIm1mW_L9GxyJLBLFpsQDRh7zUx_ZjcJW9006ymIpxQ'},
  {date: '2026-02-20', id: '1EfF-VYiLzyiDiYKY72_8oRzIoSY3avyLVvCbdgAlrtc'},
  {date: '2026-02-27', id: '1GuPfi-qTu9GZa6alD7tgYQHWtxXjZ7Vhfu9_ZM8pRGE'},
  {date: '2026-03-06', id: '1vm1OToGs9yGHBxzbrsRyF_J3Ox7gW0P7YXsMq9JkleY'},
  {date: '2026-03-13', id: '1jTBxqzsNwZgHRduXinYfhyCaoCxqOzVMw5mKl5eTWBQ'},
  {date: '2026-03-20', id: '15rpTDANAg_Qj5zktXitj3ogsum_1u-cXWaKoQx_wMjM'},
  {date: '2026-03-27', id: '1dyMpiD4aPPrqxu4e8bz3EPTI3DiVBVMJYTJLer0nm6w'},
  {date: '2026-04-03', id: '1sgi8ia1gLuA4Ke7wW6JE4ppknUD0X6akEw3Y0cV0ZAg'},
  {date: '2026-04-10', id: '1LlyRNrpNdosgbLQsIzh9cl8vGMlLCXHsXpoWCDXizk4'},
  {date: '2026-04-17', id: '13xiB5vMtI1yIixcvBdQE--AZD-QTvd2aYM-NL5CRqRw'},
  {date: '2026-04-24', id: '1OKxecvWl--z4Wub6WeOCvt9KvFkXoSgagjgPUEufFqs'},
]

async function fetchFirstImage(docId: string): Promise<{buffer: Buffer; ext: string} | null> {
  const url = `https://docs.google.com/document/d/${docId}/export?format=html`
  const response = await fetch(url, {redirect: 'follow'})
  if (!response.ok) {
    console.error(`  Failed to fetch doc ${docId}: ${response.status}`)
    return null
  }

  const html = await response.text()
  const dom = new JSDOM(html)
  const imgs = dom.window.document.querySelectorAll('img')

  for (const img of imgs) {
    const src = img.getAttribute('src') || ''
    if (!src.startsWith('data:')) continue

    const match = src.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) continue

    const contentType = match[1]
    const buffer = Buffer.from(match[2], 'base64')

    if (buffer.length < 1024) continue

    const extMap: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
    }
    return {buffer, ext: extMap[contentType] || 'png'}
  }

  return null
}

async function main() {
  console.log(`Downloading first image from each Google Doc as cover...\n`)

  for (const doc of DOCS) {
    process.stdout.write(`${doc.date}: fetching...`)
    const result = await fetchFirstImage(doc.id)
    if (result) {
      const filename = `${doc.date}.${result.ext}`
      const filepath = resolve(COVERS_DIR, filename)
      writeFileSync(filepath, result.buffer)
      console.log(` saved ${filename} (${(result.buffer.length / 1024).toFixed(0)}KB)`)
    } else {
      console.log(` no image found!`)
    }
  }

  console.log(`\nDone! Now run upload-covers.ts to push them to Sanity.`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})

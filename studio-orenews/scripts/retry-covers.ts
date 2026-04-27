import {writeFileSync} from 'fs'
import {resolve} from 'path'
import {JSDOM} from 'jsdom'

const COVERS_DIR = resolve(new URL('.', import.meta.url).pathname, 'covers')

async function fetchCover(date: string, docId: string) {
  console.log(`${date}: fetching...`)
  const url = `https://docs.google.com/document/d/${docId}/export?format=html`
  const r = await fetch(url, {redirect: 'follow'})
  if (!r.ok) {
    console.log(`  Failed: ${r.status}`)
    return
  }
  const html = await r.text()
  const dom = new JSDOM(html)
  for (const img of dom.window.document.querySelectorAll('img')) {
    const src = img.getAttribute('src') || ''
    const m = src.match(/^data:([^;]+);base64,(.+)$/)
    if (!m) continue
    const buf = Buffer.from(m[2], 'base64')
    if (buf.length < 1024) continue
    const f = `${date}.png`
    writeFileSync(resolve(COVERS_DIR, f), buf)
    console.log(`  saved ${f} (${(buf.length / 1024).toFixed(0)}KB)`)
    return
  }
  console.log('  no image found')
}

async function main() {
  await fetchCover('2026-01-09', '1RG_wOoc8MryqCJu8-EqEpIe05BMZgWsSCQ3Bp5ATUXg')
  await fetchCover('2026-01-23', '1hypEouQGXC4rBQmwqUVIw0lFlTsgt6lulb53effACfs')
}

main()

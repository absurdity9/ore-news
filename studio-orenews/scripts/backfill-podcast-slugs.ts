import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 96)
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var (create at https://www.sanity.io/manage)')
  }

  const dryRun = process.argv.includes('--dry-run')

  const podcasts: {_id: string; title: string; episode: number; slug?: {current?: string}}[] =
    await client.fetch(`*[_type == "podcast"]{_id, title, episode, slug}`)

  console.log(`Found ${podcasts.length} podcasts`)

  for (const p of podcasts) {
    if (p.slug?.current) {
      console.log(`  skip   ep ${p.episode}: ${p.title} (slug=${p.slug.current})`)
      continue
    }
    const slug = `ep-${p.episode}-${slugify(p.title)}`
    console.log(`  patch  ep ${p.episode}: ${p.title} → ${slug}`)
    if (!dryRun) {
      await client.patch(p._id).set({slug: {_type: 'slug', current: slug}}).commit()
    }
  }

  console.log(dryRun ? 'Dry-run complete — no changes made.' : 'Backfill complete.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

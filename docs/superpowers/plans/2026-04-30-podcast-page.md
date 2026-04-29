# Podcast Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every podcast (Ore Insiders + Minerside Chats) a dedicated page on orenews.supply with the YouTube video at top and a clickable transcript TOC below that seeks the player to each section's timestamp. Seed the page with Ore Insiders Ep. 2 (Craggle Bear) as the first piece of content.

**Architecture:** Mirror the existing article page (`article.html` + `js/article.js` + `.deep-dive*` CSS). Podcasts pick up a `slug` for routing and a `sections[]` array (heading + optional timestamp-in-seconds + Portable Text body) replacing the flat `transcript` field. The page fetches the podcast doc, renders an `<iframe>` with `enablejsapi=1`, loads the YouTube IFrame Player API, and wires TOC clicks to `player.seekTo(seconds)` plus a smooth-scroll. All internal links (home CD rack, archives podcast cards, search results) swap from the external YouTube URL to `podcast.html?slug=…`.

**Tech Stack:** Plain HTML / vanilla JS (no bundler), Sanity v3 (TypeScript schemas), `@sanity/client` for one-off scripts run via `tsx`. No test framework exists in the repo — verification is manual browser checks plus stdout assertions for scripts.

---

## Notes for the engineer

**No test framework.** This repo is plain HTML/CSS/JS served as static files. There is no Jest, Vitest, Playwright, or `npm test`. "Test" steps below mean **open the file in a browser and verify the listed conditions**. Each task spells out what to check.

**Local dev server.** A dev server is already running on port 3333 from a previous task (`python3 -m http.server 3333`). If it has died, restart it from `/Users/kwokfaywilliamdeng/ore-news` with `python3 -m http.server 3333 &`.

**Sanity Studio.** Run with `cd studio-orenews && npm run dev`. Opens on `http://localhost:3333` by default — but conflicts with the static server. Either stop the static server first, or pass `--port 3334` to Sanity. Studio changes to `schemaTypes/*.ts` hot-reload.

**Sanity write token.** Studio scripts that mutate data (Tasks 2 and 12) require `SANITY_TOKEN` env var. The user already has one — they can supply it at run time. Scripts without `SANITY_TOKEN` should fail loudly, not silently no-op.

**Existing GROQ patterns.** All page JS uses the helper `sanityFetch(query, params)` defined in `js/sanity.js`. The Portable Text renderer `renderPortableText(blocks)` and image URL helper `sanityImageUrl(ref, width)` are also in there. Reuse them.

**Existing pattern reference.** `article.html` + `js/article.js` is the model — same layout shell, same TOC interaction (minus the YouTube seek). When in doubt, mimic.

---

## File Structure

**New files:**
- `studio-orenews/scripts/backfill-podcast-slugs.ts` — one-off slug backfill.
- `studio-orenews/scripts/data/cragglebear-transcript.md` — checked-in transcript source.
- `studio-orenews/scripts/seed-cragglebear-transcript.ts` — parses the markdown and patches `sections` on Ore Insiders Ep. 2.
- `podcast.html` — page shell.
- `js/podcast.js` — page logic (fetch, render, YT player, seek).

**Modified files:**
- `studio-orenews/schemaTypes/podcast.ts` — add `slug` + `sections`, drop `transcript`.
- `css/style.css` — append podcast-specific styles.
- `js/app.js` — home CD rack: switch GROQ to include `slug`, switch link target.
- `js/archives.js` — archive podcast card: switch GROQ + link target.
- `js/search.js` — search GROQ: replace `transcript` with `sections[].body`; podcast result link switches to `podcast.html?slug=…`.

---

## Task 1: Update podcast schema (add slug + sections, drop transcript)

**Files:**
- Modify: `studio-orenews/schemaTypes/podcast.ts`

- [ ] **Step 1: Replace the schema**

Open `studio-orenews/schemaTypes/podcast.ts` and replace the entire file contents with:

```ts
import {defineType, defineField, defineArrayMember} from 'sanity'

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'episode',
      title: 'Episode Number',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'show',
      title: 'Show',
      type: 'string',
      options: {
        list: [
          {title: 'Ore Insiders', value: 'ore-insiders'},
          {title: 'Minerside Chats', value: 'minerside-chats'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Episode summary / show notes',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'sections',
      title: 'Transcript Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'timestamp',
              title: 'Timestamp (seconds)',
              type: 'number',
              description: 'Seconds offset into the YouTube video for this section. Optional — leave blank to disable seek (TOC link will still scroll).',
              validation: (rule) => rule.min(0).integer(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
            }),
          ],
          preview: {
            select: {title: 'heading', timestamp: 'timestamp'},
            prepare({title, timestamp}) {
              const sub =
                typeof timestamp === 'number'
                  ? formatTimestamp(timestamp)
                  : '—'
              return {title, subtitle: sub}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'color',
      title: 'Disc Color',
      type: 'string',
      description: 'Hex color for the CD disc, e.g. #4a9eff',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to YouTube video',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    }),
  ],
  orderings: [
    {title: 'Episode (newest)', name: 'episodeDesc', by: [{field: 'episode', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', episode: 'episode', show: 'show'},
    prepare({title, episode, show}) {
      const showLabel = show === 'minerside-chats' ? 'Minerside Chats' : 'Ore Insiders'
      return {
        title,
        subtitle: `${showLabel} — Ep ${episode}`,
      }
    },
  },
})

function formatTimestamp(total: number): string {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
```

What this does: removes the old flat `transcript` Portable Text field, adds a required `slug` (auto-generated from title), and adds a `sections` array. Each section has a required heading, an optional integer `timestamp` in seconds, and a Portable Text `body`. Studio previews show `mm:ss` / `hh:mm:ss`.

- [ ] **Step 2: Verify the schema compiles in Studio**

```bash
cd /Users/kwokfaywilliamdeng/ore-news/studio-orenews
npm run dev -- --port 3334
```

Open `http://localhost:3334`. Navigate to any existing Podcast document. Verify:
- "Slug" field appears (will be empty for existing docs — that's expected; Task 2 fixes it).
- "Transcript Sections" array field appears (with Heading / Timestamp (seconds) / Body subfields).
- The old flat "Transcript" field is gone.
- No console errors.

Stop the dev server (`Ctrl-C`).

- [ ] **Step 3: Commit**

```bash
cd /Users/kwokfaywilliamdeng/ore-news
git add studio-orenews/schemaTypes/podcast.ts
git commit -m "feat(schema): podcast — replace transcript with sections + slug

Drops the flat transcript Portable Text field and adds a slug plus a
sections array (heading, optional integer timestamp in seconds, Portable
Text body). Slug is required for upcoming internal podcast page routing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Backfill slugs for existing podcasts

**Files:**
- Create: `studio-orenews/scripts/backfill-podcast-slugs.ts`

- [ ] **Step 1: Write the backfill script**

Create `studio-orenews/scripts/backfill-podcast-slugs.ts` with:

```ts
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
```

What this does: lists all podcast docs, skips any that already have a slug, and patches the rest with `ep-{number}-{slugified-title}` (e.g. `ep-2-minemore-insiders-chat-with-craggle-bear`). The slug includes the episode number to avoid collisions across shows (Ore Insiders Ep. 2 and Minerside Chats Ep. 2 would still get unique slugs).

- [ ] **Step 2: Dry-run the script**

```bash
cd /Users/kwokfaywilliamdeng/ore-news/studio-orenews
SANITY_TOKEN=<paste-token> npx tsx scripts/backfill-podcast-slugs.ts --dry-run
```

Expected output: a list of `patch ep N: <title> → <slug>` lines, one per podcast without a slug. Confirm the slugs look reasonable. Confirm the script exits with `Dry-run complete — no changes made.`

- [ ] **Step 3: Run for real**

```bash
SANITY_TOKEN=<paste-token> npx tsx scripts/backfill-podcast-slugs.ts
```

Expected: same `patch` lines but no `--dry-run` warning at end.

- [ ] **Step 4: Verify in Studio**

Open Studio (`npm run dev -- --port 3334`). Open any podcast document. Confirm the Slug field is now populated. Spot-check 2-3 podcasts.

- [ ] **Step 5: Commit**

```bash
cd /Users/kwokfaywilliamdeng/ore-news
git add studio-orenews/scripts/backfill-podcast-slugs.ts
git commit -m "chore(studio): script to backfill slugs on existing podcasts

Generates ep-{number}-{slugified-title} for every podcast without a slug.
Supports --dry-run for safety. Required because the new podcast schema
makes slug a required field for internal page routing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Create podcast.html shell

**Files:**
- Create: `podcast.html`

- [ ] **Step 1: Create the page shell**

Create `/Users/kwokfaywilliamdeng/ore-news/podcast.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DSRLKSKGVM"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DSRLKSKGVM');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading... — OreNews</title>

    <link rel="icon" type="image/png" href="images/character.png">
    <link rel="apple-touch-icon" href="images/character.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Lora:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="deep-dive-body">
    <aside class="ore-tally ore-tally--standalone" role="region" aria-label="ORE supply">
        <span class="ore-tally-rivet ore-tally-rivet--tl" aria-hidden="true"></span>
        <span class="ore-tally-rivet ore-tally-rivet--tr" aria-hidden="true"></span>
        <span class="ore-tally-rivet ore-tally-rivet--bl" aria-hidden="true"></span>
        <span class="ore-tally-rivet ore-tally-rivet--br" aria-hidden="true"></span>
        <header class="ore-tally-head">
            <a href="index.html" class="ore-tally-brand" aria-label="OreNews home">
                <span class="ore-tally-brand-text">orenews<span class="ore-tally-brand-tld">.supply</span></span>
            </a>
        </header>
        <div class="ore-tally-grid">
            <div class="ore-tally-stat">
                <span class="ore-tally-stat-label">Max Supply</span>
                <span class="ore-tally-stat-value"><img class="ore-glyph" src="images/ore-logo.svg" alt="" aria-hidden="true">3,000,000</span>
            </div>
            <div class="ore-tally-stat">
                <span class="ore-tally-stat-label">Circulating</span>
                <span class="ore-tally-stat-value"><img class="ore-glyph" src="images/ore-logo.svg" alt="" aria-hidden="true">454,179.35</span>
            </div>
        </div>
        <nav class="ore-tally-nav" aria-label="Primary">
            <a href="index.html">Home</a>
            <a href="deep-dive.html">Deep Dive</a>
            <a href="archives-magazines.html">Archives</a>
            <a href="search.html" class="ore-tally-nav-icon" aria-label="Search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Search</a>
        </nav>
    </aside>

    <main class="deep-dive">
        <div class="deep-dive-inner">
            <div class="deep-dive-header">
                <p class="deep-dive-eyebrow" id="podcast-eyebrow"></p>
                <h1 class="deep-dive-title" id="podcast-title"></h1>
                <p class="deep-dive-subtitle" id="podcast-description" style="display:none"></p>
                <p class="deep-dive-author" id="podcast-meta"></p>
            </div>

            <div class="podcast-embed" id="podcast-embed"></div>

            <nav class="deep-dive-toc" aria-label="Transcript sections" id="podcast-toc"></nav>

            <div id="podcast-sections"></div>
        </div>
    </main>

    <footer class="site-footer">
        <p>Copyright &copy; 2026 OreNews. All rights reserved. Built by <a href="https://minemore.app" target="_blank" rel="noopener noreferrer" class="minemore-credit"><img src="images/minemore-logo.png" alt="" class="minemore-logo">Minemore.app</a>.</p>
    </footer>

    <script src="js/sanity.js"></script>
    <script src="js/podcast.js"></script>
</body>
</html>
```

What this does: copies the `article.html` shell, adds a `#podcast-embed` container between the header and the TOC, and renames the body containers to `podcast-*`. Reuses `.deep-dive*` classes for layout consistency.

- [ ] **Step 2: Verify the shell loads (will be empty without JS)**

If the dev server is not running:

```bash
cd /Users/kwokfaywilliamdeng/ore-news
python3 -m http.server 3333 &
```

Open `http://localhost:3333/podcast.html?slug=anything` in a browser. Verify:
- Page loads with no 404 on css/style.css.
- `ore-tally` aside is visible on the left/top with the orenews branding.
- Main area is empty (the title element shows nothing because there is no JS yet).
- Browser console shows `ReferenceError: js/podcast.js` — that's fine, will be fixed in Task 4.

- [ ] **Step 3: Commit**

```bash
git add podcast.html
git commit -m "feat: add podcast.html page shell

Mirrors the article page layout (ore-tally aside + deep-dive main),
adds a #podcast-embed container for the YouTube iframe between the
header and the transcript TOC. Page logic comes in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Podcast page JS — fetch + render header + embed

**Files:**
- Create: `js/podcast.js`

- [ ] **Step 1: Write the page logic (header + embed + sections render, no YT API yet)**

Create `/Users/kwokfaywilliamdeng/ore-news/js/podcast.js` with:

```js
// Podcast page — fetches a single podcast from Sanity by slug and renders it.

document.addEventListener('DOMContentLoaded', () => {
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) {
        document.getElementById('podcast-title').textContent = 'Podcast not found';
        return;
    }
    loadPodcast(slug);
});

async function loadPodcast(slug) {
    try {
        const podcast = await sanityFetch(
            `*[_type == "podcast" && slug.current == $slug][0] {
                title, episode, show, description, videoId, url, publishedAt,
                sections[] { heading, timestamp, body }
            }`,
            { slug }
        );

        if (!podcast) {
            document.getElementById('podcast-title').textContent = 'Podcast not found';
            return;
        }

        document.title = `${podcast.title} — OreNews`;

        const showLabel = podcast.show === 'minerside-chats' ? 'Minerside Chats' : 'Ore Insiders';
        document.getElementById('podcast-eyebrow').textContent =
            `${showLabel} · Ep. ${podcast.episode}`;
        document.getElementById('podcast-title').textContent = podcast.title;

        if (podcast.description) {
            const desc = document.getElementById('podcast-description');
            desc.textContent = podcast.description;
            desc.style.display = '';
        }

        if (podcast.publishedAt) {
            document.getElementById('podcast-meta').textContent = formatDate(podcast.publishedAt);
        }

        renderEmbed(podcast.videoId, podcast.url);
        renderTOC(podcast.sections);
        renderSections(podcast.sections);
    } catch (err) {
        console.error('Failed to load podcast:', err);
        document.getElementById('podcast-title').textContent = 'Failed to load podcast';
    }
}

function renderEmbed(videoId, url) {
    const container = document.getElementById('podcast-embed');
    if (!videoId) {
        if (url) {
            container.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="podcast-watch-link">Watch on YouTube ↗</a>`;
        }
        return;
    }
    container.innerHTML = `
        <div class="podcast-embed-frame">
            <iframe
                id="podcast-iframe"
                src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?enablejsapi=1&rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"></iframe>
        </div>
        ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="podcast-watch-link">Watch on YouTube ↗</a>` : ''}
    `;
}

function renderTOC(sections) {
    const tocEl = document.getElementById('podcast-toc');
    if (!sections || !sections.length) {
        tocEl.style.display = 'none';
        return;
    }
    sections.forEach((section, i) => {
        const id = `s${i + 1}`;
        const link = document.createElement('a');
        link.href = `#${id}`;
        if (typeof section.timestamp === 'number') {
            link.dataset.seconds = String(section.timestamp);
            link.innerHTML = `<span class="podcast-toc-time">${formatTimestamp(section.timestamp)}</span> ${escapeHtml(section.heading)}`;
        } else {
            link.textContent = `${i + 1}. ${section.heading}`;
        }
        tocEl.appendChild(link);
    });
}

function renderSections(sections) {
    const sectionsEl = document.getElementById('podcast-sections');
    if (!sections || !sections.length) return;
    sections.forEach((section, i) => {
        const el = document.createElement('section');
        el.className = 'deep-dive-content podcast-section';
        el.id = `s${i + 1}`;
        el.innerHTML = `
            <h2>${escapeHtml(section.heading)}</h2>
            ${section.body ? renderPortableText(section.body) : ''}
        `;
        sectionsEl.appendChild(el);
    });
}

function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTimestamp(total) {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n) => n.toString().padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
```

What this does: parses `?slug=…`, fetches the podcast doc, fills in the header text, renders an embedded YouTube iframe (with `enablejsapi=1` so a later task can attach the IFrame Player API), renders the TOC and the transcript sections. No seek-on-click yet — that comes in Task 5.

- [ ] **Step 2: Verify a podcast page loads end-to-end**

In Sanity Studio, pick any podcast document and add at least one section temporarily so the TOC has content. Set heading to "Test section", leave timestamp blank, add a paragraph in body. Save.

Then in a browser, open `http://localhost:3333/podcast.html?slug=<that-podcast-slug>`. Verify:
- Title in browser tab updates to `<podcast title> — OreNews`.
- Eyebrow shows e.g. `Ore Insiders · Ep. 1`.
- The YouTube video embed appears below the header (try clicking play to confirm the iframe is live).
- "Watch on YouTube ↗" link appears below the embed.
- TOC shows `1. Test section`.
- Below the TOC, a `<section>` with the heading and the body paragraph renders.
- No JS errors in the browser console.

After verifying, you can remove the temporary section in Studio.

- [ ] **Step 3: Commit**

```bash
git add js/podcast.js
git commit -m "feat: render podcast page header, embed, TOC, sections

Fetches a podcast by slug from Sanity and renders the show eyebrow,
title, description, YouTube iframe (with enablejsapi=1 ready for the
seek wiring in the next commit), TOC, and transcript sections. No
seek behavior yet — TOC links are plain anchor scrolls.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Wire YouTube IFrame API for seek-on-click

**Files:**
- Modify: `js/podcast.js`

- [ ] **Step 1: Append the YT player wiring**

At the bottom of `js/podcast.js`, append:

```js
let ytPlayer = null;
let ytPlayerReady = false;

function initYouTubeAPI() {
    const iframe = document.getElementById('podcast-iframe');
    if (!iframe) return;
    if (window.YT && window.YT.Player) {
        createPlayer(iframe);
        return;
    }
    window.onYouTubeIframeAPIReady = () => createPlayer(iframe);
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
}

function createPlayer(iframe) {
    ytPlayer = new YT.Player(iframe, {
        events: {
            onReady: () => { ytPlayerReady = true; },
        },
    });
}

function attachTOCSeek() {
    const tocEl = document.getElementById('podcast-toc');
    if (!tocEl) return;
    tocEl.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        const seconds = link.dataset.seconds;
        const id = (link.getAttribute('href') || '').replace(/^#/, '');
        const target = id ? document.getElementById(id) : null;
        if (target) {
            e.preventDefault();
            history.replaceState(null, '', `#${id}`);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (seconds && ytPlayer && ytPlayerReady) {
            const n = Number(seconds);
            if (!Number.isNaN(n)) {
                ytPlayer.seekTo(n, true);
                ytPlayer.playVideo();
            }
        }
    });
}
```

Then update `loadPodcast` to call them after rendering. Find the line:

```js
        renderSections(podcast.sections);
    } catch (err) {
```

Replace with:

```js
        renderSections(podcast.sections);

        attachTOCSeek();
        initYouTubeAPI();
    } catch (err) {
```

What this does: lazy-loads the YouTube IFrame API after the iframe is in the DOM, attaches a click handler to the TOC that both smooth-scrolls AND (if a numeric timestamp is present and the player is ready) seeks the player to that second and starts playing. Falls through cleanly if the API hasn't loaded yet (the click still scrolls).

- [ ] **Step 2: Verify the seek works**

In Studio, edit the same podcast you used in Task 4 and set a `timestamp` of `60` (1 minute) on the test section. Save.

Reload `http://localhost:3333/podcast.html?slug=<that-slug>`. Wait a couple of seconds for the IFrame API to load (you may see a network request to `youtube.com/iframe_api`). Then:
- Click the test section in the TOC.
- Verify the page scrolls to the section.
- Verify the YouTube player jumps to ~1:00 and starts playing.
- Verify the URL hash becomes `#s1`.

Click on the TOC link a second time with a different timestamp value to confirm seek-on-click is repeatable.

- [ ] **Step 3: Commit**

```bash
git add js/podcast.js
git commit -m "feat: seek YouTube to section timestamp on TOC click

Lazy-loads the YouTube IFrame Player API after the iframe is in the
DOM. TOC click handler smooth-scrolls to the target section and, when
the section has a numeric timestamp and the player is ready, seeks the
player to that second and resumes playback. Sections without a
timestamp scroll only.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Podcast-specific CSS

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Append podcast styles to the bottom of `css/style.css`**

Open `css/style.css` and append at the end of the file:

```css
/* ===== Podcast page ===== */

.podcast-embed {
    margin: 1.5rem 0 2rem;
}

.podcast-embed-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    border: 2px solid var(--gold, #f0c94d);
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.4);
}

.podcast-embed-frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.podcast-watch-link {
    display: inline-block;
    margin-top: 0.6rem;
    font-family: var(--font-pixel);
    font-size: 0.55rem;
    color: var(--gold, #f0c94d);
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
}

.podcast-watch-link:hover {
    filter: brightness(1.2);
}

.deep-dive-toc .podcast-toc-time {
    display: inline-block;
    min-width: 4ch;
    margin-right: 0.5em;
    font-variant-numeric: tabular-nums;
    opacity: 0.75;
}

.podcast-section h2 {
    scroll-margin-top: 1.5rem;
}
```

What this does: gives the embed a 16:9 aspect ratio with the gold-bordered frame (matches the site's pixelated aesthetic), styles the "Watch on YouTube" link as a quiet pixel-font link, dims/aligns the timestamp prefix in TOC entries, and adds `scroll-margin-top` so smooth-scrolled sections don't sit flush against the top edge.

- [ ] **Step 2: Verify visuals**

Hard-reload `http://localhost:3333/podcast.html?slug=<that-slug>` (Cmd-Shift-R). Verify:
- The video embed has the gold border and 16:9 ratio.
- The "Watch on YouTube" link sits below the embed in pixel font.
- TOC timestamps (e.g. `1:00`) are dimmed and tabular-aligned with the heading text after them.
- Mobile width (resize browser to ~360px wide): the embed scales fluidly, no horizontal scroll.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: podcast page styles — embed frame, TOC timestamps

Adds the 16:9 gold-bordered embed frame, the Watch-on-YouTube link
style, and a tabular monospace alignment for TOC timestamp prefixes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Home page CD rack — link to podcast.html

**Files:**
- Modify: `js/app.js`

- [ ] **Step 1: Update the GROQ projection to include slug**

Open `js/app.js`. Find the line (around line 17):

```js
            sanityFetch(`*[_type == "podcast" && show == "ore-insiders"] | order(episode asc) [0...4] { title, episode, color, videoId, url, "thumbnail": thumbnail.asset->url }`),
```

Replace with:

```js
            sanityFetch(`*[_type == "podcast" && show == "ore-insiders"] | order(episode asc) [0...4] { title, episode, color, videoId, url, "slug": slug.current, "thumbnail": thumbnail.asset->url }`),
```

- [ ] **Step 2: Update `createCDEl` to link internally when a slug exists**

Find the `createCDEl` function (around line 114). Replace the link-href setup at the top of the function:

```js
function createCDEl(cd, showCta = false) {
    const link = document.createElement('a');
    link.href = cd.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'cd-item';
```

with:

```js
function createCDEl(cd, showCta = false) {
    const link = document.createElement('a');
    if (cd.slug) {
        link.href = `podcast.html?slug=${encodeURIComponent(cd.slug)}`;
    } else {
        link.href = cd.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
    link.className = 'cd-item';
```

What this does: when the podcast has a slug, the CD links to the new internal page; otherwise it falls back to the YouTube URL. After Task 2's backfill all docs will have slugs, but the fallback keeps the home page resilient if a podcast is created without one.

- [ ] **Step 3: Verify the home page links**

Hard-reload `http://localhost:3333/`. Inspect a CD in the Ore Insiders rack: hover or right-click → Inspect. Verify the `<a>` href is `podcast.html?slug=ep-N-…`, NOT a youtube.com link. Click one — the podcast page should load.

- [ ] **Step 4: Commit**

```bash
git add js/app.js
git commit -m "feat: home CD rack links to internal podcast page

Adds slug to the home GROQ and switches createCDEl to link
podcast.html?slug=… when a slug is present. Falls back to the
external YouTube URL when not, so the home page stays resilient.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Archives podcast cards — link to podcast.html

**Files:**
- Modify: `js/archives.js`

- [ ] **Step 1: Update the GROQ to include slug**

Open `js/archives.js`. Find the podcast fetch line (around line 18):

```js
            : await sanityFetch(`*[_type == "podcast" && show == "ore-insiders"] | order(episode asc) { title, episode, color, videoId, url, "thumbnail": thumbnail.asset->url }`);
```

Replace with:

```js
            : await sanityFetch(`*[_type == "podcast" && show == "ore-insiders"] | order(episode asc) { title, episode, color, videoId, url, "slug": slug.current, "thumbnail": thumbnail.asset->url }`);
```

- [ ] **Step 2: Update `createPodcastCard` to use the slug**

Find `createPodcastCard` (around line 80). Replace:

```js
function createPodcastCard(cd) {
    const link = document.createElement('a');
    link.href = cd.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'archive-card-podcast';
```

with:

```js
function createPodcastCard(cd) {
    const link = document.createElement('a');
    if (cd.slug) {
        link.href = `podcast.html?slug=${encodeURIComponent(cd.slug)}`;
    } else {
        link.href = cd.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
    link.className = 'archive-card-podcast';
```

Also update the link label inside the card body (the existing card says `YouTube →`, which is now misleading for internal links). Find:

```js
            <span class="archive-card-link">YouTube →</span>
```

Replace with:

```js
            <span class="archive-card-link">${cd.slug ? 'Listen →' : 'YouTube →'}</span>
```

- [ ] **Step 3: Verify the archive cards**

Hard-reload `http://localhost:3333/archives-podcasts.html`. Verify:
- Each card's footer label reads `Listen →` (because all docs now have slugs from Task 2).
- Hovering a card shows `podcast.html?slug=…` in the browser status bar.
- Clicking a card opens the podcast page in the same tab.

- [ ] **Step 4: Commit**

```bash
git add js/archives.js
git commit -m "feat: archives podcast cards link to internal podcast page

Adds slug to the archives podcast GROQ and switches createPodcastCard
to link to podcast.html?slug=…, with YouTube as a fallback. Card
label updates to 'Listen →' for internal links.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Search — link to podcast.html + update GROQ

**Files:**
- Modify: `js/search.js`

The previous search-snippet feature added `pt::text(transcript) match $q` and projected `bodyText` from `transcript`. Both need to follow the schema rename.

- [ ] **Step 1: Update `searchPodcasts` GROQ**

Open `js/search.js`. Find the `searchPodcasts` function (around line 54). Replace the entire function:

```js
    function searchPodcasts(q) {
        return sanityFetch(
            `*[_type == "podcast" && (
                title match $q ||
                description match $q ||
                pt::text(transcript) match $q
            )] | order(publishedAt desc) {
                _type, title, description, episode, show, url, publishedAt,
                "fallbackSnippet": description,
                "bodyText": coalesce(pt::text(transcript), "")
            }`,
            { q: q + '*' }
        );
    }
```

with:

```js
    function searchPodcasts(q) {
        return sanityFetch(
            `*[_type == "podcast" && (
                title match $q ||
                description match $q ||
                sections[].heading match $q ||
                pt::text(sections[].body) match $q
            )] | order(publishedAt desc) {
                _type, title, description, episode, show, url, publishedAt,
                "slug": slug.current,
                "fallbackSnippet": description,
                "bodyText": coalesce(pt::text(sections[].body), "")
            }`,
            { q: q + '*' }
        );
    }
```

This swaps the now-removed `transcript` field for the new `sections` array (matching against both heading text and body Portable Text), and adds the `slug` to the projection.

- [ ] **Step 2: Update `renderCard` to link podcasts internally**

In the same file, find `renderCard` (around line 79). Find:

```js
        const isArticle = item._type === 'article';
        const badge = isArticle ? 'Article' : 'Podcast';
        const badgeClass = isArticle ? 'search-badge--article' : 'search-badge--podcast';
        const href = isArticle
            ? `article.html?slug=${encodeURIComponent(item.slug)}`
            : item.url || '#';
        const target = isArticle ? '' : ' target="_blank" rel="noopener noreferrer"';
```

Replace with:

```js
        const isArticle = item._type === 'article';
        const badge = isArticle ? 'Article' : 'Podcast';
        const badgeClass = isArticle ? 'search-badge--article' : 'search-badge--podcast';
        const internalHref = isArticle
            ? (item.slug ? `article.html?slug=${encodeURIComponent(item.slug)}` : null)
            : (item.slug ? `podcast.html?slug=${encodeURIComponent(item.slug)}` : null);
        const href = internalHref || item.url || '#';
        const target = internalHref ? '' : ' target="_blank" rel="noopener noreferrer"';
```

What this does: both articles and podcasts go to internal pages when they have a slug. External links (the YouTube `url` fallback for podcasts without slugs) keep `target="_blank"`.

- [ ] **Step 3: Verify search**

Hard-reload `http://localhost:3333/search.html`. Search for a term you know appears in a podcast title (e.g. `craggle` once Task 12 has seeded the transcript — for now use a term in a current podcast title or description).

Verify:
- Each podcast result card's `<a>` href is `podcast.html?slug=…` (no `target="_blank"`).
- Clicking the card stays in the same tab and loads the podcast page.
- Search for a term that matches an article body — articles still link to `article.html?slug=…` correctly.

If you have already seeded the Craggle Bear transcript via Task 12 by the time you verify, also search for a transcript-only term (e.g. `LocalBitcoin`, `EasyMiner`, `Cropi`). The match should appear and the snippet should contain the surrounding sentence.

- [ ] **Step 4: Commit**

```bash
git add js/search.js
git commit -m "feat(search): match podcast sections, link results internally

Swaps the now-removed podcast.transcript field for sections[] in the
search GROQ — both heading text and body Portable Text are searched
and projected as bodyText for snippet extraction. Podcast result
cards now link to podcast.html?slug=… (internal) with YouTube as a
fallback for any podcast without a slug.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Check the Craggle Bear transcript into the data folder

**Files:**
- Create: `studio-orenews/scripts/data/cragglebear-transcript.md`

- [ ] **Step 1: Copy the transcript**

```bash
cp ~/Downloads/cragglebear_transcript.md /Users/kwokfaywilliamdeng/ore-news/studio-orenews/scripts/data/cragglebear-transcript.md
```

- [ ] **Step 2: Verify it copied correctly**

```bash
head -5 /Users/kwokfaywilliamdeng/ore-news/studio-orenews/scripts/data/cragglebear-transcript.md
wc -l /Users/kwokfaywilliamdeng/ore-news/studio-orenews/scripts/data/cragglebear-transcript.md
```

Expected: first line is `# MineMore Insiders Chat with Craggle Bear`, line count around 353.

- [ ] **Step 3: Commit**

```bash
git add studio-orenews/scripts/data/cragglebear-transcript.md
git commit -m "chore(studio): check in Ore Insiders Ep. 2 transcript source

Adds the Craggle Bear transcript markdown for repeatable seeding via
the upcoming seed-cragglebear-transcript.ts script.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Build the seed script for Ep. 2

**Files:**
- Create: `studio-orenews/scripts/seed-cragglebear-transcript.ts`

- [ ] **Step 1: Write the seed script**

Create `studio-orenews/scripts/seed-cragglebear-transcript.ts` with:

```ts
import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const client = createClient({
  projectId: 'w9x60sjf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Mapping from markdown section heading → timestamp in seconds.
// Sections without a clean clip match leave timestamp undefined (TOC scroll only).
const TIMESTAMPS: Record<string, number | undefined> = {
  'Introduction': 0,
  'Compound ORE & the Mine Master Competition': 261,
  "Spuddy's Secret Development Mode & Lotto Mining": 443,
  "Craggle Bear's First Exposure to Bitcoin (2015)": 684,
  "Brian's Early Mining Story": undefined,
  'Why ORE: Fair Distribution & No VCs': undefined,
  "Craggle Bear's Crypto Journey: From Coinbase to Solana": 1129,
  'The Meme Coin Reverse Midas Touch': undefined,
  'From NFTs to Meteora to ORE': 1385,
  'Joining MineMore': 1420,
  'Seeker Phone vs. Ethereum Phone': 1533,
  "The Pain of Ethereum's Fragmented Chains": undefined,
  "ORE's Staying Power in the Bear Market": 1796,
  "APY, Revenue & ORE's Long-Term Value": 1985,
  'DeFi Future of ORE': 2142,
  'The ORE Foundation & Community Marketing': 2472,
  'Mining Strategies & Sharing Knowledge': 2844,
  "Brian's Multi-Platform Mining Approach": 2976,
  'Splitting ORE Across Accounts': 3098,
  'Market Conditions & Holding Through Chaos': 3185,
  'Closing': undefined,
}

interface ParsedSection {
  heading: string
  paragraphs: string[]
}

function parseMarkdown(md: string): ParsedSection[] {
  const lines = md.split('\n')
  const sections: ParsedSection[] = []
  let current: ParsedSection | null = null
  let buffer: string[] = []

  const flushBuffer = () => {
    if (!current) return
    const text = buffer.join('\n').trim()
    buffer = []
    if (!text) return
    // Split on blank lines into paragraphs
    text
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n/g, ' ').trim())
      .filter(Boolean)
      .forEach((p) => current!.paragraphs.push(p))
  }

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      flushBuffer()
      current = {heading: h2[1], paragraphs: []}
      sections.push(current)
      continue
    }
    if (line.startsWith('# ')) continue // top-level title
    if (line.trim() === '---') continue // horizontal rules
    if (!current) continue // skip lead matter before first ##
    buffer.push(line)
  }
  flushBuffer()
  return sections
}

let keyCounter = 0
function key(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [],
    children: [{_type: 'span' as const, _key: key(), text, marks: []}],
  }))
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('Set SANITY_TOKEN env var')
  }
  const dryRun = process.argv.includes('--dry-run')

  const mdPath = resolve(__dirname, 'data/cragglebear-transcript.md')
  const md = readFileSync(mdPath, 'utf-8')
  const parsed = parseMarkdown(md)

  console.log(`Parsed ${parsed.length} sections from markdown:`)
  for (const s of parsed) {
    const ts = TIMESTAMPS[s.heading]
    const tsLabel = typeof ts === 'number' ? `${ts}s` : '—'
    console.log(`  [${tsLabel.padStart(6)}]  ${s.heading}  (${s.paragraphs.length} paragraphs)`)
  }

  // Sanity check: every parsed heading must be in TIMESTAMPS (catches typos / drift).
  const missingKeys = parsed.filter((s) => !(s.heading in TIMESTAMPS)).map((s) => s.heading)
  if (missingKeys.length) {
    throw new Error(
      `Headings parsed from markdown not in TIMESTAMPS map:\n  - ${missingKeys.join('\n  - ')}`,
    )
  }

  const sections = parsed.map((s) => ({
    _type: 'section',
    _key: key(),
    heading: s.heading,
    timestamp: TIMESTAMPS[s.heading],
    body: paragraphsToBlocks(s.paragraphs),
  }))

  // Find the target podcast doc.
  const target: {_id: string; title: string} | null = await client.fetch(
    `*[_type == "podcast" && show == "ore-insiders" && episode == 2][0]{_id, title}`,
  )
  if (!target) {
    throw new Error('No Ore Insiders Ep. 2 podcast document found in Sanity')
  }
  console.log(`\nTarget: ${target._id}  (${target.title})`)

  if (dryRun) {
    console.log('Dry-run — would patch sections (count =', sections.length, ')')
    return
  }

  await client.patch(target._id).set({sections}).commit()
  console.log('Patched.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
```

What this does:
- Reads `data/cragglebear-transcript.md`.
- Splits on `## ` to extract sections; collapses consecutive non-blank lines within a paragraph and splits paragraphs on blank lines.
- Asserts that every heading parsed from the file is present in the `TIMESTAMPS` map (so a future edit to the markdown surface a clear error rather than silently dropping a section).
- Builds Portable Text blocks from the paragraphs.
- Patches the Ore Insiders Ep. 2 doc (looked up by `show == "ore-insiders" && episode == 2`).
- Supports `--dry-run` to print what it would do without writing.

- [ ] **Step 2: Dry-run**

```bash
cd /Users/kwokfaywilliamdeng/ore-news/studio-orenews
SANITY_TOKEN=<paste-token> npx tsx scripts/seed-cragglebear-transcript.ts --dry-run
```

Expected: 21 sections listed, each with its timestamp (or `—` for the five with no clip match), each with a paragraph count > 0. Then `Target: <id>  (<title>)`. Then `Dry-run — would patch sections (count = 21)`.

If the parser throws "Headings parsed from markdown not in TIMESTAMPS map", a heading was edited or whitespace-changed in the markdown. Fix the heading in the markdown OR add it to the map and re-run.

- [ ] **Step 3: Run for real**

```bash
SANITY_TOKEN=<paste-token> npx tsx scripts/seed-cragglebear-transcript.ts
```

Expected: same listing, then `Patched.`

- [ ] **Step 4: Verify in Studio + on the page**

Studio: open Ore Insiders Ep. 2. Confirm Transcript Sections has 21 entries with correct headings, timestamps, and paragraph bodies.

Page: open `http://localhost:3333/podcast.html?slug=ep-2-minemore-insiders-chat-with-craggle-bear` (or whatever slug Task 2 generated for Ep. 2 — check Studio if unsure). Verify:
- Header reads `Ore Insiders · Ep. 2`.
- Title is the episode title.
- YouTube embed loads (the existing `videoId` is `_xsNWpL6G3s`).
- TOC has 21 entries; the ones with timestamps show e.g. `4:21`.
- Click "Compound ORE & the Mine Master Competition" — page scrolls to that section AND the YouTube player jumps to ~4:21 and starts playing.
- Click "Brian's Early Mining Story" (no timestamp) — page scrolls but the player does not seek.

- [ ] **Step 5: Commit**

```bash
cd /Users/kwokfaywilliamdeng/ore-news
git add studio-orenews/scripts/seed-cragglebear-transcript.ts
git commit -m "chore(studio): seed Ore Insiders Ep. 2 transcript sections

Parses cragglebear-transcript.md into 21 sections, applies the
heading→timestamp map agreed in the design, and patches the existing
Ore Insiders Ep. 2 podcast document. Idempotent — re-running replaces
the sections array. Supports --dry-run.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: End-to-end smoke test

**Files:** None modified.

- [ ] **Step 1: Walk through the user-facing surface**

In a browser, hard-reload each page and verify the listed condition. The dev server is running on port 3333.

1. **Home page** (`http://localhost:3333/`)
   - Ore Insiders CD rack shows the latest episodes.
   - Hover any CD: status bar shows `podcast.html?slug=…`.
   - Click Ep. 2 — podcast page loads.

2. **Podcast page — Ep. 2** (the URL you just landed on)
   - Eyebrow `Ore Insiders · Ep. 2`, title and description set.
   - YouTube embed plays.
   - "Watch on YouTube ↗" link goes to the existing YouTube URL in a new tab.
   - TOC has 21 entries.
   - Click each timestamped entry — page scrolls AND player seeks. (At least try 3 different ones.)
   - Click an un-timestamped entry — page scrolls only.

3. **Archives podcasts** (`http://localhost:3333/archives-podcasts.html`)
   - Each card label reads `Listen →`.
   - Clicking any card opens the corresponding podcast page in the same tab.

4. **Search** (`http://localhost:3333/search.html`)
   - Search for `craggle` — Ep. 2 appears.
   - Search for `LocalBitcoin` — Ep. 2 appears with a snippet containing the matching sentence ("…site called LocalBitcoin.com…").
   - Click the podcast card — internal page loads (no new tab).
   - Search for a term known to be in an article body — article result still works correctly.

5. **Direct URL — bad slug** (`http://localhost:3333/podcast.html?slug=does-not-exist`)
   - Page renders "Podcast not found" without errors in the console.

- [ ] **Step 2: If anything fails, fix and re-verify**

If any condition fails, locate the regression in the relevant task's commit, fix it in a focused new commit, and re-run the affected smoke step. Do not amend earlier commits.

- [ ] **Step 3: Push**

```bash
cd /Users/kwokfaywilliamdeng/ore-news
git push origin main
```

---

## Self-review checks

Plan covers every spec section:

- **Schema changes** — Task 1.
- **Backfill script** — Task 2.
- **Seed content for Ep. 2** — Tasks 10 + 11.
- **Page (`podcast.html`)** — Task 3 (shell), Task 6 (CSS).
- **Frontend logic (`js/podcast.js`)** — Task 4 (fetch + render), Task 5 (YouTube IFrame API + seek).
- **Linking changes — `js/app.js`** — Task 7.
- **Linking changes — archives** — Task 8.
- **Linking changes — `js/search.js` (link + GROQ rename)** — Task 9.
- **Known follow-up: search snippet GROQ migration** — addressed in Task 9.

All tasks include exact file paths, complete code blocks (no "TBD"/"similar to"), explicit verification steps, and commit boundaries. Method names referenced across tasks are consistent: `loadPodcast`, `renderEmbed`, `renderTOC`, `renderSections`, `attachTOCSeek`, `initYouTubeAPI`, `createPlayer`, `formatTimestamp`. The `formatTimestamp` helper appears in both `studio-orenews/schemaTypes/podcast.ts` (TypeScript, for Studio preview) and `js/podcast.js` (vanilla JS, for the page) — same logic, two languages, intentional duplication since they share no module boundary.

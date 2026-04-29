---
name: Podcast page with YouTube embed and timestamped transcript sections
status: design
date: 2026-04-30
---

# Podcast page

Each podcast (Ore Insiders and Minerside Chats) gets a dedicated page on
orenews.supply. The page embeds the YouTube video at the top and renders the
transcript as a list of sections below. A clickable table of contents seeks the
video player to the section's timestamp and scrolls the transcript into view.

This mirrors the existing article page (`article.html` + `js/article.js`) for
visual and structural consistency, with the addition of an embedded YouTube
player wired up to the section navigation.

## Scope

Applies to both `ore-insiders` and `minerside-chats` shows. Schema changes are
type-wide; CD-rack and search wiring is updated for all podcasts regardless of
show. The Minerside Chats section on the home page is currently commented out;
when re-enabled it will use the same internal links automatically.

## Schema changes (`studio-orenews/schemaTypes/podcast.ts`)

Add the following fields to the `podcast` document type:

- **`slug`** — `slug` type, sourced from `title`, required. Used as the URL
  identifier (`/podcast.html?slug=…`). Matches the article schema's slug field.
- **`sections`** — array of `section` objects. Each `section` has:
  - `heading` — string, required. Displayed as the section's `<h2>` and TOC
    label.
  - `timestamp` — string, required. Format `mm:ss` or `hh:mm:ss`. Validated by
    a regex `/^(\d+:)?\d{1,2}:\d{2}$/`. Used to seek the YouTube player.
  - `body` — Portable Text array (`block` only — no images for now to keep
    transcript rendering simple).
  - Preview shows `heading` as title and `timestamp` as subtitle.

Remove the existing flat `transcript` Portable Text field. There is no
production data in it; deleting cleanly avoids carrying a deprecated field.

The remaining fields (`title`, `episode`, `show`, `description`, `tags`,
`color`, `videoId`, `thumbnail`, `url`, `publishedAt`) are unchanged.

### Backfill

Existing podcast documents have no `slug`. A one-off script
`studio-orenews/scripts/backfill-podcast-slugs.ts` patches each podcast
without a slug, generating the slug from `title` (lowercase, dashes, trimmed).
The script follows the pattern of existing scripts in that directory and uses
`@sanity/client` with the project's existing token.

The backfill does NOT populate `sections` — those remain empty until an editor
fills them in. The page handles empty `sections` gracefully (renders just the
video and description, no TOC).

## Page (`podcast.html`)

Layout, top to bottom:

1. **`ore-tally` aside** — identical to article.html (max supply / circulating
   stats + nav). Reused as-is.
2. **Header**:
   - Eyebrow: show label (`Ore Insiders` or `Minerside Chats`) plus episode
     number (e.g. `Ore Insiders · Ep. 12`).
   - `<h1>` title.
   - Subtitle: `description` text (if present).
   - Date: `publishedAt` formatted like article page.
3. **YouTube embed**:
   - `<iframe>` with `src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0"`,
     `allowfullscreen`, `loading="lazy"`, 16:9 aspect ratio (CSS
     `aspect-ratio: 16/9`).
   - "Watch on YouTube" link below the embed pointing to the existing `url`
     field.
4. **Table of contents** (only rendered if `sections.length > 0`):
   - `<nav class="podcast-toc">` mirrors `.deep-dive-toc` styling.
   - Each entry: `<a href="#s{i}" data-seconds="{n}">{timestamp} · {heading}</a>`.
5. **Transcript sections**:
   - Each section is `<section class="podcast-section" id="s{i}">` with `<h2>`
     heading and Portable Text body.

The page reuses the article CSS where possible (`.deep-dive`, `.deep-dive-toc`,
`.deep-dive-content`) with podcast-specific classes (`.podcast-embed`,
`.podcast-toc`, `.podcast-section`) for the embed and any styling deltas.

## Frontend logic (`js/podcast.js`)

1. On `DOMContentLoaded`, parse `?slug=` from the URL. If missing, render a
   "Podcast not found" state.
2. Fetch the podcast:
   ```groq
   *[_type == "podcast" && slug.current == $slug][0] {
     title, episode, show, description, videoId, url, publishedAt,
     sections[] { heading, timestamp, body }
   }
   ```
3. Render the header, embed iframe, TOC, and sections.
4. Inject the YouTube IFrame Player API script
   (`https://www.youtube.com/iframe_api`).
5. Once the API is ready (`onYouTubeIframeAPIReady` global callback),
   instantiate `new YT.Player(iframeEl, { events: { onReady } })`.
6. TOC click handler:
   - `e.preventDefault()`.
   - Parse `data-seconds` from the link.
   - If the player is ready, call `player.seekTo(seconds, true)` and
     `player.playVideo()`.
   - Smooth-scroll the target section into view.
   - Update `location.hash` to `#s{i}` for shareability.
7. Fallback: if the API fails to load, the click handler still scrolls; the
   embed remains usable as a normal video. The `aria-label` on each TOC link
   includes the timestamp for accessibility.

`parseTimestamp(str)` helper: splits on `:`, supports `mm:ss` and `hh:mm:ss`,
returns total seconds.

## Linking changes

- **`js/app.js:114` `createCDEl`** — link to `podcast.html?slug=${slug}` when
  slug exists; fall back to `cd.url` only if no slug. Update the GROQ in
  `loadContent` to include `"slug": slug.current`.
- **Archives — `archives-podcasts.html` (or its JS)** — same change.
- **`js/search.js`** — podcast card href becomes
  `podcast.html?slug=${slug}` (internal, no `target="_blank"`). Update
  `searchPodcasts` GROQ to project `"slug": slug.current`.

The external YouTube URL is no longer the primary link, but is preserved on the
podcast page itself as the "Watch on YouTube" button.

## Out of scope (v1)

These can be added in follow-ups:

- SEO meta tags / OG image / `twitter:card` on the podcast page.
- JSON-LD `PodcastEpisode` structured data.
- Inline images or pull quotes inside transcript bodies (keeping body to
  `block` only for v1).
- Auto-highlighting the current section as the video plays (would require
  polling `player.getCurrentTime()` and matching against timestamps).
- Search snippet sentence-extraction reading from `sections[].body` (the
  current implementation reads from `transcript` via `pt::text()`; this needs
  to follow when the schema changes — captured here as a known follow-up).

## Known follow-up

The previous search-snippet work added `pt::text(transcript) match $q` to the
podcast GROQ in `js/search.js`. When `transcript` is removed, that needs to
become `pt::text(sections[].body) match $q` (and the `bodyText` projection
similarly). This is a one-line change that will be part of the implementation
plan for this spec.

## Files touched

- `studio-orenews/schemaTypes/podcast.ts` (schema)
- `studio-orenews/scripts/backfill-podcast-slugs.ts` (new)
- `podcast.html` (new)
- `js/podcast.js` (new)
- `css/style.css` (new podcast-specific styles)
- `js/app.js` (CD rack link)
- `archives-podcasts.html` and/or its JS (archives links)
- `js/search.js` (search result link + GROQ)

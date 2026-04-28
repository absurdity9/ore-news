# Search Page — Design Spec

**Date:** 2026-04-28
**Issue:** https://github.com/absurdity9/ore-news/issues/6

## Overview

Add client-side search to `search.html` that queries articles and podcasts from Sanity via GROQ. Uses the existing `sanityFetch()` wrapper — no new dependencies, no backend, no build step.

## Content Types Searched

- **Articles** — fields: `title`, `subtitle`, section `heading`s
- **Podcasts** — fields: `title`, `description`

Magazines, authors, and tags are excluded. Magazines largely duplicate articles; authors and tags are not meaningful search targets.

## Search Behavior

- Single search input, no filters
- Debounced at 300ms after last keystroke
- Fires a GROQ query using the `match` operator against targeted fields
- Results ordered by `publishedAt` descending (newest first)
- Empty query clears results and returns to empty state (search box + prompt text only)
- "No results found" message when query matches nothing
- Minimum query length: 2 characters (avoids overly broad matches)

## GROQ Query

```groq
*[
  _type == "article" && (
    title match $q ||
    subtitle match $q ||
    sections[].heading match $q
  )
] | order(publishedAt desc) {
  _type,
  title,
  subtitle,
  "slug": slug.current,
  publishedAt,
  "snippet": coalesce(subtitle, sections[0].heading)
}
```

```groq
*[
  _type == "podcast" && (
    title match $q ||
    description match $q
  )
] | order(publishedAt desc) {
  _type,
  title,
  description,
  episode,
  show,
  url,
  publishedAt,
  "snippet": description
}
```

Both queries run in parallel via `Promise.all` and results are merged and sorted by `publishedAt` descending.

## Result Card

Each result displays:

| Element | Detail |
|---------|--------|
| **Type badge** | "Article" or "Podcast" — visually distinct color per type |
| **Title** | Clickable link. Articles → `article.html?slug=<slug>`. Podcasts → YouTube URL. |
| **Date** | Formatted `publishedAt` (e.g. "10 Apr 2026") |
| **Snippet** | First matched field value, truncated to ~120 characters. Articles: subtitle or first section heading. Podcasts: description. |

## Empty State

On page load (no query), the page shows:
- Search input with placeholder text "Search articles and podcasts..."
- No results container, no recent content

## UI Layout

- Replace the current "COMING SOON" placeholder in `search.html`
- Search input centered at the top of the `.scene-content` area
- Results list below, styled consistently with the existing site (parchment colors, serif fonts for titles, pixel font for badges)
- Mobile responsive — cards stack vertically, input full-width

## Files Changed

| File | Change |
|------|--------|
| `search.html` | Replace "Coming Soon" block with search input + results container. Add `<script>` tags for `sanity.js` and new `search.js`. |
| `js/search.js` | New file. Search logic: debounced input handler, GROQ queries, result rendering, empty/no-results states. |
| `css/style.css` | Add search-specific styles: input, result cards, type badges, snippet text, empty state. |

## Non-Goals

- No fuzzy/typo-tolerant search (GROQ `match` does prefix/word-boundary matching — `"min"` matches `"mining"` but not `"mning"`)
- No search result highlighting within snippets
- No tag or type filters
- No URL query parameter persistence (e.g. `?q=mining`)
- No pagination (if results exceed ~50 we can revisit, but current content volume is small)

# Archives Page Design Spec

## Overview

Two new pages — `archives-magazines.html` and `archives-podcasts.html` — providing a full browsable archive of all Mineshaft Weekly dispatches and Ore Insiders podcast episodes. Both pages share an identical structural frame with tab-like navigation between them. Designed to scale to hundreds of items via client-side pagination.

## Pages

### archives-magazines.html (Mineshaft Weekly)

- **Tab nav**: "Mineshaft Weekly" tab active (gold), "Ore Insiders" tab inactive (dark) — links to `archives-podcasts.html`
- **Grid**: 4-column responsive grid of vertical cards
- **Card content**: Cover image (existing `images/magazines/` assets), date label, headline text
- **Card style**: Parchment background (`--parchment`), black border, rounded corners — consistent with existing magazine cover styling
- **Pagination**: 8 items per page (2 rows of 4), numbered page buttons with prev/next

### archives-podcasts.html (Ore Insiders)

- **Tab nav**: "Ore Insiders" tab active (gold), "Mineshaft Weekly" tab inactive (dark) — links to `archives-magazines.html`
- **Grid**: 2-column responsive grid of horizontal cards
- **Card content**: Left side — black vinyl disc with YouTube thumbnail centered, episode number badge in corner. Right side — "ORE INSIDERS" eyebrow label, episode title, "YouTube →" link
- **Card style**: Parchment gradient background, black border, rounded corners
- **Pagination**: 8 items per page (4 rows of 2), numbered page buttons with prev/next

## Shared Structure

Both pages use an identical outer frame:

1. **Nav bar** (`.ore-tally`) — same as index.html and deep-dive.html, with "Archives" link added and set to `.active`
2. **Cave background** — same gradient as index.html
3. **Newsstand panel** — wooden panel with wood-grain gradients, border, box-shadow
4. **"MINESHAFT ARCHIVES" plaque** — centered, parchment background, pixel font
5. **Tab navigation** — two connected pill buttons below the plaque. Active tab: gold background (`--gold`), dark text. Inactive tab: dark cave background (`--cave-mid`), light text. These are `<a>` links to the other page, not JS toggles.
6. **Content grid** — tab-specific layout (see above)
7. **Pagination controls** — centered row of page number buttons. Active page: gold. Inactive: dark cave. Prev/Next buttons disabled (dimmed) when at first/last page.
8. **Newsstand base** — wooden base bar matching index.html

## Navigation Updates

Add "Archives" link to the nav bar on all pages:

- **index.html**: Add `<a href="archives-magazines.html">Archives</a>` after the Deep Dive link
- **deep-dive.html**: Add `<a href="archives-magazines.html">Archives</a>` after the Deep Dive link
- **archives-magazines.html**: "Archives" link has `.active` class
- **archives-podcasts.html**: "Archives" link has `.active` class

The Archives link defaults to the magazines page.

## Data Source

Both pages fetch from the existing `data/content.json`. No schema changes needed — the current `magazines` and `cds` arrays already contain all required fields:

- **Magazines**: `id`, `week`, `cover`, `url`
- **CDs**: `id`, `episode`, `title`, `color`, `videoId`, `thumbnail`, `url`

Headline text for magazine cards: extract from existing cover images or add a `headline` field to content.json entries. If adding the field, it's optional — cards without it show only the date.

## Pagination Logic (JS)

- Read full array from content.json
- `ITEMS_PER_PAGE = 8`
- Calculate total pages: `Math.ceil(items.length / ITEMS_PER_PAGE)`
- Slice array for current page: `items.slice((page - 1) * 8, page * 8)`
- Render grid + pagination controls
- Clicking a page number re-renders the grid (no page reload)
- URL hash tracks page: `#page=2` (optional, for shareability)

## Responsive Behavior

### Magazines grid
- Desktop (>1023px): 4 columns
- Tablet (768–1023px): 3 columns
- Mobile (<768px): 2 columns

### Podcasts grid
- Desktop (>1023px): 2 columns
- Tablet (768–1023px): 2 columns
- Mobile (<768px): 1 column (full-width cards)

### Pagination
- Desktop: show all page numbers
- Mobile: show prev/next + current page indicator ("Page 2 of 5")

## CSS Approach

Add archive-specific styles to the existing `css/style.css`. New classes:

- `.archive-tabs` — tab navigation container
- `.archive-tab` / `.archive-tab.active` — individual tab links
- `.archive-grid` — shared grid container
- `.archive-grid--magazines` — 4-column modifier
- `.archive-grid--podcasts` — 2-column modifier
- `.archive-card` — shared card base
- `.archive-card-magazine` — vertical magazine card
- `.archive-card-podcast` — horizontal podcast card
- `.archive-pagination` — pagination container
- `.archive-page-btn` / `.archive-page-btn.active` — page buttons

## JS Approach

Create a new `js/archives.js` that:

1. On DOMContentLoaded, detects which page it's on (magazines vs podcasts) via a data attribute or page-specific element
2. Fetches `data/content.json`
3. Calls the appropriate render function with the full array
4. Manages pagination state (current page number)
5. Re-renders on page button clicks

Keep `js/app.js` unchanged — it handles the homepage only.

## Accessibility

- Tab navigation uses `role="tablist"` with `role="tab"` on each link
- Active tab has `aria-selected="true"`
- Grid items are links with descriptive `aria-label`
- Pagination buttons have `aria-label` ("Page 1", "Previous page", "Next page")
- Disabled prev/next buttons have `aria-disabled="true"`
- Images use `loading="lazy"`
- Noscript fallback: plain list of links (same pattern as index.html)

## Files to Create/Modify

**New files:**
- `archives-magazines.html`
- `archives-podcasts.html`
- `js/archives.js`

**Modified files:**
- `css/style.css` — add archive-specific styles
- `index.html` — add Archives nav link
- `deep-dive.html` — add Archives nav link
- `data/content.json` — optionally add `headline` field to magazine entries

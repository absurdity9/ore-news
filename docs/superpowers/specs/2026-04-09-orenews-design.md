# OreNews: The Miners News Stand — Design Spec

## Overview

A single-page, frontend-only website styled as an illustrated mining-themed news stand. The site displays magazine issues on a wooden bookshelf and CDs on a rack below. Each item is a clickable link to an external URL. Content is driven by a JSON data file.

## File Structure

```
ore-news/
├── index.html          # Single page
├── css/
│   └── style.css       # All styles
├── js/
│   └── app.js          # Load JSON, render content, interactivity
├── data/
│   └── content.json    # All magazine issues & CDs
└── assets/
    ├── backgrounds/    # Cave background, dirt texture
    ├── shelf/          # Wooden shelf images, bookshelf frame
    ├── covers/         # Unique magazine cover images per issue
    ├── cds/            # CD artwork images
    └── characters/     # Pixel miner character
```

## Technology

- Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies
- JSON data file loaded via `fetch()` for content rendering
- Deployable to GitHub Pages, Netlify, or any static file host

## Data Schema

`data/content.json`:

```json
{
  "magazines": [
    {
      "id": "issue-42",
      "title": "The Blue Crystal Cavern",
      "issueNumber": 42,
      "cover": "assets/covers/issue-42.png",
      "url": "https://example.com/issue-42",
      "row": 1
    }
  ],
  "cds": [
    {
      "id": "ep-1",
      "title": "Ore Insider Ep 1",
      "artwork": "assets/cds/ep-1.png",
      "url": "https://example.com/ep-1"
    }
  ]
}
```

- `row`: Determines shelf placement (1 = top shelf, 2 = bottom shelf). Items overflow to additional rows if more than 4 per row on desktop.
- All URLs are external links opened in new tabs

## Page Layout

Top to bottom:

1. **Header bar** — Light gray bar. Left: pickaxe icon + "OreNews: The Miners News Stand". Right: nav links (Home, Archive, Donate, Deep Dive). Archive/Donate/Deep Dive are placeholder `#` links for now.

2. **Cave background** — Full-width illustrated mine/cave scene filling the viewport behind the bookshelf.

3. **Bookshelf unit** — Centered wooden newsstand structure:
   - Header plaque: "MINE NEWS & ISSUES" in a wood/parchment style
   - **Top shelf row**: Up to 4 magazines standing upright
   - **Bottom shelf row**: Up to 4 more magazines
   - **CD rack**: Bottom section with up to 4 CDs laid out horizontally

4. **Pixel miner character** — Decorative pixel-art character standing to the left of the bookshelf.

5. **Footer** — Simple copyright bar: "Copyright 2022 News. All rights reserved."

## Responsive Behavior

- **Desktop (1024px+):** Full layout, 4 items per shelf row, character visible beside shelf
- **Tablet (768-1023px):** Bookshelf scales down, 3 items per row, character shrinks
- **Mobile (<768px):** 2 items per row, character hidden, bookshelf fills width, nav collapses to hamburger menu

## Visual Style

**Art direction:** Hand-drawn/illustrated, warm earthy mining theme. Cozy indie game aesthetic (Stardew Valley-inspired).

**Color palette:**
- Browns/tans — wood, dirt, warm shelf tones
- Dark grays/blacks — cave walls, deep background
- Blue accents — crystals, miner character, link highlights
- Cream/parchment — text areas, magazine backgrounds
- Gold/amber — highlights, hover states

**Typography:**
- Header/logo: Chunky, blocky pixel/adventure font (e.g., Press Start 2P)
- Magazine titles: Bold serif or slab-serif
- Body text/labels: Clean sans-serif

## Asset Strategy

All assets are AI-generated or sourced as part of the build:

| Asset | Description |
|-------|-------------|
| Cave background | Illustrated mine entrance with rocky walls, dirt floor, blue crystal accents |
| Wooden bookshelf | Standalone newsstand/shelf unit with wood texture |
| Shelf plaque | CSS-styled "MINE NEWS & ISSUES" with wood/parchment look |
| Magazine covers | Unique per issue — "Mineshaft Weekly" masthead with different mining illustrations |
| CD artwork | Circular disc designs with "Ore Insider" branding |
| Pixel miner character | Blue wizard/miner pixel-art sprite |
| Pickaxe logo icon | Small pixel-art pickaxe for the header |

## Interactivity

**Magazines:**
- Each is an `<a>` tag wrapping cover image + title
- Hover: subtle lift/tilt animation with glow/shadow
- "(Click to Read)" label beneath each
- Opens external URL in new tab

**CDs:**
- Each is an `<a>` tag wrapping artwork + title
- Hover: subtle spin or shine effect on disc
- "(Click to Play)" label beneath each
- Opens external URL in new tab

**Navigation:**
- Home: scrolls to top / active state
- Archive, Donate, Deep Dive: placeholder `#` links
- Mobile: hamburger menu toggles dropdown

**Content rendering:**
1. Page loads with static shell (header, background, empty shelf)
2. `app.js` fetches `data/content.json`
3. JS populates shelf rows with magazines and CD rack with CDs
4. Fallback: "No issues available" message if JSON fails to load

No search, filtering, modals, or other interactivity.

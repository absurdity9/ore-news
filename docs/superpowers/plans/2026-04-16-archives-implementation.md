# Archives Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two archive pages (magazines and podcasts) with paginated grids, tab-like navigation between them, and update the nav bar site-wide.

**Architecture:** Two separate HTML pages share an identical outer frame (nav, cave background, newsstand panel, plaque, tab bar, pagination, footer). A new `js/archives.js` handles fetching `data/content.json`, detecting which page is active, rendering the appropriate card grid, and managing pagination state. All archive-specific CSS goes into the existing `css/style.css`.

**Tech Stack:** Vanilla HTML, CSS, JavaScript. No build tools. Data from `data/content.json`.

---

### Task 1: Add "Archives" link to nav bar on all existing pages

**Files:**
- Modify: `index.html:90-93` (nav section)
- Modify: `deep-dive.html:102-105` (nav section)

- [ ] **Step 1: Add Archives link to index.html**

In `index.html`, change the nav from:

```html
<nav class="ore-tally-nav" aria-label="Primary">
    <a href="index.html" class="active">Home</a>
    <a href="deep-dive.html">Deep Dive</a>
</nav>
```

to:

```html
<nav class="ore-tally-nav" aria-label="Primary">
    <a href="index.html" class="active">Home</a>
    <a href="deep-dive.html">Deep Dive</a>
    <a href="archives-magazines.html">Archives</a>
</nav>
```

- [ ] **Step 2: Add Archives link to deep-dive.html**

In `deep-dive.html`, change the nav from:

```html
<nav class="ore-tally-nav" aria-label="Primary">
    <a href="index.html">Home</a>
    <a href="deep-dive.html" class="active">Deep Dive</a>
</nav>
```

to:

```html
<nav class="ore-tally-nav" aria-label="Primary">
    <a href="index.html">Home</a>
    <a href="deep-dive.html" class="active">Deep Dive</a>
    <a href="archives-magazines.html">Archives</a>
</nav>
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:8000` and `http://localhost:8000/deep-dive.html`. Confirm "Archives" appears as a third nav link on both pages.

- [ ] **Step 4: Commit**

```bash
git add index.html deep-dive.html
git commit -m "nav: add Archives link to all existing pages"
```

---

### Task 2: Create archives-magazines.html

**Files:**
- Create: `archives-magazines.html`

- [ ] **Step 1: Create the full HTML file**

Create `archives-magazines.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mineshaft Weekly Archives — OreNews</title>
    <meta name="description" content="Browse every Mineshaft Weekly dispatch — the miner's newspaper for ORE on Solana. Built by Minemore.app.">
    <meta name="author" content="Zinn Research">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#4a9eff">
    <link rel="canonical" href="https://orenews.supply/archives-magazines.html">

    <link rel="icon" type="image/png" href="images/character.png">
    <link rel="apple-touch-icon" href="images/character.png">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="OreNews">
    <meta property="og:url" content="https://orenews.supply/archives-magazines.html">
    <meta property="og:title" content="Mineshaft Weekly Archives — OreNews">
    <meta property="og:description" content="Browse every Mineshaft Weekly dispatch — the miner's newspaper for ORE on Solana.">
    <meta property="og:image" content="https://orenews.supply/images/character.png">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@zinnresearch">
    <meta name="twitter:title" content="Mineshaft Weekly Archives — OreNews">
    <meta name="twitter:description" content="Browse every Mineshaft Weekly dispatch — the miner's newspaper for ORE on Solana.">
    <meta name="twitter:image" content="https://orenews.supply/images/character.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Lora:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main class="cave-scene">
        <h1 class="sr-only">Mineshaft Weekly Archives — OreNews</h1>
        <div class="cave-crystals"></div>
        <aside class="ore-tally" role="region" aria-label="ORE supply">
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
                    <span class="ore-tally-stat-value"><img class="ore-glyph" src="images/ore-logo.svg" alt="" aria-hidden="true">449,835.25</span>
                </div>
            </div>
            <nav class="ore-tally-nav" aria-label="Primary">
                <a href="index.html">Home</a>
                <a href="deep-dive.html">Deep Dive</a>
                <a href="archives-magazines.html" class="active">Archives</a>
            </nav>
        </aside>
        <div class="scene-content">
            <div class="newsstand">
                <div class="newsstand-plaque">
                    <h2>MINESHAFT ARCHIVES</h2>
                </div>
                <div class="archive-tabs" role="tablist" aria-label="Archive sections">
                    <a href="archives-magazines.html" class="archive-tab active" role="tab" aria-selected="true">Mineshaft Weekly</a>
                    <a href="archives-podcasts.html" class="archive-tab" role="tab" aria-selected="false">Ore Insiders</a>
                </div>
                <div class="archive-grid archive-grid--magazines" id="archive-grid"></div>
                <div class="archive-pagination" id="archive-pagination"></div>
                <noscript>
                    <ul class="noscript-archives">
                        <li><a href="https://x.com/zinnresearch/status/2042692245858717710">Mineshaft Weekly — 10 April</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2040167806336151955">Mineshaft Weekly — 3 April</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2037642408775602487">Mineshaft Weekly — 27 March</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2035106448188088644">Mineshaft Weekly — 20 March</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2032566458383847550">Mineshaft Weekly — 13 March</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2030026967961989286">Mineshaft Weekly — 6 March</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2027491237448532308">Mineshaft Weekly — 27 Feb</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2024938733288456342">Mineshaft Weekly — 20 Feb</a></li>
                        <li><a href="https://x.com/zinnresearch/status/2022404152194928945">Mineshaft Weekly — 13 Feb</a></li>
                    </ul>
                </noscript>
                <div class="newsstand-base"></div>
            </div>
        </div>
    </main>

    <footer class="site-footer">
        <p>Copyright &copy; 2026 OreNews. All rights reserved. Built by <a href="https://minemore.app" target="_blank" rel="noopener noreferrer" class="minemore-credit"><img src="images/minemore-logo.png" alt="" class="minemore-logo">Minemore.app</a>.</p>
    </footer>

    <script src="js/archives.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add archives-magazines.html
git commit -m "feat: create archives-magazines.html page shell"
```

---

### Task 3: Create archives-podcasts.html

**Files:**
- Create: `archives-podcasts.html`

- [ ] **Step 1: Create the full HTML file**

Create `archives-podcasts.html`. It is identical to `archives-magazines.html` except:
- `<title>` is `Ore Insiders Podcast Archives — OreNews`
- Meta description is `Browse every Ore Insiders podcast episode — conversations with ORE miners and builders on Solana. Built by Minemore.app.`
- Canonical URL is `archives-podcasts.html`
- OG/Twitter meta tags match the podcast title/description
- `<h1>` is `Ore Insiders Podcast Archives — OreNews`
- The active tab switches: `archive-tab active` is on the "Ore Insiders" link, the "Mineshaft Weekly" link has no `active` class and `aria-selected="false"`
- The grid div uses class `archive-grid archive-grid--podcasts` instead of `archive-grid--magazines`
- Noscript block lists podcast episodes with YouTube links instead of magazine X links

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ore Insiders Podcast Archives — OreNews</title>
    <meta name="description" content="Browse every Ore Insiders podcast episode — conversations with ORE miners and builders on Solana. Built by Minemore.app.">
    <meta name="author" content="Zinn Research">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#4a9eff">
    <link rel="canonical" href="https://orenews.supply/archives-podcasts.html">

    <link rel="icon" type="image/png" href="images/character.png">
    <link rel="apple-touch-icon" href="images/character.png">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="OreNews">
    <meta property="og:url" content="https://orenews.supply/archives-podcasts.html">
    <meta property="og:title" content="Ore Insiders Podcast Archives — OreNews">
    <meta property="og:description" content="Browse every Ore Insiders podcast episode — conversations with ORE miners and builders on Solana.">
    <meta property="og:image" content="https://orenews.supply/images/character.png">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@zinnresearch">
    <meta name="twitter:title" content="Ore Insiders Podcast Archives — OreNews">
    <meta name="twitter:description" content="Browse every Ore Insiders podcast episode — conversations with ORE miners and builders on Solana.">
    <meta name="twitter:image" content="https://orenews.supply/images/character.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Lora:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main class="cave-scene">
        <h1 class="sr-only">Ore Insiders Podcast Archives — OreNews</h1>
        <div class="cave-crystals"></div>
        <aside class="ore-tally" role="region" aria-label="ORE supply">
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
                    <span class="ore-tally-stat-value"><img class="ore-glyph" src="images/ore-logo.svg" alt="" aria-hidden="true">449,835.25</span>
                </div>
            </div>
            <nav class="ore-tally-nav" aria-label="Primary">
                <a href="index.html">Home</a>
                <a href="deep-dive.html">Deep Dive</a>
                <a href="archives-magazines.html" class="active">Archives</a>
            </nav>
        </aside>
        <div class="scene-content">
            <div class="newsstand">
                <div class="newsstand-plaque">
                    <h2>MINESHAFT ARCHIVES</h2>
                </div>
                <div class="archive-tabs" role="tablist" aria-label="Archive sections">
                    <a href="archives-magazines.html" class="archive-tab" role="tab" aria-selected="false">Mineshaft Weekly</a>
                    <a href="archives-podcasts.html" class="archive-tab active" role="tab" aria-selected="true">Ore Insiders</a>
                </div>
                <div class="archive-grid archive-grid--podcasts" id="archive-grid"></div>
                <div class="archive-pagination" id="archive-pagination"></div>
                <noscript>
                    <ul class="noscript-archives">
                        <li><a href="https://www.youtube.com/watch?v=wV-oMcOgHMc">Ore Insiders Ep. 1 — Graeme Smith</a></li>
                        <li><a href="https://www.youtube.com/watch?v=_xsNWpL6G3s">Ore Insiders Ep. 2 — CraggleBear</a></li>
                        <li><a href="https://www.youtube.com/watch?v=cA7DUbVCSBE">Ore Insiders Ep. 3 — RHBCrypto</a></li>
                        <li><a href="https://www.youtube.com/watch?v=PC4-yLzwKI0">Ore Insiders Ep. 4 — MadHatter</a></li>
                    </ul>
                </noscript>
                <div class="newsstand-base"></div>
            </div>
        </div>
    </main>

    <footer class="site-footer">
        <p>Copyright &copy; 2026 OreNews. All rights reserved. Built by <a href="https://minemore.app" target="_blank" rel="noopener noreferrer" class="minemore-credit"><img src="images/minemore-logo.png" alt="" class="minemore-logo">Minemore.app</a>.</p>
    </footer>

    <script src="js/archives.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add archives-podcasts.html
git commit -m "feat: create archives-podcasts.html page shell"
```

---

### Task 4: Add archive CSS styles

**Files:**
- Modify: `css/style.css` (append after the existing `/* Newsstand base */` section, before responsive breakpoints)

- [ ] **Step 1: Add archive tab styles**

Append to `css/style.css` before the `/* ===== Responsive ===== */` comment:

```css
/* ===== Archive Pages ===== */

/* Tab navigation */
.archive-tabs {
    display: flex;
    justify-content: center;
    margin: 0 auto 0.75rem;
    width: fit-content;
}

.archive-tab {
    font-family: var(--font-pixel);
    font-size: 0.45rem;
    letter-spacing: 0.1em;
    padding: 0.45rem 1.2rem;
    border: 1.5px solid var(--wood-dark);
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
}

.archive-tab:first-child {
    border-radius: 4px 0 0 4px;
}

.archive-tab:last-child {
    border-radius: 0 4px 4px 0;
}

.archive-tab.active {
    background: var(--gold);
    color: var(--text-dark);
}

.archive-tab:not(.active) {
    background: var(--cave-mid);
    color: var(--text-light);
}

.archive-tab:not(.active):hover {
    background: var(--cave-wall);
}
```

- [ ] **Step 2: Add archive grid styles**

Continue appending:

```css
/* Archive grid — shared */
.archive-grid {
    display: grid;
    gap: 0.75rem;
    padding: 0 1rem;
    margin-bottom: 0.75rem;
}

.archive-grid--magazines {
    grid-template-columns: repeat(4, 1fr);
}

.archive-grid--podcasts {
    grid-template-columns: repeat(2, 1fr);
}
```

- [ ] **Step 3: Add magazine card styles**

```css
/* Magazine archive card */
.archive-card-magazine {
    display: flex;
    flex-direction: column;
    background: var(--parchment);
    border: 1.5px solid #000;
    border-radius: 3px;
    overflow: hidden;
    text-decoration: none;
    color: var(--text-dark);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.archive-card-magazine:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.archive-card-magazine .archive-card-cover {
    width: 100%;
    aspect-ratio: 5 / 3;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.archive-card-magazine .archive-card-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.archive-card-magazine .archive-card-body {
    padding: 0.5rem;
}

.archive-card-magazine .archive-card-date {
    font-family: var(--font-pixel);
    font-size: 0.4rem;
    color: var(--wood-dark);
    letter-spacing: 0.1em;
    margin-bottom: 0.2rem;
}

.archive-card-magazine .archive-card-headline {
    font-family: var(--font-serif);
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--text-dark);
}
```

- [ ] **Step 4: Add podcast card styles**

```css
/* Podcast archive card */
.archive-card-podcast {
    display: flex;
    background: linear-gradient(135deg, var(--parchment), var(--parchment-dark));
    border: 1.5px solid #000;
    border-radius: 4px;
    overflow: hidden;
    text-decoration: none;
    color: var(--text-dark);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.archive-card-podcast:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.archive-card-podcast .archive-card-disc {
    width: 100px;
    min-height: 90px;
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.archive-card-podcast .archive-card-vinyl {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background:
        radial-gradient(circle at 50% 50%,
            transparent 10px,
            rgba(0, 0, 0, 0.4) 10px,
            rgba(0, 0, 0, 0.4) 12px,
            #222 12px,
            #222 14px,
            transparent 14px,
            transparent 16px,
            rgba(0, 0, 0, 0.2) 16px,
            rgba(0, 0, 0, 0.2) 17px,
            transparent 17px
        ),
        radial-gradient(circle, #333 30%, #111 31%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.archive-card-podcast .archive-card-thumb {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.archive-card-podcast .archive-card-ep-badge {
    position: absolute;
    bottom: 6px;
    right: 6px;
    background: var(--gold);
    color: var(--text-dark);
    font-family: var(--font-pixel);
    font-size: 0.35rem;
    padding: 2px 5px;
    border-radius: 2px;
    font-weight: bold;
}

.archive-card-podcast .archive-card-info {
    padding: 0.6rem 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
}

.archive-card-podcast .archive-card-eyebrow {
    font-family: var(--font-pixel);
    font-size: 0.32rem;
    color: #8b5a1a;
    letter-spacing: 0.15em;
    margin-bottom: 0.2rem;
}

.archive-card-podcast .archive-card-title {
    font-family: var(--font-serif);
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--text-dark);
}

.archive-card-podcast .archive-card-link {
    font-family: var(--font-sans);
    font-size: 0.7rem;
    color: var(--wood-dark);
    margin-top: 0.3rem;
}
```

- [ ] **Step 5: Add pagination styles**

```css
/* Archive pagination */
.archive-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0 0.75rem;
}

.archive-page-btn {
    font-family: var(--font-pixel);
    font-size: 0.4rem;
    padding: 0.35rem 0.6rem;
    border: 1.5px solid var(--wood-dark);
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    background: var(--cave-mid);
    color: var(--text-light);
}

.archive-page-btn:hover {
    background: var(--cave-wall);
}

.archive-page-btn.active {
    background: var(--gold);
    color: var(--text-dark);
    cursor: default;
}

.archive-page-btn.disabled {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
}
```

- [ ] **Step 6: Add responsive overrides**

Add these inside the existing `@media` blocks in `css/style.css`:

Inside `@media (max-width: 1023px)` (tablet):

```css
    .archive-grid--magazines {
        grid-template-columns: repeat(3, 1fr);
    }
```

Inside `@media (max-width: 767px)` (mobile):

```css
    .archive-grid--magazines {
        grid-template-columns: repeat(2, 1fr);
    }

    .archive-grid--podcasts {
        grid-template-columns: 1fr;
    }

    .archive-pagination .archive-page-numbers {
        display: none;
    }

    .archive-pagination .archive-page-mobile {
        display: inline;
    }
```

Also add a default hide for the mobile indicator above the responsive section:

```css
.archive-page-mobile {
    display: none;
    font-family: var(--font-pixel);
    font-size: 0.4rem;
    color: var(--text-light);
}
```

- [ ] **Step 7: Verify CSS loads without errors**

Open `http://localhost:8000/archives-magazines.html` in browser. The page should show the newsstand frame with empty grid (no JS yet) and styled tabs.

- [ ] **Step 8: Commit**

```bash
git add css/style.css
git commit -m "style: add archive tabs, cards, grid, and pagination CSS"
```

---

### Task 5: Create js/archives.js — data loading and pagination

**Files:**
- Create: `js/archives.js`

- [ ] **Step 1: Create archives.js with full implementation**

Create `js/archives.js`:

```javascript
// Archives page — loads content.json, renders paginated magazine/podcast grids

const ITEMS_PER_PAGE = 8;

document.addEventListener('DOMContentLoaded', () => {
    loadArchives();
});

async function loadArchives() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        const isMagazines = grid.classList.contains('archive-grid--magazines');
        const items = isMagazines ? data.magazines : data.cds;

        const startPage = getPageFromHash();
        renderPage(items, startPage, isMagazines);

        window.addEventListener('hashchange', () => {
            renderPage(items, getPageFromHash(), isMagazines);
        });
    } catch (err) {
        console.error('Failed to load archives:', err);
        const grid = document.getElementById('archive-grid');
        if (grid) {
            grid.innerHTML = '<p style="text-align:center;font-family:var(--font-pixel);font-size:0.5rem;color:var(--gold);grid-column:1/-1;">Failed to load archives. Please try again.</p>';
        }
    }
}

function getPageFromHash() {
    const match = location.hash.match(/page=(\d+)/);
    return match ? Math.max(1, parseInt(match[1], 10)) : 1;
}

function renderPage(items, page, isMagazines) {
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    page = Math.min(page, totalPages) || 1;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

    const grid = document.getElementById('archive-grid');
    grid.innerHTML = '';
    pageItems.forEach(item => {
        grid.appendChild(isMagazines ? createMagazineCard(item) : createPodcastCard(item));
    });

    renderPagination(page, totalPages);
}

function createMagazineCard(mag) {
    const link = document.createElement('a');
    link.href = mag.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'archive-card-magazine';
    link.setAttribute('aria-label', `Mineshaft Weekly — ${mag.week}`);

    link.innerHTML = `
        <div class="archive-card-cover">
            <img src="${mag.cover}" alt="Mineshaft Weekly — ${mag.week}" loading="lazy">
        </div>
        <div class="archive-card-body">
            <div class="archive-card-date">${mag.week}</div>
            ${mag.headline ? `<div class="archive-card-headline">${mag.headline}</div>` : ''}
        </div>
    `;

    return link;
}

function createPodcastCard(cd) {
    const link = document.createElement('a');
    link.href = cd.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'archive-card-podcast';
    link.setAttribute('aria-label', `Ore Insiders Ep. ${cd.episode}: ${cd.title}`);

    const thumb = cd.thumbnail
        ? `<img class="archive-card-thumb" src="${cd.thumbnail}" alt="" loading="lazy">`
        : '';

    link.innerHTML = `
        <div class="archive-card-disc">
            <div class="archive-card-vinyl">
                ${thumb}
            </div>
            <span class="archive-card-ep-badge">Ep. ${cd.episode}</span>
        </div>
        <div class="archive-card-info">
            <span class="archive-card-eyebrow">ORE INSIDERS</span>
            <span class="archive-card-title">${cd.title}</span>
            <span class="archive-card-link">YouTube →</span>
        </div>
    `;

    return link;
}

function renderPagination(currentPage, totalPages) {
    const container = document.getElementById('archive-pagination');
    if (!container || totalPages <= 1) {
        if (container) container.innerHTML = '';
        return;
    }

    let html = '';

    // Prev button
    html += `<a class="archive-page-btn${currentPage === 1 ? ' disabled' : ''}" href="#page=${currentPage - 1}" aria-label="Previous page"${currentPage === 1 ? ' aria-disabled="true"' : ''}>Prev</a>`;

    // Page numbers (desktop)
    html += '<span class="archive-page-numbers">';
    for (let i = 1; i <= totalPages; i++) {
        html += `<a class="archive-page-btn${i === currentPage ? ' active' : ''}" href="#page=${i}" aria-label="Page ${i}">${i}</a>`;
    }
    html += '</span>';

    // Mobile indicator
    html += `<span class="archive-page-mobile">Page ${currentPage} of ${totalPages}</span>`;

    // Next button
    html += `<a class="archive-page-btn${currentPage === totalPages ? ' disabled' : ''}" href="#page=${currentPage + 1}" aria-label="Next page"${currentPage === totalPages ? ' aria-disabled="true"' : ''}>Next</a>`;

    container.innerHTML = html;
}
```

- [ ] **Step 2: Verify magazines page renders**

Open `http://localhost:8000/archives-magazines.html`. Confirm:
- 4-column grid of magazine cards with cover images and date labels
- No pagination shown (only 9 items, fits in 2 pages — pagination should appear with prev/1/2/next)
- Clicking a card opens the X/Twitter post

- [ ] **Step 3: Verify podcasts page renders**

Open `http://localhost:8000/archives-podcasts.html`. Confirm:
- 2-column grid of horizontal podcast cards
- Vinyl disc with thumbnail, episode badge, title, "YouTube →" link
- No pagination (only 4 items, fits on one page)

- [ ] **Step 4: Verify pagination with hash**

Navigate to `http://localhost:8000/archives-magazines.html#page=2`. Confirm page 2 shows the remaining magazines. Click "1" in pagination to go back.

- [ ] **Step 5: Commit**

```bash
git add js/archives.js
git commit -m "feat: add archives.js with paginated magazine and podcast rendering"
```

---

### Task 6: Final verification and polish

**Files:**
- All archive files created in previous tasks

- [ ] **Step 1: Test all pages have working nav**

Visit each page and click every nav link:
- `http://localhost:8000` → Home (active), Deep Dive, Archives all work
- `http://localhost:8000/deep-dive.html` → Home, Deep Dive (active), Archives all work
- `http://localhost:8000/archives-magazines.html` → Home, Deep Dive, Archives (active) all work
- `http://localhost:8000/archives-podcasts.html` → Home, Deep Dive, Archives (active) all work

- [ ] **Step 2: Test tab navigation between archive pages**

- On magazines page, click "Ore Insiders" tab → goes to podcasts page
- On podcasts page, click "Mineshaft Weekly" tab → goes to magazines page
- Active tab highlights correctly on each page

- [ ] **Step 3: Test responsive behavior**

Resize browser to tablet width (~900px):
- Magazine grid becomes 3 columns
- Podcast grid stays 2 columns

Resize to mobile width (~375px):
- Magazine grid becomes 2 columns
- Podcast grid becomes 1 column
- Pagination shows "Page X of Y" instead of numbered buttons

- [ ] **Step 4: Commit any polish fixes**

```bash
git add -A
git commit -m "fix: archive page polish and responsive adjustments"
```

(Skip this commit if no changes were needed.)

- [ ] **Step 5: Push all changes**

```bash
git push
```

# OreNews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, frontend-only mining-themed news stand website with JSON-driven content, illustrated cave aesthetic, and responsive design.

**Architecture:** Single `index.html` loads `css/style.css` for all visuals and `js/app.js` which fetches `data/content.json` and dynamically renders magazine covers onto shelf rows and CDs onto a rack. All assets are CSS/SVG-generated inline — no external image dependencies. The cave background, bookshelf, magazine covers, CD artwork, and pixel miner are all rendered with CSS gradients, box-shadows, and inline SVG.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, gradients, grid, animations), vanilla JavaScript (ES modules, fetch API), Google Fonts (Press Start 2P)

**Spec:** `docs/superpowers/specs/2026-04-09-orenews-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/app.js`
- Create: `data/content.json`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p css js data assets/{backgrounds,shelf,covers,cds,characters}
```

- [ ] **Step 2: Create `data/content.json` with sample data**

```json
{
  "magazines": [
    {
      "id": "issue-42",
      "title": "The Blue Crystal Cavern",
      "issueNumber": 42,
      "theme": "crystal",
      "url": "https://example.com/issue-42",
      "row": 1
    },
    {
      "id": "issue-43",
      "title": "Safety Protocols Updated",
      "issueNumber": 43,
      "theme": "safety",
      "url": "https://example.com/issue-43",
      "row": 1
    },
    {
      "id": "issue-44",
      "title": "New Shovel Review",
      "issueNumber": 44,
      "theme": "shovel",
      "url": "https://example.com/issue-44",
      "row": 1
    },
    {
      "id": "issue-45",
      "title": "Deepmine Expedition Log",
      "issueNumber": 45,
      "theme": "cart",
      "url": "https://example.com/issue-45",
      "row": 1
    },
    {
      "id": "issue-46",
      "title": "Gemstone Market Report",
      "issueNumber": 46,
      "theme": "gem",
      "url": "https://example.com/issue-46",
      "row": 2
    },
    {
      "id": "issue-47",
      "title": "Tunnel Engineering 101",
      "issueNumber": 47,
      "theme": "tunnel",
      "url": "https://example.com/issue-47",
      "row": 2
    },
    {
      "id": "issue-48",
      "title": "Lantern Maintenance Guide",
      "issueNumber": 48,
      "theme": "lantern",
      "url": "https://example.com/issue-48",
      "row": 2
    },
    {
      "id": "issue-49",
      "title": "Dynamite Safety Handbook",
      "issueNumber": 49,
      "theme": "dynamite",
      "url": "https://example.com/issue-49",
      "row": 2
    }
  ],
  "cds": [
    {
      "id": "ep-1",
      "title": "Ore Insider Ep 1",
      "color": "#4a9eff",
      "url": "https://example.com/ep-1"
    },
    {
      "id": "ep-2",
      "title": "Ore Insider Ep 2",
      "color": "#ff9e4a",
      "url": "https://example.com/ep-2"
    },
    {
      "id": "ep-3",
      "title": "Ore Insider Ep 3",
      "color": "#4aff9e",
      "url": "https://example.com/ep-3"
    },
    {
      "id": "ep-4",
      "title": "Ore Insider Ep 4",
      "color": "#ff4a9e",
      "url": "https://example.com/ep-4"
    }
  ]
}
```

- [ ] **Step 3: Create `index.html` with full page structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OreNews: The Miners News Stand</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Lora:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="site-header">
        <div class="header-inner">
            <a href="#" class="logo">
                <svg class="pickaxe-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="14" y="8" width="4" height="20" rx="1" fill="#8B7355"/>
                    <rect x="6" y="2" width="20" height="8" rx="2" fill="#7B8794"/>
                    <rect x="8" y="4" width="16" height="4" fill="#9AA5B1"/>
                    <rect x="6" y="2" width="4" height="4" fill="#627D98"/>
                    <rect x="22" y="2" width="4" height="4" fill="#627D98"/>
                </svg>
                <h1>OreNews : <span>The Miners News Stand</span></h1>
            </a>
            <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="main-nav">
                <a href="#" class="active">Home</a>
                <a href="#">Archive</a>
                <a href="#">Donate</a>
                <a href="#">Deep Dive</a>
            </nav>
        </div>
    </header>

    <main class="cave-scene">
        <div class="cave-crystals"></div>
        <div class="scene-content">
            <div class="pixel-miner" aria-hidden="true"></div>
            <div class="newsstand">
                <div class="newsstand-plaque">
                    <h2>MINE NEWS &amp; ISSUES</h2>
                </div>
                <div class="shelf" id="shelf-row-1">
                    <div class="shelf-items"></div>
                    <div class="shelf-board"></div>
                </div>
                <div class="shelf" id="shelf-row-2">
                    <div class="shelf-items"></div>
                    <div class="shelf-board"></div>
                </div>
                <div class="cd-rack" id="cd-rack">
                    <div class="cd-items"></div>
                </div>
                <div class="newsstand-base"></div>
            </div>
        </div>
    </main>

    <footer class="site-footer">
        <p>Copyright &copy; 2022 News. All rights reserved.</p>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create empty `css/style.css` and `js/app.js`**

`css/style.css`:
```css
/* OreNews Styles */
```

`js/app.js`:
```js
// OreNews App
```

- [ ] **Step 5: Verify and commit**

Open `index.html` in a browser. You should see raw unstyled content with the header, shelf structure, and footer text visible.

```bash
git add index.html css/style.css js/app.js data/content.json .gitignore
git commit -m "feat: project scaffolding with HTML structure and content data"
```

---

### Task 2: CSS Foundation & Color Palette

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Write CSS reset and custom properties**

```css
/* ===== Reset ===== */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Inter', sans-serif;
    color: #e8dcc8;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    max-width: 100%;
    display: block;
}

button {
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
}

/* ===== Custom Properties ===== */
:root {
    /* Browns / wood */
    --wood-dark: #5c3a1e;
    --wood-mid: #8b6914;
    --wood-light: #a47b4a;
    --wood-highlight: #c4a265;

    /* Cave */
    --cave-deep: #1a1a2e;
    --cave-mid: #2d2b3a;
    --cave-wall: #3d3530;
    --cave-floor: #5c4033;

    /* Accents */
    --crystal-blue: #4a9eff;
    --crystal-glow: #7fbfff;
    --gold: #d4a843;
    --gold-bright: #f0c94d;

    /* Parchment / text */
    --parchment: #f5e6c8;
    --parchment-dark: #d4c4a0;
    --text-dark: #2a1f14;
    --text-light: #e8dcc8;

    /* Header */
    --header-bg: #e8e0d4;
    --header-text: #3a3028;

    /* Fonts */
    --font-pixel: 'Press Start 2P', monospace;
    --font-serif: 'Lora', serif;
    --font-sans: 'Inter', sans-serif;
}
```

- [ ] **Step 2: Verify and commit**

Reload `index.html`. The page should now have a clean reset with no default margins or bullets. Text should be in Inter font.

```bash
git add css/style.css
git commit -m "feat: CSS foundation with reset and design tokens"
```

---

### Task 3: Header & Navigation

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add header styles**

Append to `css/style.css`:

```css
/* ===== Header ===== */
.site-header {
    background: var(--header-bg);
    border-bottom: 3px solid var(--wood-dark);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.pickaxe-icon {
    flex-shrink: 0;
}

.logo h1 {
    font-family: var(--font-pixel);
    font-size: 0.85rem;
    color: var(--header-text);
    line-height: 1.4;
}

.logo h1 span {
    display: block;
    font-size: 0.6rem;
    color: #6b5d4f;
    margin-top: 0.25rem;
}

.main-nav {
    display: flex;
    gap: 0.25rem;
}

.main-nav a {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--header-text);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;
}

.main-nav a:hover,
.main-nav a.active {
    background: rgba(90, 70, 50, 0.1);
    color: var(--wood-dark);
}

/* Hamburger — hidden on desktop */
.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
}

.hamburger span {
    display: block;
    width: 24px;
    height: 3px;
    background: var(--header-text);
    border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
}
```

- [ ] **Step 2: Verify and commit**

Reload. Header should be a light bar with the pixel-art pickaxe, "OreNews" title, and right-aligned nav links.

```bash
git add css/style.css
git commit -m "feat: header and navigation bar"
```

---

### Task 4: Cave Background Scene

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add cave scene styles**

Append to `css/style.css`:

```css
/* ===== Cave Scene ===== */
.cave-scene {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem 3rem;
    min-height: calc(100vh - 60px);

    /* Layered cave background */
    background:
        /* Stalactites along the top */
        radial-gradient(ellipse 60px 35px at 10% 0%, #3a3028 65%, transparent 66%),
        radial-gradient(ellipse 45px 50px at 25% 0%, #2d2520 65%, transparent 66%),
        radial-gradient(ellipse 70px 30px at 45% 0%, #3a3028 65%, transparent 66%),
        radial-gradient(ellipse 40px 45px at 60% 0%, #2d2520 65%, transparent 66%),
        radial-gradient(ellipse 55px 38px at 78% 0%, #3a3028 65%, transparent 66%),
        radial-gradient(ellipse 50px 42px at 92% 0%, #2d2520 65%, transparent 66%),

        /* Rocky wall texture */
        radial-gradient(circle 120px at 5% 40%, rgba(74, 158, 255, 0.06) 0%, transparent 70%),
        radial-gradient(circle 80px at 15% 60%, rgba(74, 158, 255, 0.04) 0%, transparent 70%),
        radial-gradient(circle 100px at 90% 30%, rgba(74, 158, 255, 0.05) 0%, transparent 70%),

        /* Main cave gradient */
        linear-gradient(
            180deg,
            #1a1510 0%,
            #2a2218 15%,
            #342a1e 30%,
            #3d3025 50%,
            #4a3828 70%,
            #5c4033 85%,
            #6b4c38 100%
        );
}

/* Crystal decorations */
.cave-crystals {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
}

.cave-crystals::before,
.cave-crystals::after {
    content: '';
    position: absolute;
}

/* Left crystal cluster */
.cave-crystals::before {
    left: 3%;
    bottom: 10%;
    width: 60px;
    height: 80px;
    background:
        linear-gradient(145deg, #4a9eff 0%, #2a6fcc 50%, #1a4f99 100%);
    clip-path: polygon(30% 100%, 15% 40%, 35% 0%, 55% 0%, 70% 35%, 50% 100%);
    filter: drop-shadow(0 0 15px rgba(74, 158, 255, 0.5));
    animation: crystal-glow 3s ease-in-out infinite alternate;
}

/* Right crystal cluster */
.cave-crystals::after {
    right: 5%;
    top: 20%;
    width: 45px;
    height: 65px;
    background:
        linear-gradient(160deg, #5ab0ff 0%, #3a80dd 50%, #2060aa 100%);
    clip-path: polygon(25% 100%, 10% 50%, 40% 0%, 60% 5%, 75% 45%, 55% 100%);
    filter: drop-shadow(0 0 12px rgba(74, 158, 255, 0.4));
    animation: crystal-glow 4s ease-in-out infinite alternate-reverse;
}

@keyframes crystal-glow {
    from { filter: drop-shadow(0 0 10px rgba(74, 158, 255, 0.3)); opacity: 0.8; }
    to { filter: drop-shadow(0 0 20px rgba(74, 158, 255, 0.6)); opacity: 1; }
}

.scene-content {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1.5rem;
    max-width: 900px;
    width: 100%;
}
```

- [ ] **Step 2: Verify and commit**

Reload. The page background should be a dark, warm cave gradient with stalactite shapes along the top and glowing blue crystal accents on the sides.

```bash
git add css/style.css
git commit -m "feat: illustrated cave background with crystal accents"
```

---

### Task 5: Newsstand / Bookshelf Frame

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add newsstand and shelf styles**

Append to `css/style.css`:

```css
/* ===== Newsstand ===== */
.newsstand {
    background:
        /* Wood grain effect */
        repeating-linear-gradient(
            90deg,
            transparent 0px,
            rgba(0,0,0,0.03) 2px,
            transparent 4px
        ),
        linear-gradient(
            180deg,
            #8b6914 0%,
            #7a5c12 20%,
            #6b5010 50%,
            #7a5c12 80%,
            #8b6914 100%
        );
    border: 4px solid var(--wood-dark);
    border-radius: 8px;
    padding: 0;
    width: 100%;
    max-width: 720px;
    box-shadow:
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        0 8px 32px rgba(0, 0, 0, 0.5),
        0 2px 8px rgba(0, 0, 0, 0.3);
    position: relative;
}

/* Plaque */
.newsstand-plaque {
    background:
        linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%);
    border: 3px solid var(--wood-dark);
    border-radius: 4px;
    margin: 1rem auto 0.5rem;
    padding: 0.5rem 1.5rem;
    width: fit-content;
    box-shadow:
        inset 0 1px 2px rgba(255,255,255,0.5),
        0 2px 4px rgba(0,0,0,0.3);
}

.newsstand-plaque h2 {
    font-family: var(--font-pixel);
    font-size: 0.7rem;
    color: var(--text-dark);
    letter-spacing: 1px;
    text-align: center;
}

/* Shelf row */
.shelf {
    padding: 0.75rem 1rem 0;
    position: relative;
}

.shelf-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    padding: 0 0.5rem;
    min-height: 160px;
    align-items: end;
}

/* The wooden shelf board */
.shelf-board {
    height: 12px;
    margin-top: 0.5rem;
    background:
        repeating-linear-gradient(
            90deg,
            transparent 0px,
            rgba(0,0,0,0.05) 1px,
            transparent 3px
        ),
        linear-gradient(180deg, #9a7530 0%, #7a5c12 40%, #5c3a1e 100%);
    border-radius: 2px;
    box-shadow:
        0 3px 6px rgba(0,0,0,0.4),
        inset 0 1px 1px rgba(255,255,255,0.15);
}

/* CD Rack */
.cd-rack {
    padding: 0.75rem 1rem;
    border-top: 3px solid rgba(0,0,0,0.2);
    margin-top: 0.25rem;
}

.cd-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    padding: 0 0.5rem;
    min-height: 120px;
    align-items: center;
}

/* Newsstand base */
.newsstand-base {
    height: 16px;
    background:
        linear-gradient(180deg, #5c3a1e 0%, #4a2e16 50%, #3d2510 100%);
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}
```

- [ ] **Step 2: Verify and commit**

Reload. You should see a warm-brown wooden newsstand structure centered in the cave, with a parchment-colored "MINE NEWS & ISSUES" plaque, two shelf areas with wooden boards, and a CD rack section below.

```bash
git add css/style.css
git commit -m "feat: wooden newsstand frame with shelf boards and plaque"
```

---

### Task 6: Content Rendering Engine

**Files:**
- Modify: `js/app.js`

- [ ] **Step 1: Write the JSON fetch and render logic**

```js
// OreNews App — loads content.json and renders magazines + CDs

document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    setupHamburger();
});

async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        renderMagazines(data.magazines);
        renderCDs(data.cds);
    } catch (err) {
        console.error('Failed to load content:', err);
        showError();
    }
}

function renderMagazines(magazines) {
    const row1 = document.querySelector('#shelf-row-1 .shelf-items');
    const row2 = document.querySelector('#shelf-row-2 .shelf-items');

    magazines.forEach(mag => {
        const target = mag.row === 1 ? row1 : row2;
        target.appendChild(createMagazineEl(mag));
    });
}

function createMagazineEl(mag) {
    const link = document.createElement('a');
    link.href = mag.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'magazine-item';
    link.setAttribute('aria-label', `Issue #${mag.issueNumber}: ${mag.title} (Click to Read)`);

    link.innerHTML = `
        <div class="magazine-cover" data-theme="${mag.theme}">
            <div class="cover-masthead">MINESHAFT<br>WEEKLY</div>
            <div class="cover-illustration">
                ${getCoverSVG(mag.theme)}
            </div>
            <div class="cover-footer">
                <span class="cover-issue">Issue #${mag.issueNumber}</span>
            </div>
        </div>
        <div class="magazine-label">
            <span class="magazine-title">Issue #${mag.issueNumber}: ${mag.title}</span>
            <span class="magazine-cta">(Click to Read)</span>
        </div>
    `;

    return link;
}

function renderCDs(cds) {
    const rack = document.querySelector('#cd-rack .cd-items');

    cds.forEach(cd => {
        rack.appendChild(createCDEl(cd));
    });
}

function createCDEl(cd) {
    const link = document.createElement('a');
    link.href = cd.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'cd-item';
    link.setAttribute('aria-label', `${cd.title} (Click to Play)`);

    link.innerHTML = `
        <div class="cd-disc" style="--cd-color: ${cd.color}">
            <div class="cd-label">
                <span class="cd-name">${cd.title}</span>
            </div>
            <div class="cd-hole"></div>
        </div>
        <span class="cd-cta">(Click to Play)</span>
    `;

    return link;
}

function showError() {
    const row1 = document.querySelector('#shelf-row-1 .shelf-items');
    row1.innerHTML = '<p class="shelf-error">No issues available. Check back soon!</p>';
}

function setupHamburger() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        nav.classList.toggle('open');
        btn.classList.toggle('active');
    });
}
```

- [ ] **Step 2: Write the cover SVG generator**

Add this function to `js/app.js`, after `createCDEl`:

```js
function getCoverSVG(theme) {
    const svgs = {
        crystal: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,58 20,30 35,5 45,5 55,25 40,58" fill="#4a9eff" opacity="0.9"/>
            <polygon points="45,58 40,35 50,15 58,18 60,40 50,58" fill="#3a80dd" opacity="0.8"/>
            <polygon points="20,58 15,45 22,30 30,32 28,58" fill="#5ab0ff" opacity="0.7"/>
            <line x1="35" y1="5" x2="38" y2="25" stroke="#7fbfff" stroke-width="1" opacity="0.6"/>
            <line x1="50" y1="15" x2="52" y2="32" stroke="#7fbfff" stroke-width="1" opacity="0.5"/>
        </svg>`,

        safety: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="42" rx="25" ry="8" fill="#d4a843" opacity="0.3"/>
            <path d="M20 35 Q20 18 40 15 Q60 18 60 35 L58 38 L22 38 Z" fill="#f0c94d"/>
            <rect x="35" y="10" width="10" height="8" rx="3" fill="#d4a843"/>
            <path d="M30 28 L37 35 L52 20" stroke="#2a6f2a" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>`,

        shovel: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="38" y="5" width="4" height="40" rx="1" fill="#8B7355" transform="rotate(15, 40, 25)"/>
            <ellipse cx="36" cy="48" rx="14" ry="10" fill="#7B8794" transform="rotate(15, 36, 48)"/>
            <ellipse cx="36" cy="48" rx="10" ry="7" fill="#9AA5B1" transform="rotate(15, 36, 48)"/>
            <rect x="35" y="3" width="10" height="6" rx="2" fill="#5c3a1e" transform="rotate(15, 40, 6)"/>
        </svg>`,

        cart: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 40 L20 20 L60 20 L65 40 Z" fill="#8B7355"/>
            <path d="M18 38 L22 22 L58 22 L62 38 Z" fill="#A08060"/>
            <polygon points="30,22 35,10 45,10 50,22" fill="#7B8794" opacity="0.6"/>
            <circle cx="22" cy="45" r="6" fill="#5c3a1e" stroke="#3d2510" stroke-width="2"/>
            <circle cx="58" cy="45" r="6" fill="#5c3a1e" stroke="#3d2510" stroke-width="2"/>
            <circle cx="22" cy="45" r="2" fill="#3d2510"/>
            <circle cx="58" cy="45" r="2" fill="#3d2510"/>
        </svg>`,

        gem: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="40,5 55,20 50,50 30,50 25,20" fill="#e04080"/>
            <polygon points="40,5 55,20 40,18 25,20" fill="#f06090" opacity="0.8"/>
            <polygon points="25,20 30,50 40,18" fill="#c03070" opacity="0.7"/>
            <polygon points="55,20 50,50 40,18" fill="#d03878" opacity="0.6"/>
            <line x1="40" y1="5" x2="40" y2="18" stroke="#ff80b0" stroke-width="1" opacity="0.5"/>
        </svg>`,

        tunnel: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="70" height="50" rx="2" fill="#3d3025"/>
            <ellipse cx="40" cy="35" rx="25" ry="22" fill="#1a1510"/>
            <ellipse cx="40" cy="35" rx="18" ry="16" fill="#0d0a08"/>
            <rect x="14" y="8" width="4" height="48" fill="#8B7355"/>
            <rect x="62" y="8" width="4" height="48" fill="#8B7355"/>
            <rect x="12" y="6" width="56" height="4" fill="#8B7355"/>
            <circle cx="40" cy="35" r="3" fill="#f0c94d" opacity="0.4"/>
        </svg>`,

        lantern: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="32" y="4" width="16" height="4" rx="2" fill="#8B7355"/>
            <path d="M30 8 L30 10 Q30 12 32 12 L48 12 Q50 12 50 10 L50 8 Z" fill="#5c3a1e"/>
            <rect x="30" y="12" width="20" height="30" rx="3" fill="#d4a843" opacity="0.3" stroke="#8B7355" stroke-width="2"/>
            <line x1="30" y1="18" x2="50" y2="18" stroke="#8B7355" stroke-width="1"/>
            <line x1="30" y1="36" x2="50" y2="36" stroke="#8B7355" stroke-width="1"/>
            <ellipse cx="40" cy="27" rx="6" ry="8" fill="#f0c94d" opacity="0.7"/>
            <ellipse cx="40" cy="27" rx="3" ry="5" fill="#fff4d4" opacity="0.5"/>
            <rect x="32" y="42" width="16" height="4" rx="2" fill="#5c3a1e"/>
            <circle cx="40" cy="27" r="12" fill="#f0c94d" opacity="0.1"/>
        </svg>`,

        dynamite: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="22" width="12" height="35" rx="3" fill="#cc3333" transform="rotate(-10, 31, 39)"/>
            <rect x="35" y="20" width="12" height="35" rx="3" fill="#dd4444"/>
            <rect x="45" y="22" width="12" height="35" rx="3" fill="#cc3333" transform="rotate(10, 51, 39)"/>
            <rect x="37" y="32" width="8" height="4" fill="#f0c94d"/>
            <path d="M41 20 Q42 12 45 8 Q46 6 44 5" stroke="#8B7355" stroke-width="1.5" fill="none"/>
            <circle cx="44" cy="4" r="3" fill="#f0c94d"/>
            <circle cx="44" cy="4" r="2" fill="#ff8833" opacity="0.8"/>
        </svg>`
    };

    return svgs[theme] || svgs.crystal;
}
```

- [ ] **Step 3: Verify and commit**

Reload the page. You should see 8 magazines rendered across two shelf rows and 4 CDs in the rack. The covers will show the SVG illustrations but won't be styled yet — that's the next task.

```bash
git add js/app.js
git commit -m "feat: content rendering engine with SVG cover generator"
```

---

### Task 7: Magazine Cover Styling

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add magazine item and cover styles**

Append to `css/style.css`:

```css
/* ===== Magazine Items ===== */
.magazine-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease, filter 0.3s ease;
    cursor: pointer;
}

.magazine-cover {
    width: 100%;
    max-width: 130px;
    aspect-ratio: 3 / 4;
    background:
        repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(0,0,0,0.02) 1px,
            transparent 3px
        ),
        linear-gradient(180deg, #f5e6c8 0%, #e8d8b4 50%, #dbc89a 100%);
    border: 2px solid #a08060;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow:
        2px 2px 6px rgba(0,0,0,0.3),
        inset 0 1px 2px rgba(255,255,255,0.4);
    position: relative;
}

.cover-masthead {
    font-family: var(--font-pixel);
    font-size: 0.45rem;
    color: var(--text-dark);
    text-align: center;
    padding: 0.4rem 0.25rem 0.2rem;
    line-height: 1.6;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    background: rgba(212, 168, 67, 0.15);
}

.cover-illustration {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
}

.cover-illustration svg {
    width: 70%;
    height: auto;
    max-height: 80%;
}

.cover-footer {
    padding: 0.2rem 0.25rem 0.3rem;
    border-top: 1px solid rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.05);
}

.cover-issue {
    font-family: var(--font-sans);
    font-size: 0.55rem;
    font-weight: 600;
    color: var(--text-dark);
}

.magazine-label {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin-top: 0.35rem;
    max-width: 130px;
}

.magazine-title {
    font-family: var(--font-sans);
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--parchment);
    line-height: 1.3;
}

.magazine-cta {
    font-family: var(--font-sans);
    font-size: 0.55rem;
    color: var(--gold);
    opacity: 0.8;
}

/* Hover */
.magazine-item:hover {
    transform: translateY(-6px) rotate(-1deg);
}

.magazine-item:hover .magazine-cover {
    box-shadow:
        3px 3px 12px rgba(0,0,0,0.4),
        0 0 15px rgba(74, 158, 255, 0.2),
        inset 0 1px 2px rgba(255,255,255,0.4);
}

.magazine-item:hover .magazine-cta {
    opacity: 1;
    color: var(--crystal-blue);
}

/* Error state */
.shelf-error {
    grid-column: 1 / -1;
    text-align: center;
    font-family: var(--font-pixel);
    font-size: 0.6rem;
    color: var(--gold);
    padding: 2rem;
}
```

- [ ] **Step 2: Verify and commit**

Reload. Magazines should appear as parchment-colored covers with "MINESHAFT WEEKLY" mastheads, themed SVG illustrations, and issue numbers. Hovering should lift and slightly tilt them with a glow effect.

```bash
git add css/style.css
git commit -m "feat: magazine cover styling with hover effects"
```

---

### Task 8: CD Rack Styling

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add CD disc styles**

Append to `css/style.css`:

```css
/* ===== CD Items ===== */
.cd-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.cd-disc {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background:
        radial-gradient(circle at 50% 50%,
            transparent 18px,
            rgba(0,0,0,0.3) 18px,
            rgba(0,0,0,0.3) 20px,
            var(--cd-color, #4a9eff) 20px,
            var(--cd-color, #4a9eff) 22px,
            transparent 22px,
            transparent 24px,
            rgba(255,255,255,0.1) 24px,
            rgba(255,255,255,0.1) 25px,
            transparent 25px
        ),
        conic-gradient(
            from 0deg,
            rgba(255,255,255,0.15) 0deg,
            transparent 30deg,
            rgba(255,255,255,0.1) 90deg,
            transparent 120deg,
            rgba(255,255,255,0.15) 180deg,
            transparent 210deg,
            rgba(255,255,255,0.1) 270deg,
            transparent 300deg,
            rgba(255,255,255,0.15) 360deg
        ),
        radial-gradient(circle at 50% 50%,
            #f5f5f5 16px,
            #e0e0e0 17px,
            var(--cd-color, #4a9eff) 18px
        ),
        linear-gradient(135deg,
            color-mix(in srgb, var(--cd-color, #4a9eff) 70%, #000) 0%,
            var(--cd-color, #4a9eff) 50%,
            color-mix(in srgb, var(--cd-color, #4a9eff) 70%, #fff) 100%
        );
    box-shadow:
        0 2px 8px rgba(0,0,0,0.4),
        inset 0 0 20px rgba(0,0,0,0.1);
    position: relative;
    transition: transform 0.4s ease, box-shadow 0.3s ease;
}

.cd-hole {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background:
        radial-gradient(circle, #f5f5f5 5px, #d0d0d0 6px, #888 7px, transparent 8px);
}

.cd-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.12);
}

.cd-name {
    font-family: var(--font-sans);
    font-size: 0.45rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    text-align: center;
    line-height: 1.2;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.cd-cta {
    font-family: var(--font-sans);
    font-size: 0.55rem;
    color: var(--gold);
    opacity: 0.8;
    margin-top: 0.4rem;
    transition: opacity 0.2s, color 0.2s;
}

/* Hover */
.cd-item:hover .cd-disc {
    transform: rotate(15deg);
    box-shadow:
        0 4px 16px rgba(0,0,0,0.5),
        0 0 20px rgba(var(--cd-color, 74, 158, 255), 0.3);
}

.cd-item:hover .cd-cta {
    opacity: 1;
    color: var(--crystal-blue);
}
```

- [ ] **Step 2: Verify and commit**

Reload. CDs should appear as realistic-looking circular discs with rainbow sheen, center holes, and "Ore Insider" labels. Each should have a unique tint color. Hovering should rotate the disc slightly.

```bash
git add css/style.css
git commit -m "feat: CD disc styling with spin hover effect"
```

---

### Task 9: Pixel Miner Character

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add pixel miner CSS art**

Append to `css/style.css`:

```css
/* ===== Pixel Miner Character ===== */
.pixel-miner {
    width: 96px;
    height: 128px;
    flex-shrink: 0;
    image-rendering: pixelated;
    position: relative;
    align-self: flex-end;
    margin-bottom: 1rem;

    /* Build the miner with box-shadows on a single pixel unit */
    /* Each shadow is a 6px "pixel" block */
    background: transparent;
}

.pixel-miner::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    bottom: 0;
    left: 0;
    background: transparent;
    box-shadow:
        /* Hat - pointy wizard/miner hat (blue) */
        42px -120px 0 0 #2255aa,
        48px -120px 0 0 #2255aa,
        36px -114px 0 0 #2255aa,
        42px -114px 0 0 #3366bb,
        48px -114px 0 0 #3366bb,
        54px -114px 0 0 #2255aa,
        30px -108px 0 0 #2255aa,
        36px -108px 0 0 #3366bb,
        42px -108px 0 0 #4477cc,
        48px -108px 0 0 #4477cc,
        54px -108px 0 0 #3366bb,
        60px -108px 0 0 #2255aa,
        24px -102px 0 0 #2255aa,
        30px -102px 0 0 #3366bb,
        36px -102px 0 0 #4477cc,
        42px -102px 0 0 #4477cc,
        48px -102px 0 0 #4477cc,
        54px -102px 0 0 #3366bb,
        60px -102px 0 0 #2255aa,

        /* Face */
        30px -96px 0 0 #e8c8a0,
        36px -96px 0 0 #e8c8a0,
        42px -96px 0 0 #e8c8a0,
        48px -96px 0 0 #e8c8a0,
        54px -96px 0 0 #e8c8a0,
        30px -90px 0 0 #e8c8a0,
        36px -90px 0 0 #222,
        42px -90px 0 0 #e8c8a0,
        48px -90px 0 0 #222,
        54px -90px 0 0 #e8c8a0,
        30px -84px 0 0 #e8c8a0,
        36px -84px 0 0 #e8c8a0,
        42px -84px 0 0 #d4a880,
        48px -84px 0 0 #e8c8a0,
        54px -84px 0 0 #e8c8a0,

        /* Body (blue tunic) */
        24px -78px 0 0 #3366bb,
        30px -78px 0 0 #3366bb,
        36px -78px 0 0 #4477cc,
        42px -78px 0 0 #4477cc,
        48px -78px 0 0 #4477cc,
        54px -78px 0 0 #3366bb,
        60px -78px 0 0 #3366bb,
        18px -72px 0 0 #4477cc,
        24px -72px 0 0 #3366bb,
        30px -72px 0 0 #4477cc,
        36px -72px 0 0 #d4a843,
        42px -72px 0 0 #4477cc,
        48px -72px 0 0 #d4a843,
        54px -72px 0 0 #4477cc,
        60px -72px 0 0 #3366bb,
        66px -72px 0 0 #4477cc,
        18px -66px 0 0 #e8c8a0,
        24px -66px 0 0 #3366bb,
        30px -66px 0 0 #4477cc,
        36px -66px 0 0 #4477cc,
        42px -66px 0 0 #4477cc,
        48px -66px 0 0 #4477cc,
        54px -66px 0 0 #4477cc,
        60px -66px 0 0 #3366bb,
        66px -66px 0 0 #e8c8a0,
        24px -60px 0 0 #3366bb,
        30px -60px 0 0 #3366bb,
        36px -60px 0 0 #4477cc,
        42px -60px 0 0 #4477cc,
        48px -60px 0 0 #4477cc,
        54px -60px 0 0 #3366bb,
        60px -60px 0 0 #3366bb,

        /* Belt */
        30px -54px 0 0 #8B7355,
        36px -54px 0 0 #8B7355,
        42px -54px 0 0 #d4a843,
        48px -54px 0 0 #8B7355,
        54px -54px 0 0 #8B7355,

        /* Legs (blue) */
        30px -48px 0 0 #2255aa,
        36px -48px 0 0 #3366bb,
        42px -48px 0 0 #2a2a3a,
        48px -48px 0 0 #3366bb,
        54px -48px 0 0 #2255aa,
        30px -42px 0 0 #2255aa,
        36px -42px 0 0 #3366bb,
        48px -42px 0 0 #3366bb,
        54px -42px 0 0 #2255aa,
        30px -36px 0 0 #2255aa,
        36px -36px 0 0 #2255aa,
        48px -36px 0 0 #2255aa,
        54px -36px 0 0 #2255aa,

        /* Boots (brown) */
        24px -30px 0 0 #5c3a1e,
        30px -30px 0 0 #5c3a1e,
        36px -30px 0 0 #5c3a1e,
        48px -30px 0 0 #5c3a1e,
        54px -30px 0 0 #5c3a1e,
        60px -30px 0 0 #5c3a1e,
        24px -24px 0 0 #4a2e16,
        30px -24px 0 0 #4a2e16,
        36px -24px 0 0 #4a2e16,
        48px -24px 0 0 #4a2e16,
        54px -24px 0 0 #4a2e16,
        60px -24px 0 0 #4a2e16;
}

/* Idle bobbing animation */
.pixel-miner {
    animation: miner-bob 2s ease-in-out infinite;
}

@keyframes miner-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
}
```

- [ ] **Step 2: Verify and commit**

Reload. A blue pixel-art miner character should appear to the left of the bookshelf, gently bobbing up and down. It has a pointed hat, face, blue tunic with gold buttons, belt, and brown boots.

```bash
git add css/style.css
git commit -m "feat: pixel miner character with idle animation"
```

---

### Task 10: Responsive Design & Hamburger Menu

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add responsive media queries**

Append to `css/style.css`:

```css
/* ===== Responsive ===== */

/* Tablet */
@media (max-width: 1023px) {
    .shelf-items {
        grid-template-columns: repeat(3, 1fr);
    }

    .cd-items {
        grid-template-columns: repeat(3, 1fr);
    }

    .pixel-miner {
        width: 64px;
        height: 90px;
        transform: scale(0.7);
        transform-origin: bottom center;
    }

    .newsstand {
        max-width: 560px;
    }

    .magazine-cover {
        max-width: 110px;
    }

    .cd-disc {
        width: 75px;
        height: 75px;
    }
}

/* Mobile */
@media (max-width: 767px) {
    /* Hamburger visible */
    .hamburger {
        display: flex;
    }

    .main-nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--header-bg);
        border-bottom: 3px solid var(--wood-dark);
        flex-direction: column;
        padding: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .main-nav.open {
        display: flex;
    }

    .main-nav a {
        padding: 0.75rem 1rem;
        border-radius: 4px;
    }

    /* Hamburger animation */
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }

    /* Header */
    .site-header {
        position: relative;
    }

    .logo h1 {
        font-size: 0.65rem;
    }

    .logo h1 span {
        font-size: 0.5rem;
    }

    /* Scene */
    .scene-content {
        flex-direction: column;
        align-items: center;
    }

    .pixel-miner {
        display: none;
    }

    /* Shelf */
    .shelf-items {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
        min-height: 130px;
    }

    .cd-items {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    .newsstand {
        max-width: 100%;
    }

    .magazine-cover {
        max-width: 120px;
    }

    .cd-disc {
        width: 70px;
        height: 70px;
    }

    .newsstand-plaque h2 {
        font-size: 0.55rem;
    }

    .cave-scene {
        padding: 1rem 0.5rem 2rem;
    }
}

/* Small mobile */
@media (max-width: 400px) {
    .logo h1 {
        font-size: 0.55rem;
    }

    .logo h1 span {
        display: none;
    }

    .magazine-cover {
        max-width: 100px;
    }

    .cd-disc {
        width: 60px;
        height: 60px;
    }

    .cover-masthead {
        font-size: 0.35rem;
    }

    .cd-name {
        font-size: 0.35rem;
    }
}
```

- [ ] **Step 2: Verify responsive behavior**

Test at these viewport widths:
- **1200px**: 4 magazines per row, miner visible, full nav
- **900px**: 3 per row, miner smaller
- **375px**: 2 per row, no miner, hamburger menu appears, nav hidden until hamburger clicked
- **360px**: Subtitle hidden, smaller covers

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: responsive design with hamburger menu for mobile"
```

---

### Task 11: Footer

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add footer styles**

Append to `css/style.css`:

```css
/* ===== Footer ===== */
.site-footer {
    background: #1a1510;
    border-top: 3px solid var(--wood-dark);
    padding: 1rem;
    text-align: center;
}

.site-footer p {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    color: rgba(232, 220, 200, 0.6);
}
```

- [ ] **Step 2: Verify and commit**

Reload. A dark footer bar with the copyright text should appear at the bottom.

```bash
git add css/style.css
git commit -m "feat: footer styling"
```

---

### Task 12: Final Polish & Verification

**Files:**
- Modify: `css/style.css` (minor tweaks if needed)

- [ ] **Step 1: Add ground/dirt effect at bottom of cave**

Append to `css/style.css`:

```css
/* ===== Ground dirt texture ===== */
.cave-scene::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background:
        radial-gradient(ellipse 30px 15px at 20% 80%, rgba(139, 105, 20, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse 40px 12px at 50% 90%, rgba(139, 105, 20, 0.2) 0%, transparent 70%),
        radial-gradient(ellipse 35px 10px at 80% 85%, rgba(139, 105, 20, 0.25) 0%, transparent 70%),
        linear-gradient(180deg, transparent 0%, rgba(92, 64, 51, 0.5) 60%, rgba(75, 50, 38, 0.8) 100%);
    pointer-events: none;
}
```

- [ ] **Step 2: Full verification checklist**

Open `index.html` in the browser and verify:

1. Header shows pickaxe icon, "OreNews" title, nav links
2. Cave background fills the viewport with dark earthy gradient and stalactites
3. Blue crystals glow on left and right sides
4. Wooden newsstand centered with "MINE NEWS & ISSUES" plaque
5. Top shelf: 4 magazines with unique covers (crystal, safety, shovel, cart themes)
6. Bottom shelf: 4 magazines with unique covers (gem, tunnel, lantern, dynamite themes)
7. CD rack: 4 CDs with different colored discs
8. Pixel miner character to the left, gently bobbing
9. All magazine links open in new tab
10. All CD links open in new tab
11. Magazine hover: lift + tilt + glow
12. CD hover: rotation
13. Resize to 375px: hamburger appears, miner hidden, 2 columns
14. Click hamburger: nav slides down, X animation on button
15. Footer shows copyright text

- [ ] **Step 3: Final commit**

```bash
git add css/style.css
git commit -m "feat: ground texture and final polish"
```

- [ ] **Step 4: Push to remote**

```bash
git push origin main
```

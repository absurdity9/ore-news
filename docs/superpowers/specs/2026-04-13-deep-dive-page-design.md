# Deep Dive Page — Design Spec

## Overview

A new `deep-dive.html` page presenting "The History of Ore (since its reintroduction)" as a vertical timeline. Content is sourced from a 16-page PDF with 18 embedded images. The page uses a left-rail timeline layout with a hybrid theme: dark cave background with clean, readable typography.

## Page Structure

- **File:** `deep-dive.html` in project root
- **CSS:** Added to existing `css/style.css`
- **Navigation:** Update nav links on both `index.html` and `deep-dive.html` so "Deep Dive" points to `deep-dive.html` and "Home" points to `index.html`
- **Assets:** 18 images already extracted to `images/deep-dive/`

## Layout

### Left-Rail Timeline

- ~60px wide rail on the left side
- Thin vertical line using `--crystal-blue` color
- Circular date markers (filled dots) at each section's vertical position
- Date label text beside each dot (e.g. "Oct 22, 2025")

### Content Panels (Right Side)

Each timeline section is a panel containing:
- Section heading: Press Start 2P font, small size (~14px)
- Body text: Inter font, ~16px, light color on dark background
- Images: natural aspect ratio, `max-width: 100%`, subtle border (`1px solid` muted color), `border-radius: 4px`
- Image captions: smaller italic text where applicable

### Table of Contents

- Positioned below the header, above the timeline
- Lists all 10 section titles as jump links
- Desktop: vertical compact list
- Mobile: horizontal scrollable row of chip-style links

## Sections

| # | Date | Title | Images |
|---|------|-------|--------|
| 1 | Oct 22, 2025 | The Re-introduction | img-01-p2 (5x5 grid) |
| 2 | Oct 2025 | The Motherlode | img-02-p3 (revenue chart) |
| 3 | Oct-Nov 2025 | Refining & Revenue | img-03-p4 (open-source extension post) |
| 4 | Nov 2025 | The Rise of Auto Miners | img-04-p5 (ecosystem map), img-05-p6 (wallet performance) |
| 5 | Nov 2025 | Analytics Power Miners Returns | img-06-p7 (production cost), img-07-p8, img-08-p8 (tx charts) |
| 6 | Nov 2025 | DeFi Integrations Begin | img-09-p10 (store of value), img-10-p10 (Humidifi), img-11-p10 (#1 revenue) |
| 7 | Dec 2025 | Open Source & Supply Reduction | img-12-p11 (Solscan), img-13-p11 (supply report) |
| 8 | Dec 2025 | Privacy & Encrypted Money | img-14-p12 (Privacy Cash pools) |
| 9 | Jan 2026 | TurboORE, stORE & Exponent | img-15-p13 (top privacy pool), img-16-p14 (Kamino fees) |
| 10 | Jan-Feb 2026 | Community Adds Fuel | img-17-p15 (WhenMarket), img-18-p16 (CompoundORE) |

## Content

All text from the PDF is included across the 10 sections. The "Other topics to potentially explore" list at the end of the PDF is omitted.

## Responsive Breakpoints

| Breakpoint | Rail | Content | TOC |
|------------|------|---------|-----|
| Desktop (>1023px) | Visible, 60px left rail with line + dots + date labels | Max-width ~800px, comfortable padding | Vertical list |
| Tablet (768-1023px) | Shrinks to thin accent line, date labels smaller | Fills available width | Vertical list, compact |
| Mobile (<768px) | Hidden entirely | Full width with padding | Horizontal scrollable chips |

On mobile, date labels appear as inline badges above each section heading instead of in the rail.

## Theme Details

- Background: same dark cave color as homepage
- Timeline rail/dots: `--crystal-blue`
- Section headings: Press Start 2P, small size, crystal blue or white
- Body text: Inter 400, ~16px, light gray (#cbd5e1 or similar)
- Links in body: crystal blue, underlined on hover
- Image borders: `1px solid rgba(255,255,255,0.1)`, `border-radius: 4px`
- Section panels: subtle background differentiation or transparent with bottom border separators
- Header/footer: identical to `index.html`

## What Is NOT Included

- No JavaScript interactivity beyond the existing hamburger menu
- No animation/scroll effects on the timeline
- No "future topics" section from the PDF
- No new fonts beyond what's already loaded

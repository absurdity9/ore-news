# Mobile Navigation Fix — Stacked Rows

**Issue:** [#7](https://github.com/absurdity9/ore-news/issues/7) — Navigation buttons are cut off on mobile

**Date:** 2026-04-28

## Problem

The `.ore-tally` banner uses a single-row horizontal flex layout containing brand, stats, and nav. On mobile viewports (<767px), the nav buttons overflow the container and are clipped by `overflow: hidden`. The "Home" button and search icon are not visible.

## Solution

Stack the banner into two rows on mobile using CSS `flex-wrap`. No JavaScript changes required.

### Layout

- **Row 1:** Brand (`.ore-tally-head`) + Stats (`.ore-tally-grid`)
- **Row 2:** Navigation (`.ore-tally-nav`) spanning full width

### CSS Changes (all within `@media (max-width: 767px)`)

**`.ore-tally`**
- Add `flex-wrap: wrap`
- Reduce horizontal padding from `2rem` to `1rem`

**`.ore-tally-head`**
- Remove `border-right` (stats flow beside it via flex gap)
- Remove `padding-right`

**`.ore-tally-grid`**
- `flex: 1` (already set) keeps stats filling remaining space on row 1

**`.ore-tally-nav`**
- `width: 100%` to force onto its own row
- Replace `border-left` / `padding-left` with `border-top` / `padding-top` using the same amber divider color `rgba(255, 210, 140, 0.18)`
- `justify-content: center` to distribute buttons evenly
- Nav buttons get `flex: 1` so they fill the row

**Nav button size reduction:**
- Font-size: `0.6rem` → `0.5rem`
- Padding: `0.75rem 1.15rem` → `0.5rem 0.6rem`

### Visual Continuity

- Top border on nav row uses the same `rgba(255, 210, 140, 0.18)` amber divider as existing vertical borders
- Retro pixel button aesthetic preserved — just reflowed into a second row
- All hover/active/active-state styles remain unchanged

### Affected Files

- `css/style.css` — add rules inside the existing `@media (max-width: 767px)` block

### No Changes To

- HTML structure (all pages)
- JavaScript (`app.js`)
- Desktop layout (unchanged above 767px)

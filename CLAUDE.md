# OreNews

Miner's news stand for ORE on Solana.

## Environment

Secrets are stored in `.env` (gitignored). See `.env.example` for the required variables:

- `SANITY_API_TOKEN` — Sanity CMS API token for the `w9x60sjf` project

## Local Development

Serve on port **3333** (CORS-approved in Sanity):

```bash
python3 -m http.server 3333
```

## Content Workflow

When adding new content (articles, podcasts, deep-dives, or any new page/entry):

1. **Ask the user** what the latest ORE circulating supply is before finishing the task.
2. **Update the circulating supply value** in the `ore-tally` navbar across **all** HTML pages. The value lives in the `<span class="ore-tally-stat-value">` inside the "Circulating" stat block. Files to update: `index.html`, `article.html`, `deep-dive.html`, `podcast.html`, `search.html`, `archives-magazines.html`, `archives-podcasts.html`, `template.html`, `example.html`.

## Newsstand (Mineshaft Weekly)

The magazine shelf on the homepage (latest 9) and the magazine archive (`archives-magazines.html`) are driven **directly by `article` documents** — there is no separate `magazine` document type. An article shows on the shelf when it has:

- `eyebrow` set to exactly **`The MineShaft Weekly`**, and
- a **Cover Image** (`cover` field — a ~2.5:1 landscape banner).

The shelf label and ordering are derived from `publishedAt` (via `formatWeek()` in `js/sanity.js`). To publish a new weekly issue, just create and publish the article with those two fields set — it appears on the newsstand automatically. Deep Dives use a different `eyebrow` and stay off the weekly shelf.

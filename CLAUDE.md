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

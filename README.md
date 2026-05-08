# OreNews

Miner's news stand for ORE on Solana — [orenews.supply](https://orenews.supply)

## Setup

Copy `.env.example` to `.env` and fill in the Sanity API token:

```bash
cp .env.example .env
```

The `.env` file is gitignored and contains:

```
SANITY_API_TOKEN=<your-sanity-api-token>
```

## Local Development

Port **3333** has CORS approval in the Sanity project settings. Always use this port for local development:

```bash
python3 -m http.server 3333
```

Then open [http://localhost:3333](http://localhost:3333).

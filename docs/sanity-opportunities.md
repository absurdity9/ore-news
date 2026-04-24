# Sanity CMS — What Else Can We Get Out of It?

| Feature | Description | Status | Effort |
|---------|-------------|--------|--------|
| **Already Available** | | | |
| Scheduled publishing | Write articles now, set a future publish date | Available | — |
| Revision history | Every edit is versioned, roll back any document | Available | — |
| GROQ playground | Vision plugin lets you query data live in the studio | Available | — |
| Image transformations | CDN resizes, crops, and optimizes images via URL params | Available | — |
| **Worth Adding** | | | |
| Search page | GROQ full-text search across articles and transcripts | Not started | Small |
| Webhooks | Trigger notifications or posts to Discord/Slack on publish | Not started | Small |
| Real-time preview | See draft changes on the live site before publishing | Not started | Medium |
| Studio customization | Custom dashboard with recent articles, content stats, publish checklist | Not started | Medium |
| **Down the Road** | | | |
| Collaboration | Multiple editors working simultaneously with real-time presence | Not started | — |
| Content lake API | Build on top of same content (newsletter generator, Telegram bot, RSS) | Not started | Medium |
| Sanity AI Assist | AI-powered writing assistance in the studio | Not started | Small |
| **Social Distribution** | | | |
| X/Twitter auto-post | Webhook on publish → auto-post article title + link via X API | Not started | Medium |
| Telegram/Discord bots | Webhook → push new articles to community channels | Not started | Small |
| RSS feed | Generate from a GROQ query for subscribers and aggregators | Not started | Small |
| **Newsletter** | | | |
| Newsletter (Resend/Mailchimp) | Webhook on publish → send article as email newsletter | Not started | Medium |
| **Analytics & SEO** | | | |
| Analytics & SEO | Track which articles get traffic (Google Search Console / Plausible) | Not started | Small |
| OG image generation | Auto-generate social preview images from article title + eyebrow | Not started | Medium |

## Already Available

- **Scheduled publishing** — write articles now, set a future publish date
- **Revision history** — every edit is versioned, roll back any document
- **GROQ playground** — Vision plugin lets you query data live in the studio
- **Image transformations** — CDN resizes, crops, and optimizes images on the fly via URL params (`?w=800&h=400&fit=crop`)

## Worth Adding

- **Real-time preview** — see draft changes on the live site before publishing (Sanity Presentation tool)
- **Search page** — GROQ full-text search across articles and transcripts
- **Webhooks** — trigger rebuilds, notifications, or posts to Discord/Slack when content is published
- **Studio customization** — custom dashboard with recent articles, content stats, or a publish checklist

## Down the Road

- **Collaboration** — multiple editors working simultaneously with real-time presence
- **Content lake API** — build on top of the same content (newsletter generator, Telegram bot, RSS feed)
- **Sanity AI Assist** — AI-powered writing assistance in the studio

## Platform Integrations

### Social Distribution
- **X/Twitter** — webhook on publish → auto-post article title + link via X API
- **Telegram/Discord bots** — webhook → push new articles to community channels
- **RSS feed** — generate from a GROQ query for subscribers and aggregators

### Newsletter
- **Resend / Mailchimp / Beehiiv** — webhook on publish → send article as email newsletter (portable text converts to email HTML cleanly)

### Analytics & SEO
- **Google Search Console / Plausible** — track which articles get traffic
- **OpenGraph image generation** — auto-generate social preview images from article title + eyebrow

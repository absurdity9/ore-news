# Sanity CMS — What Else Can We Get Out of It?

| Feature | Status | Effort |
|---------|--------|--------|
| Scheduled publishing | Available | — |
| Revision history | Available | — |
| GROQ playground | Available | — |
| Image transformations | Available | — |
| Search page | Not started | Small |
| Webhooks | Not started | Small |
| Real-time preview | Not started | Medium |
| Studio customization | Not started | Medium |
| Collaboration | Not started | — |
| Content lake API | Not started | Medium |
| Sanity AI Assist | Not started | Small |
| X/Twitter auto-post | Not started | Medium |
| Telegram/Discord bots | Not started | Small |
| RSS feed | Not started | Small |
| Newsletter (Resend/Mailchimp) | Not started | Medium |
| Analytics & SEO | Not started | Small |
| OG image generation | Not started | Medium |

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

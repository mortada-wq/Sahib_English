# Sahib English

English marketing site for Sahib (**esahib.com**) — Vite + React landing. **Launch App** points to the live product at **sahib.cc**.

Recovered from local Cursor session history and wired as a standalone repo (not the Arabic-first [`mortada-wq/sahib`](https://github.com/mortada-wq/sahib) monorepo).

## Run locally

```bash
cd "/Users/mortadagzar/Downloads/Sahib English"
npm install
npm run dev
```

Open http://localhost:5173/

## Git remote

```bash
git remote add origin https://github.com/SahibMortada/Sahib_English.git
git push -u origin main
```

## Stack

- Vite 6 + React 19 + TypeScript
- Plain CSS (dark theme, glass marketing landing)

## Waitlist API (Google Cloud Run)

The marketing form posts to a small Mailchimp proxy on Cloud Run (not from the browser with an API key).

1. Deploy the service — see [`cloud-run/waitlist-api/README.md`](cloud-run/waitlist-api/README.md).
2. Set frontend env and rebuild:

   ```bash
   # .env.local (not committed)
   VITE_WAITLIST_API_URL=https://YOUR-SERVICE.run.app/waitlist
   ```

3. `npm run build` / redeploy the static site so Vite picks up the variable.

`GET` on the same URL returns `{ count }` for the “Join the first 100” bar. Without the env var, the site uses the fallback count in `src/content/earlyBelievers.ts`.

**Mailchimp welcome email** is still configured in the Mailchimp UI (Automation on subscribe), not in this repo.

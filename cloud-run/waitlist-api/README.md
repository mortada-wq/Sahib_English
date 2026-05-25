# Sahib waitlist API (Cloud Run)

Small Express proxy: adds emails to a Mailchimp audience and exposes subscriber count for the marketing site.

## Endpoints

| Method | Path | Body | Response |
|--------|------|------|----------|
| `GET` | `/health` | — | `{ ok, mailchimp }` |
| `GET` | `/waitlist` | — | `{ count: number }` |
| `POST` | `/waitlist` | `{ "email": "..." }` | `{ ok: true }` or `{ message }` |

Set the Vite app to:

```bash
VITE_WAITLIST_API_URL=https://YOUR-SERVICE-XXXX.run.app/waitlist
```

## Environment variables

| Variable | Required | Example |
|----------|----------|---------|
| `MAILCHIMP_API_KEY` | yes | `xxxxxxxx-us21` |
| `MAILCHIMP_LIST_ID` | yes | audience ID from Mailchimp |
| `MAILCHIMP_SERVER` | yes | `us21` (from API key suffix) |
| `CORS_ORIGINS` | yes (prod) | `https://esahib.com,http://localhost:5173` |
| `MAILCHIMP_STATUS` | no | `subscribed` (default) or `pending` for double opt-in |
| `PORT` | no | Cloud Run sets `8080` |

Store secrets in **Secret Manager** or Cloud Run env vars — never in the frontend.

## Deploy to Cloud Run

Prerequisites: [gcloud CLI](https://cloud.google.com/sdk/docs/install), billing enabled, APIs enabled:

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

From this directory (`cloud-run/waitlist-api`):

```bash
export PROJECT_ID=your-gcp-project
export REGION=us-central1
export SERVICE=sahib-waitlist-api

gcloud config set project "$PROJECT_ID"

# Build and deploy (source-based)
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars "MAILCHIMP_SERVER=us21,MAILCHIMP_LIST_ID=YOUR_LIST_ID,CORS_ORIGINS=https://esahib.com,http://localhost:5173" \
  --set-secrets "MAILCHIMP_API_KEY=mailchimp-api-key:latest"
```

Create the secret once:

```bash
echo -n "your-mailchimp-api-key" | gcloud secrets create mailchimp-api-key --data-file=-
```

Grant the Cloud Run service account access to the secret (Cloud Run does this automatically when using `--set-secrets` on deploy in many setups; if deploy fails, add Secret Manager Accessor to the runtime SA).

After deploy, copy the service URL:

```bash
gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)'
```

Use `https://THAT-URL/waitlist` as `VITE_WAITLIST_API_URL`, rebuild the static site, and redeploy the frontend.

## Local dev

```bash
cd cloud-run/waitlist-api
npm install
export MAILCHIMP_API_KEY=...
export MAILCHIMP_LIST_ID=...
export MAILCHIMP_SERVER=us21
export CORS_ORIGINS=http://localhost:5173
npm run dev
```

```bash
curl http://localhost:8080/health
curl -X POST http://localhost:8080/waitlist -H 'Content-Type: application/json' -d '{"email":"test@example.com"}'
curl http://localhost:8080/waitlist
```

## Mailchimp welcome email

This service only writes to the audience. Configure the **welcome automation** in Mailchimp (Audience → Automations) separately; see the main repo README / plan for branded HTML.

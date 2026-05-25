import cors from 'cors'
import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 8080

const mailchimpKey = process.env.MAILCHIMP_API_KEY
const mailchimpListId = process.env.MAILCHIMP_LIST_ID
const mailchimpServer = process.env.MAILCHIMP_SERVER
const corsOrigins = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(express.json())

app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
  }),
)

function mailchimpConfigured() {
  return Boolean(mailchimpKey && mailchimpListId && mailchimpServer)
}

function mailchimpBase() {
  return `https://${mailchimpServer}.api.mailchimp.com/3.0`
}

function mailchimpAuthHeader() {
  const token = Buffer.from(`anystring:${mailchimpKey}`).toString('base64')
  return { Authorization: `Basic ${token}` }
}

async function mailchimpFetch(path, init = {}) {
  const res = await fetch(`${mailchimpBase()}${path}`, {
    ...init,
    headers: {
      ...mailchimpAuthHeader(),
      ...(init.headers ?? {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  return { res, data }
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, mailchimp: mailchimpConfigured() })
})

app.get('/waitlist', async (_req, res) => {
  if (!mailchimpConfigured()) {
    res.status(500).json({ message: 'Waitlist API is not configured.' })
    return
  }

  const { res: mcRes, data } = await mailchimpFetch(`/lists/${mailchimpListId}`)
  if (!mcRes.ok) {
    res.status(500).json({ message: 'Could not load subscriber count.' })
    return
  }

  res.json({ count: data.stats?.member_count ?? 0 })
})

app.post('/waitlist', async (req, res) => {
  if (!mailchimpConfigured()) {
    res.status(500).json({ message: 'Waitlist API is not configured.' })
    return
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ message: 'Valid email required.' })
    return
  }

  const status = process.env.MAILCHIMP_STATUS === 'pending' ? 'pending' : 'subscribed'

  const { res: mcRes, data } = await mailchimpFetch(`/lists/${mailchimpListId}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: email, status }),
  })

  if (mcRes.status === 400 && data.title === 'Member Exists') {
    res.json({ ok: true })
    return
  }

  if (!mcRes.ok) {
    res.status(400).json({
      message: data.detail ?? data.title ?? 'Could not subscribe.',
    })
    return
  }

  res.json({ ok: true })
})

app.listen(port, () => {
  console.log(`waitlist-api listening on ${port}`)
})

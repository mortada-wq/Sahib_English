import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'
import { ChatTeaser } from './components/ChatTeaser'
import { ClosingStatement } from './components/ClosingStatement'
import { EarlyBelievers } from './components/EarlyBelievers'
import { WaitlistForm } from './components/WaitlistForm'
import { contactEmail, marketingSiteUrl } from './content/site'
import { useEarlyAccessCount } from './hooks/useEarlyAccessCount'

type PageId = 'gateway' | 'thesis' | 'moat' | 'traction' | 'war-room'
type AudienceTab = 'investor' | 'reviewer'

const PAGE_ITEMS: ReadonlyArray<{ id: PageId; label: string }> = [
  { id: 'gateway', label: 'Gateway' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'moat', label: 'Moat' },
  { id: 'traction', label: 'Traction' },
  { id: 'war-room', label: 'War Room' },
]

const WAITLIST_VELOCITY = [
  { label: 'Week 1', value: 8 },
  { label: 'Week 2', value: 13 },
  { label: 'Week 3', value: 20 },
  { label: 'Week 4', value: 27 },
] as const

const MILESTONES = [
  'Prototype tested with first Baghdad cohort',
  'Dialect correction loop shipped to production',
  'Round opened to the founding circle',
  'Reviewer access lane now active',
] as const

function parsePage(hash: string): PageId | null {
  const clean = hash.replace(/^#/, '')
  if (PAGE_ITEMS.some((item) => item.id === clean)) {
    return clean as PageId
  }
  return null
}

function buildMailto(
  subject: string,
  lines: Array<[string, FormDataEntryValue]>,
): string {
  const body = lines
    .filter(([, value]) => value.toString().trim().length > 0)
    .map(([key, value]) => `${key}: ${value.toString().trim()}`)
    .join('\n')
  const query = new URLSearchParams({
    subject,
    body,
  })
  return `mailto:${contactEmail}?${query.toString()}`
}

export default function App() {
  const [page, setPage] = useState<PageId>(() => parsePage(window.location.hash) ?? 'gateway')
  const [audience, setAudience] = useState<AudienceTab>('investor')
  const [sliderValue, setSliderValue] = useState(56)
  const [taught, setTaught] = useState(false)
  const [isPlayingMaqam, setIsPlayingMaqam] = useState(false)
  const earlyAccessCount = useEarlyAccessCount()

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parsePage(window.location.hash)
      if (parsed) {
        setPage(parsed)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const nextHash = `#${page}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash)
    }
  }, [page])

  const maxVelocity = useMemo(
    () => Math.max(...WAITLIST_VELOCITY.map((item) => item.value)),
    [],
  )

  function jumpTo(target: PageId) {
    setPage(target)
    if (target !== 'gateway') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleWarRoomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const lines = Array.from(formData.entries()) as Array<[string, FormDataEntryValue]>
    const subject =
      audience === 'investor'
        ? 'Sahib founding circle introduction request'
        : 'Sahib reviewer early access request'

    window.location.href = buildMailto(subject, lines)
  }

  function playMaqamSnippet() {
    if (isPlayingMaqam) return
    setIsPlayingMaqam(true)

    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextCtor) {
      setIsPlayingMaqam(false)
      return
    }

    const context = new AudioContextCtor()
    const gainNode = context.createGain()
    gainNode.gain.value = 0.055
    gainNode.connect(context.destination)

    const sequence = [293.66, 320, 349.23, 392, 427]
    const start = context.currentTime

    sequence.forEach((frequency, index) => {
      const osc = context.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(frequency, start + index * 0.42)
      osc.connect(gainNode)
      osc.start(start + index * 0.42)
      osc.stop(start + index * 0.42 + 0.36)
    })

    window.setTimeout(() => {
      context.close().catch(() => {})
      setIsPlayingMaqam(false)
    }, 2300)
  }

  return (
    <div
      className={`landing investor-layout${page === 'gateway' ? ' is-gateway-viewport' : ''}`}
      dir="ltr"
      lang="en"
    >
      <aside className="page-sidebar glass" aria-label="Page navigation">
        <button
          type="button"
          className="sidebar-master"
          onClick={() => jumpTo('gateway')}
          aria-label="Go to gateway page"
        >
          <img src="/logo-mark.svg" alt="" width={44} height={44} />
        </button>
        <p className="sidebar-mission">
          The Arab world has been waiting for this.
        </p>

        <nav className="page-nav" aria-label="Marketing pages">
          {PAGE_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`page-nav-item${page === item.id ? ' is-active' : ''}`}
              onClick={() => jumpTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-actions">
          <a
            className="sidebar-action-link"
            href={`mailto:${contactEmail}?subject=Request%20Access%20to%20Sahib`}
          >
            Request Access
          </a>
          <a
            className="sidebar-action-link is-ghost"
            href={`mailto:${contactEmail}?subject=Founding%20Circle%20Intro`}
          >
            The Round Is Open
          </a>
        </div>
      </aside>

      <div className="page-content">
        <main className="page-stage">
          {page === 'gateway' ? (
            <section className="page-panel gateway-panel">
              <div className="gateway-screen">
                <div className="gateway-column gateway-column-left">
                  <header className="gateway-hero">
                    <img
                      src="/logo-hero.svg"
                      alt="Sahib"
                      className="gateway-logo"
                      width={158}
                      height={83}
                    />
                    <h1 className="gateway-tagline">
                      The Arab world has been waiting for this.
                    </h1>
                    <p className="gateway-tagline-ar" dir="rtl" lang="ar">
                      العالم العربي ينتظر هذا.
                    </p>
                    <p className="gateway-subline">
                      Iraqi-first AI that learns from people, protects dialect,
                      and proves intelligence through cultural accuracy.
                    </p>

                    <div className="hero-cta-row">
                      <a
                        href={`mailto:${contactEmail}?subject=Request%20Access%20to%20Sahib`}
                        className="hero-cta glass"
                      >
                        Request Access
                      </a>
                      <button
                        type="button"
                        className="hero-cta glass"
                        onClick={() => jumpTo('war-room')}
                      >
                        The Round Is Open
                      </button>
                    </div>
                  </header>

                  <div className="gateway-meta-row">
                    <article className="gateway-counter gateway-counter--inline glass">
                      <h2>Join the first 100</h2>
                      <p className="counter-number">{earlyAccessCount}/100</p>
                    </article>
                    <section
                      className="gateway-waitlist gateway-waitlist--compact"
                      aria-label="Early access waitlist"
                    >
                      <WaitlistForm />
                    </section>
                  </div>
                </div>

                <div className="gateway-column gateway-column-right">
                  <ChatTeaser />
                </div>
              </div>
            </section>
          ) : null}

          {page === 'thesis' ? (
            <section className="page-panel">
              <header className="page-heading">
                <p className="page-kicker">Market and Problem</p>
                <h1>The Thesis</h1>
                <p>
                  Generic AI is trained for formal language and broad averages.
                  Sahib is built for everyday Iraqi speech, context, and
                  identity.
                </p>
              </header>

              <section className="thesis-grid">
                <article className="data-gap-card glass">
                  <h2>The Data Gap</h2>
                  <div className="data-gap-row">
                    <span>Modern Standard Arabic coverage</span>
                    <strong>84%</strong>
                  </div>
                  <div className="data-gap-row">
                    <span>Iraqi colloquial coverage</span>
                    <strong>9%</strong>
                  </div>
                  <div className="data-gap-row">
                    <span>Culturally grounded Iraqi imagery</span>
                    <strong>7%</strong>
                  </div>
                </article>

                <article className="thesis-stat-card glass">
                  <h2>Opportunity</h2>
                  <p className="thesis-stat">40M+</p>
                  <p>
                    Iraqis plus diaspora audiences underserved by
                    non-localized assistants.
                  </p>
                </article>

                <article className="thesis-quote glass">
                  <p>
                    “Sahib treats language like heritage infrastructure, not
                    just UI text.”
                  </p>
                  <span>Early cultural advisor · Baghdad</span>
                </article>
              </section>
            </section>
          ) : null}

          {page === 'moat' ? (
            <section className="page-panel">
              <header className="page-heading">
                <p className="page-kicker">Technical Defensibility</p>
                <h1>Deep Tech Moat</h1>
                <p>
                  Sahib combines local data loops, authentic visuals, and
                  micro-tonal audio intelligence into one learning engine.
                </p>
              </header>

              <section className="moat-grid">
                <article className="moat-card glass">
                  <h2>Visual Authenticity</h2>
                  <p>Slide to compare generic outputs against Sahib quality.</p>
                  <div className="image-compare">
                    <div className="compare-layer compare-generic">
                      Generic AI: stereotyped framing
                    </div>
                    <div
                      className="compare-layer compare-sahib"
                      style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                    >
                      Sahib AI: community-vetted Iraqi realism
                    </div>
                    <input
                      className="compare-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={sliderValue}
                      onChange={(event) => setSliderValue(Number(event.target.value))}
                      aria-label="Compare AI image authenticity"
                    />
                  </div>
                </article>

                <article className="moat-card glass">
                  <h2>Teach Sahib</h2>
                  <p className="teach-phrases">
                    MSA: <span>كيف حالك اليوم؟</span>
                  </p>
                  <p className="teach-phrases">
                    Iraqi: <span>شلونك اليوم؟</span>
                  </p>
                  <button
                    type="button"
                    className={`teach-btn${taught ? ' is-done' : ''}`}
                    onClick={() => setTaught(true)}
                    disabled={taught}
                  >
                    {taught ? 'Correction added to dialect model' : 'Submit Correction'}
                  </button>
                </article>

                <article className="moat-card glass">
                  <h2>Maqam Engine Preview</h2>
                  <p>
                    A short micro-tonal phrase demonstrates the tonal range
                    standard Western models miss.
                  </p>
                  <button
                    type="button"
                    className="maqam-btn"
                    onClick={playMaqamSnippet}
                    disabled={isPlayingMaqam}
                  >
                    {isPlayingMaqam ? 'Playing…' : 'Play 3-second sample'}
                  </button>
                </article>
              </section>

              <section className="moat-table-wrap glass">
                <h2>Moat Snapshot</h2>
                <table className="moat-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Standard AI</th>
                      <th>Sahib</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dialect</td>
                      <td>Modern Standard bias</td>
                      <td>Iraqi colloquial from day one</td>
                    </tr>
                    <tr>
                      <td>Imagery</td>
                      <td>Stereotyped outputs</td>
                      <td>Community-vetted Iraqi representation</td>
                    </tr>
                    <tr>
                      <td>Music</td>
                      <td>Western scales</td>
                      <td>Maqam and Iraqi pronunciation tuning</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </section>
          ) : null}

          {page === 'traction' ? (
            <section className="page-panel">
              <header className="page-heading">
                <p className="page-kicker">Proof and Momentum</p>
                <h1>Traction &amp; Social Proof</h1>
                <p>
                  Pull is visible in waitlist growth, qualitative feedback, and
                  repeat engagement from local communities.
                </p>
              </header>

              <EarlyBelievers />

              <section className="traction-grid">
                <article className="traction-card glass">
                  <h2>Waitlist Velocity</h2>
                  <ul className="velocity-list">
                    {WAITLIST_VELOCITY.map((point) => (
                      <li key={point.label}>
                        <span>{point.label}</span>
                        <div>
                          <em style={{ width: `${(point.value / maxVelocity) * 100}%` }} />
                        </div>
                        <strong>{point.value}</strong>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="traction-card glass">
                  <h2>Milestones</h2>
                  <ol>
                    {MILESTONES.map((milestone) => (
                      <li key={milestone}>{milestone}</li>
                    ))}
                  </ol>
                </article>

                <article className="traction-card glass">
                  <h2>Press &amp; Reviewer Resources</h2>
                  <p>
                    Download brand assets, founder bios, and the Sahib story
                    one-pager.
                  </p>
                  <a
                    href={`mailto:${contactEmail}?subject=Media%20Kit%20Request`}
                    className="media-kit-link"
                  >
                    Request media kit
                  </a>
                </article>
              </section>
            </section>
          ) : null}

          {page === 'war-room' ? (
            <section className="page-panel">
              <header className="page-heading">
                <p className="page-kicker">Conversion and Capital</p>
                <h1>War Room</h1>
                <p>
                  Distinct paths for investors and reviewers keep the process
                  focused while preserving a premium, selective tone.
                </p>
              </header>

              <div className="war-room-tabs glass" role="tablist" aria-label="Audience">
                <button
                  type="button"
                  role="tab"
                  aria-selected={audience === 'investor'}
                  className={audience === 'investor' ? 'is-active' : ''}
                  onClick={() => setAudience('investor')}
                >
                  I am an Investor
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={audience === 'reviewer'}
                  className={audience === 'reviewer' ? 'is-active' : ''}
                  onClick={() => setAudience('reviewer')}
                >
                  I am a Reviewer
                </button>
              </div>

              <form className="war-room-form glass" onSubmit={handleWarRoomSubmit}>
                {audience === 'investor' ? (
                  <>
                    <label>
                      Full Name
                      <input type="text" name="Full Name" required />
                    </label>
                    <label>
                      Fund / Firm
                      <input type="text" name="Fund or Firm" required />
                    </label>
                    <label>
                      Investment Thesis Fit
                      <textarea
                        name="Investment Thesis Fit"
                        rows={4}
                        placeholder="Tell us why Sahib aligns with your thesis."
                        required
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <label>
                      Full Name
                      <input type="text" name="Full Name" required />
                    </label>
                    <label>
                      Publication / Channel
                      <input type="text" name="Publication or Channel" required />
                    </label>
                    <label>
                      Primary Interest
                      <select name="Primary Interest" defaultValue="Technology">
                        <option>Technology</option>
                        <option>Culture</option>
                        <option>Language</option>
                      </select>
                    </label>
                  </>
                )}

                <label>
                  Contact Email
                  <input type="email" name="Contact Email" required />
                </label>

                <button type="submit" className="war-room-submit">
                  {audience === 'investor'
                    ? 'Request an Introduction'
                    : 'Get Early Access'}
                </button>
              </form>

              <ClosingStatement />
            </section>
          ) : null}
        </main>

        <footer className="site-footer container">
          <div>
            © 2026 Sahib ·{' '}
            <a href={marketingSiteUrl} target="_blank" rel="noopener noreferrer">
              esahib.com
            </a>
          </div>
          <div>
            Contact: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

import './App.css'
import { appUrl, contactEmail, marketingSiteUrl } from './content/site'
import { ChatTeaser } from './components/ChatTeaser'
import { ClosingStatement } from './components/ClosingStatement'
import { EarlyBelievers } from './components/EarlyBelievers'
import { RoundSection } from './components/RoundSection'
import { WaitlistForm } from './components/WaitlistForm'

export default function App() {
  return (
    <div className="landing" dir="ltr" lang="en">
      <header className="site-header">
        <a href="/" className="header-logo" aria-label="Sahib home">
          <img src="/logo-mark.svg" alt="" width={40} height={40} />
        </a>
        <a
          className="btn-launch glass"
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Launch App
        </a>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-left">
            <div className="hero-brand">
              <img
                src="/logo-hero.svg"
                alt="Sahib"
                className="hero-logo"
                width={287}
                height={150}
              />
              <h1 className="hero-tagline">
                The Intelligent Companion for the Arabic World.
              </h1>
            </div>
            <p className="hero-subhead">
              Bridge the gap between heritage and high-tech with the first AI
              designed for the Iraqi context.
            </p>
            <WaitlistForm />
          </div>
          <ChatTeaser />
        </section>

        <section className="section-features container">
          <h2 className="section-title">
            Built for dialects. Designed for everyone.
          </h2>
          <div className="features-grid">
            <div className="feature-card glass">
              <h3>AI Dialect Chat</h3>
              <p>
                Understands Iraqi Arabic and local expressions — not just formal
                فصحى.
              </p>
            </div>
            <div className="feature-card glass">
              <h3>قل ولا تقل</h3>
              <p>
                Daily dialect correction. Sahib learns authentic usage and helps
                you speak naturally.
              </p>
            </div>
            <div className="feature-card glass">
              <h3>Micro-localization</h3>
              <p>
                From Baghdad to Basra, the AI adapts to regional vocabulary and
                pronunciation.
              </p>
            </div>
            <div className="feature-card glass">
              <h3>Accessibility First</h3>
              <p>
                Voice commands and vision-assisted interface — designed for
                independence.
              </p>
            </div>
          </div>
        </section>

        <EarlyBelievers />
        <RoundSection />
      </main>

      <ClosingStatement />

      <footer className="site-footer container">
        <div>
          © 2026 Sahib ·{' '}
          <a href={marketingSiteUrl} target="_blank" rel="noopener noreferrer">
            esahib.com
          </a>
        </div>
        <div>
          Contact:{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </footer>
    </div>
  )
}

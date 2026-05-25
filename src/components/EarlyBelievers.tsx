import type { CSSProperties } from 'react'
import {
  earlyBelieverQuotes,
  earlyBelieversGoal,
  earlyBelieversMode,
} from '../content/earlyBelievers'
import { useEarlyAccessCount } from '../hooks/useEarlyAccessCount'

export function EarlyBelievers() {
  const earlyBelieversCurrentCount = useEarlyAccessCount()

  if (earlyBelieversMode === 'quotes') {
    return (
      <section className="section-believers container">
        <h2 className="section-title">Early Believers</h2>
        <div className="believers-grid">
          {earlyBelieverQuotes.map((person) => (
            <article key={person.name} className="believer-card glass">
              <div
                className="believer-avatar"
                style={
                  {
                    '--avatar-hue': person.hue,
                  } as CSSProperties
                }
                aria-hidden
              >
                {person.initial}
              </div>
              <blockquote className="believer-quote">{person.quote}</blockquote>
              <footer className="believer-meta">
                <span className="believer-name">{person.name}</span>
                <span className="believer-city">{person.city}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>
    )
  }

  const pct = Math.min(
    100,
    Math.round((earlyBelieversCurrentCount / earlyBelieversGoal) * 100),
  )

  return (
    <section className="section-believers container">
      <h2 className="section-title">Join the first 100</h2>
      <p className="believers-counter-lead">
        Early access is filling from testers, diaspora founders, and families
        who asked for Sahib first.
      </p>
      <div className="believers-counter glass">
        <div className="believers-counter-head">
          <span className="believers-counter-value">
            {earlyBelieversCurrentCount}
          </span>
          <span className="believers-counter-goal">
            / {earlyBelieversGoal} spots
          </span>
        </div>
        <div
          className="believers-progress"
          role="progressbar"
          aria-valuenow={earlyBelieversCurrentCount}
          aria-valuemin={0}
          aria-valuemax={earlyBelieversGoal}
          aria-label="Early access signups"
        >
          <div
            className="believers-progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="believers-counter-note">
          {earlyBelieversGoal - earlyBelieversCurrentCount} places left in the
          founding cohort.
        </p>
      </div>
    </section>
  )
}

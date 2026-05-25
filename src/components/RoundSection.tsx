import { fundCopy } from '../content/fund'

export function RoundSection() {
  return (
    <section className="section-round container">
      <div className="round-card glass">
        <h2>{fundCopy.title}</h2>
        <p className="round-subline">{fundCopy.subline}</p>
        <p className="round-body">{fundCopy.body}</p>
        <p className="round-scarcity">{fundCopy.scarcity}</p>
        <a href={`mailto:${fundCopy.email}`} className="contact-email">
          {fundCopy.email}
        </a>
      </div>
    </section>
  )
}

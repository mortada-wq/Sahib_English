import { useRef } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'

export function ClosingStatement() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInViewOnce(ref, { threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={`section-closing${inView ? ' is-in-view' : ''}`}
      aria-label="Closing statement"
    >
      <img
        src="/logo-mark.svg"
        alt=""
        className="closing-logo"
        width={68}
        height={67}
      />
      <p className="closing-line-en">
        The Arabic world has been waiting for this.
      </p>
      <p className="closing-line-ar" dir="rtl" lang="ar">
        العالم العربي ينتظر هذا.
      </p>
    </section>
  )
}

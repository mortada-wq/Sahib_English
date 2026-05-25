import { useEffect, useState, type FormEvent } from 'react'
import { subscribeWaitlist } from '../lib/waitlist'

type WaitlistState = 'idle' | 'submitting' | 'confirmed' | 'error'

const CONFIRM_HOLD_MS = 3000

export function WaitlistForm() {
  const [state, setState] = useState<WaitlistState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [showFollowUp, setShowFollowUp] = useState(false)

  useEffect(() => {
    if (state !== 'confirmed') return
    const t = window.setTimeout(() => setShowFollowUp(true), CONFIRM_HOLD_MS)
    return () => window.clearTimeout(t)
  }, [state])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'submitting' || state === 'confirmed') return

    const form = e.currentTarget
    const email = new FormData(form).get('email')
    if (typeof email !== 'string' || !email.trim()) return

    setState('submitting')
    setErrorMessage('')

    const result = await subscribeWaitlist(email.trim())
    if (!result.ok) {
      setState('error')
      setErrorMessage(result.message)
      return
    }

    setState('confirmed')
  }

  const isConfirmed = state === 'confirmed'
  const isSubmitting = state === 'submitting'

  return (
    <form
      className={`waitlist-shell glass waitlist-shell--${state}`}
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <div
        className={`waitlist-fields${isConfirmed ? ' is-hidden' : ''}`}
        aria-hidden={isConfirmed}
      >
        <input
          type="email"
          name="email"
          className="waitlist-input"
          placeholder="Enter your email for early access…"
          required
          disabled={isSubmitting || isConfirmed}
          dir="ltr"
          aria-label="Email for early access"
        />
        <button
          type="submit"
          className="waitlist-submit"
          disabled={isSubmitting || isConfirmed}
          aria-label="Submit email"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={`waitlist-confirm${isConfirmed ? ' is-visible' : ''}`}
        aria-hidden={!isConfirmed}
      >
        <img
          src="/sahib-logo.svg"
          alt=""
          className="waitlist-confirm-logo"
          width={48}
          height={48}
        />
        <p className="waitlist-confirm-ar" dir="rtl" lang="ar">
          صاحب ينتظرك
        </p>
        {showFollowUp ? (
          <p className="waitlist-confirm-en">You&apos;re on the early access list.</p>
        ) : null}
      </div>

      {state === 'error' ? (
        <p className="waitlist-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  )
}

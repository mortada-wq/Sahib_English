import { useRef } from 'react'
import { CHAT_USER_MESSAGE } from '../content/chatTeaser'
import { useChatTeaserSequence } from '../hooks/useChatTeaserSequence'
import { useInViewOnce } from '../hooks/useInViewOnce'

export function ChatTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInViewOnce(ref)
  const {
    phase,
    typedText,
    showUser,
    showSkeletonBar1,
    showSkeletonBar2,
    showSkeletonBar3,
    showCursorRow,
    showReply,
    showTypingCursor,
  } = useChatTeaserSequence(inView)

  return (
    <div
      ref={ref}
      className="chat-teaser glass"
      data-phase={phase}
      dir="rtl"
      lang="ar"
      aria-label="Iraqi Arabic chat preview"
      aria-live="polite"
    >
      <div
        className={`chat-bubble-user${showUser ? ' is-visible' : ''}`}
      >
        {CHAT_USER_MESSAGE}
      </div>

      <div className="chat-assistant-area">
        {showReply ? (
          <p className="chat-bubble-assistant">
            {typedText}
            {showTypingCursor ? (
              <span className="sahib-stream-cursor" aria-hidden />
            ) : null}
          </p>
        ) : null}

        {showSkeletonBar1 ? (
          <div className="sahib-skeleton-bar w-80" aria-hidden />
        ) : null}
        {showSkeletonBar2 ? (
          <div className="sahib-skeleton-bar w-60" aria-hidden />
        ) : null}
        {showSkeletonBar3 ? (
          <div className="sahib-skeleton-bar w-40" aria-hidden />
        ) : null}
        {showCursorRow ? (
          <div className="cursor-row" aria-hidden>
            <div className="sahib-skeleton-bar w-30" />
            <span className="sahib-stream-cursor" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

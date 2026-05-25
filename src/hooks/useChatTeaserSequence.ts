import { useEffect, useRef, useState } from 'react'
import { CHAT_ASSISTANT_REPLY } from '../content/chatTeaser'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type ChatPhase =
  | 'idle'
  | 'user'
  | 'bar1'
  | 'bar2'
  | 'bar3'
  | 'cursor'
  | 'typing'
  | 'done'

const TYPE_MS = 36
const CURSOR_MS = 1500

export function useChatTeaserSequence(inView: boolean) {
  const reducedMotion = usePrefersReducedMotion()
  const [phase, setPhase] = useState<ChatPhase>('idle')
  const [typedText, setTypedText] = useState('')
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    if (reducedMotion) {
      setPhase('done')
      setTypedText(CHAT_ASSISTANT_REPLY)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms))
    }

    schedule(() => setPhase('user'), 0)
    schedule(() => setPhase('bar1'), 320)
    schedule(() => setPhase('bar2'), 520)
    schedule(() => setPhase('bar3'), 720)
    schedule(() => setPhase('cursor'), 920)
    schedule(() => {
      setPhase('typing')
      setTypedText('')
    }, 920 + CURSOR_MS)

    return () => timers.forEach(clearTimeout)
  }, [inView, reducedMotion])

  useEffect(() => {
    if (phase !== 'typing') return

    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTypedText(CHAT_ASSISTANT_REPLY.slice(0, i))
      if (i >= CHAT_ASSISTANT_REPLY.length) {
        window.clearInterval(id)
        setPhase('done')
      }
    }, TYPE_MS)

    return () => window.clearInterval(id)
  }, [phase])

  const showUser =
    phase !== 'idle' &&
    (reducedMotion || ['user', 'bar1', 'bar2', 'bar3', 'cursor', 'typing', 'done'].includes(phase))

  const showSkeleton =
    !reducedMotion &&
    ['bar1', 'bar2', 'bar3', 'cursor'].includes(phase)

  const showSkeletonBar1 =
    showSkeleton && ['bar1', 'bar2', 'bar3', 'cursor'].includes(phase)
  const showSkeletonBar2 =
    showSkeleton && ['bar2', 'bar3', 'cursor'].includes(phase)
  const showSkeletonBar3 =
    showSkeleton && ['bar3', 'cursor'].includes(phase)
  const showCursorRow = showSkeleton

  const showReply = phase === 'typing' || phase === 'done'

  return {
    phase,
    typedText,
    showUser,
    showSkeletonBar1,
    showSkeletonBar2,
    showSkeletonBar3,
    showCursorRow,
    showReply,
    showTypingCursor: phase === 'typing',
  }
}

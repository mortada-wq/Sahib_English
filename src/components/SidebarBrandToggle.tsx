import { useCallback, useRef } from 'react'

type Props = {
  expanded: boolean
  onToggle: () => void
}

export default function SidebarBrandToggle({ expanded, onToggle }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const rotationRef = useRef(0)

  const handleClick = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return

    btn.style.setProperty('--spin-from', `${rotationRef.current}deg`)
    btn.classList.remove('is-spinning')
    void btn.offsetWidth
    btn.classList.add('is-spinning')

    onToggle()
  }, [onToggle])

  const handleAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLSpanElement>) => {
      if (event.animationName !== 'brand-gravity-spin') return

      rotationRef.current += 360
      const btn = btnRef.current
      if (btn) {
        btn.style.setProperty('--spin-from', `${rotationRef.current}deg`)
        btn.classList.remove('is-spinning')
      }

    },
    [],
  )

  return (
    <button
      ref={btnRef}
      type="button"
      className="sidebar-brand-btn"
      onClick={handleClick}
      aria-expanded={expanded}
      aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <span className="sidebar-brand-spin" onAnimationEnd={handleAnimationEnd}>
        <img
          src="/logo-mark.svg"
          alt=""
          className="sidebar-brand-icon"
          width={40}
          height={40}
          draggable={false}
        />
      </span>
    </button>
  )
}

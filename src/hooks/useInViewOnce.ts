import { useEffect, useState, type RefObject } from 'react'

export function useInViewOnce(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit,
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, inView])

  return inView
}

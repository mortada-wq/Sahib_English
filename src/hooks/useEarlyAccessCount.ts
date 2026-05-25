import { useEffect, useState } from 'react'
import { earlyBelieversCurrentCount } from '../content/earlyBelievers'
import { fetchEarlyAccessCount } from '../lib/earlyAccessCount'

export function useEarlyAccessCount() {
  const [count, setCount] = useState(earlyBelieversCurrentCount)

  useEffect(() => {
    let cancelled = false
    fetchEarlyAccessCount().then((n) => {
      if (!cancelled) setCount(n)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return count
}

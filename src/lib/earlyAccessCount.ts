import { earlyBelieversCurrentCount } from '../content/earlyBelievers'

export async function fetchEarlyAccessCount(): Promise<number> {
  const base = import.meta.env.VITE_WAITLIST_API_URL as string | undefined
  if (!base) return earlyBelieversCurrentCount

  try {
    const res = await fetch(base, { method: 'GET' })
    if (!res.ok) return earlyBelieversCurrentCount
    const data = (await res.json()) as { count?: number }
    if (typeof data.count === 'number' && data.count >= 0) return data.count
  } catch {
    /* use fallback */
  }

  return earlyBelieversCurrentCount
}

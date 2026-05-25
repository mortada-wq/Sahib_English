export type WaitlistResult = { ok: true } | { ok: false; message: string }

export async function subscribeWaitlist(email: string): Promise<WaitlistResult> {
  const endpoint = import.meta.env.VITE_WAITLIST_API_URL as string | undefined

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          message?: string
        } | null
        return {
          ok: false,
          message: data?.message ?? 'Something went wrong. Please try again.',
        }
      }
      return { ok: true }
    } catch {
      return { ok: false, message: 'Network error. Please try again.' }
    }
  }

  await new Promise((r) => setTimeout(r, 400))
  return { ok: true }
}

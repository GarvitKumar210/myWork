import { useEffect, useState } from 'react'

/**
 * Optional first-paint delay for static mini-sites (Landing, etc.).
 * Uses a short delay and session memory so revisiting the same site
 * in one session does not flash the skeleton again.
 */
export function useContentLoad(delayMs = 350, sessionKey = 'default') {
  const storageKey = `mini-loaded:${sessionKey}`

  const [ready, setReady] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (ready) return undefined

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, '1')
      } catch {
        /* ignore */
      }
      setReady(true)
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })
    }, delayMs)

    return () => window.clearTimeout(id)
  }, [ready, delayMs, storageKey])

  return ready
}

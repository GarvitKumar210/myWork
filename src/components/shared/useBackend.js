import { useEffect, useState } from 'react'
import {
  fetchBackend,
  fetchBackendMany,
  peekBackend,
  peekBackendMany,
} from './fetchBackend'

/**
 * Fetch one backend JSON file with cache-aware initial state
 * so SPA route changes do not blank the UI if data was already loaded.
 */
export function useBackend(site, file) {
  const [data, setData] = useState(() => peekBackend(site, file))
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(() => peekBackend(site, file) == null)

  useEffect(() => {
    let cancelled = false
    const cached = peekBackend(site, file)
    if (cached) {
      setData(cached)
      setLoading(false)
      setError(null)
      return undefined
    }

    setLoading(true)
    fetchBackend(site, file)
      .then((d) => {
        if (!cancelled) {
          setData(d)
          setError(null)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [site, file])

  return { data, error, loading }
}

/** Fetch several files; returns { fileName: data } object. */
export function useBackendMany(site, files) {
  const key = files.join(',')
  const [data, setData] = useState(() => peekBackendMany(site, files))
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(
    () => peekBackendMany(site, files) == null,
  )

  useEffect(() => {
    let cancelled = false
    const cached = peekBackendMany(site, files)
    if (cached) {
      setData(cached)
      setLoading(false)
      setError(null)
      return undefined
    }

    setLoading(true)
    fetchBackendMany(site, files)
      .then((d) => {
        if (!cancelled) {
          setData(d)
          setError(null)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key encodes files
  }, [site, key])

  return { data, error, loading }
}

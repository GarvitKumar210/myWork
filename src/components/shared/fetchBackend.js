/**
 * Load JSON "backend" files served from /backend/{site}/{file}.json
 * Results are cached in memory so SPA navigations reuse data
 * without blanking the UI (no full “refresh” feel).
 */

import { publicUrl } from './publicUrl'

const cache = new Map()

function cacheKey(site, file) {
  const path = file.endsWith('.json') ? file : `${file}.json`
  return `${site}/${path}`
}

/** Rewrite root-absolute /images/... paths for the active Vite base. */
function withPublicAssets(data) {
  return JSON.parse(
    JSON.stringify(data, (_key, value) => {
      if (typeof value === 'string' && value.startsWith('/images/')) {
        return publicUrl(value)
      }
      return value
    }),
  )
}

/** Sync read of already-loaded data (or null). */
export function peekBackend(site, file) {
  const entry = cache.get(cacheKey(site, file))
  return entry?.status === 'ready' ? entry.data : null
}

export function peekBackendMany(site, files) {
  const out = {}
  for (const file of files) {
    const data = peekBackend(site, file)
    if (data == null) return null
    out[file.replace(/\.json$/, '')] = data
  }
  return out
}

export async function fetchBackend(site, file) {
  const key = cacheKey(site, file)
  const existing = cache.get(key)

  if (existing?.status === 'ready') return existing.data
  if (existing?.status === 'pending') return existing.promise

  const path = file.endsWith('.json') ? file : `${file}.json`
  const promise = fetch(publicUrl(`backend/${site}/${path}`))
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Backend error: ${site}/${path} (${res.status})`)
      }
      return res.json()
    })
    .then((data) => {
      const next = withPublicAssets(data)
      cache.set(key, { status: 'ready', data: next })
      return next
    })
    .catch((err) => {
      cache.delete(key)
      throw err
    })

  cache.set(key, { status: 'pending', promise })
  return promise
}

export async function fetchBackendMany(site, files) {
  const entries = await Promise.all(
    files.map(async (file) => {
      const name = file.replace(/\.json$/, '')
      return [name, await fetchBackend(site, file)]
    }),
  )
  return Object.fromEntries(entries)
}

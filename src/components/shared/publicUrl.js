/**
 * Prefix a root-absolute public path with Vite's base URL
 * so assets work on GitHub Pages (e.g. /myWork/).
 */
export function publicUrl(path = '') {
  if (!path) return import.meta.env.BASE_URL
  if (/^(https?:|data:|blob:)/i.test(path)) return path

  const base = import.meta.env.BASE_URL || '/'
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${base}${clean}`
}

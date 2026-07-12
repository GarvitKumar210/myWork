import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_TITLES = [
  { match: (path) => path.startsWith('/examples/landing'), name: 'NovaFlow' },
  { match: (path) => path.startsWith('/examples/restaurant'), name: 'Ember & Oak' },
  { match: (path) => path.startsWith('/examples/ecommerce'), name: 'Shoply' },
  { match: (path) => path.startsWith('/examples/gym'), name: 'IronPulse' },
  { match: (path) => path.startsWith('/examples/admin'), name: 'PulseAdmin' },
  { match: (path) => path === '/' || path === '', name: 'Portfolio' },
]

function siteNameForPath(pathname) {
  const entry = SITE_TITLES.find((item) => item.match(pathname))
  return entry?.name ?? 'Portfolio'
}

export default function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `Garvit Kumar - ${siteNameForPath(pathname)}`
  }, [pathname])

  return null
}

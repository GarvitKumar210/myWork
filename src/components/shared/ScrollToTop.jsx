import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Always open a route at the top of the page (not mid-scroll from previous page). */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

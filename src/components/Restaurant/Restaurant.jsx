import { Outlet, useLocation } from 'react-router-dom'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'

import Nav from './Nav'
import Footer from './Footer'
import { useBackend } from '../shared/useBackend'
import { RestaurantSkeleton } from '../shared/Skeleton'
import { useReveal } from '../shared/useReveal'

export default function Restaurant() {
  const { data: site, error, loading } = useBackend('restaurant', 'site')
  const location = useLocation()

  // Only re-scan reveals on route change — layout shell stays mounted
  useReveal([site, location.pathname])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf6f1] px-6 text-[#8b3a1a]">
        Backend unavailable: {error}
      </div>
    )
  }

  // Full-page skeleton only the first time this mini-site mounts without cache
  if (loading && !site) return <RestaurantSkeleton />

  return (
    <div
      className="flex min-h-screen flex-col bg-[#faf6f1] text-[#2c1810] antialiased"
      style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        '--font-display': '"Playfair Display", Georgia, serif',
      }}
    >
      <style>{`.font-display { font-family: var(--font-display); }`}</style>
      <Nav name={site.name} />
      <main className="flex-1">
        <Outlet context={{ site }} />
      </main>
      <Footer site={site} />
    </div>
  )
}

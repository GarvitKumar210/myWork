import { Outlet, useLocation } from 'react-router-dom'
import '@fontsource/oswald/500.css'
import '@fontsource/oswald/600.css'
import '@fontsource/oswald/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'

import Nav from './Nav'
import Footer from './Footer'
import { useBackend } from '../shared/useBackend'
import { GymSkeleton } from '../shared/Skeleton'
import { useReveal } from '../shared/useReveal'

export default function Gym() {
  const { data: site, error, loading } = useBackend('gym', 'site')
  const location = useLocation()

  useReveal([site, location.pathname])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-lime-400">
        Backend unavailable: {error}
      </div>
    )
  }

  if (loading && !site) return <GymSkeleton />

  return (
    <div
      className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100 antialiased"
      style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        '--font-display': '"Oswald", system-ui, sans-serif',
      }}
    >
      <style>{`.font-display { font-family: var(--font-display); letter-spacing: 0.02em; }`}</style>
      <Nav />
      <main className="flex-1">
        <Outlet context={{ site }} />
      </main>
      <Footer site={site} />
    </div>
  )
}

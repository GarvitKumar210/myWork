import { useEffect } from 'react'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

import { useContentLoad } from '../shared/useContentLoad'
import { useReveal } from '../shared/useReveal'
import { LandingSkeleton } from '../shared/Skeleton'
import Nav from './Nav'
import Hero from './Hero'
import Features from './Features'
import Pricing from './Pricing'
import Footer from './Footer'

export default function Landing() {
  // Short first-visit skeleton only; revisits in the same tab skip it
  const ready = useContentLoad(280, 'landing')
  useReveal([ready])

  useEffect(() => {
    if (!ready) return
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [ready])

  if (!ready) return <LandingSkeleton />

  return (
    <div
      id="top"
      className="min-h-screen bg-slate-50 text-slate-900 antialiased"
      style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
    >
      <Nav />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

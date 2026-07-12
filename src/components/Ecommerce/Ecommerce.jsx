import { Outlet, useLocation } from 'react-router-dom'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import '@fontsource/outfit/700.css'

import Nav from './Nav'
import Footer from './Footer'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'
import { useBackend } from '../shared/useBackend'
import { EcommerceSkeleton } from '../shared/Skeleton'
import { useReveal } from '../shared/useReveal'

export default function Ecommerce() {
  const { data: site, error, loading } = useBackend('ecommerce', 'site')
  const location = useLocation()

  useReveal([site, location.pathname])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-rose-600">
        Backend unavailable: {error}
      </div>
    )
  }

  if (loading && !site) return <EcommerceSkeleton />

  return (
    <AuthProvider>
      <CartProvider>
        <div
          className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased"
          style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
        >
          {site.promo?.banner && (
            <div className="bg-rose-600 px-4 py-2 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
              {site.promo.banner}
              {site.promo.code && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5">
                  Code {site.promo.code}
                </span>
              )}
            </div>
          )}
          <Nav name={site.name} />
          <main className="flex-1">
            <Outlet context={{ site }} />
          </main>
          <Footer site={site} />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { useBackend } from '../shared/useBackend'
import { AdminSkeleton } from '../shared/Skeleton'
import { useReveal } from '../shared/useReveal'

const titles = {
  '/examples/admin': 'Dashboard',
  '/examples/admin/users': 'Users',
  '/examples/admin/orders': 'Orders',
  '/examples/admin/manage': 'Manage',
  '/examples/admin/analytics': 'Analytics',
  '/examples/admin/settings': 'Settings',
}

export default function Admin() {
  const { data: site, error, loading } = useBackend('admin', 'site')
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useReveal([site, location.pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // No document/page scrollbar while admin is mounted
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    // menu already covered by shell lock
    return undefined
  }, [menuOpen])

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 px-6 text-sky-700">
        Backend unavailable: {error}
      </div>
    )
  }

  if (loading && !site) return <AdminSkeleton />

  const title = titles[location.pathname] ?? 'Admin'

  return (
    <div
      className="admin-shell flex w-full max-w-[100vw] bg-slate-100 text-slate-900 antialiased"
      style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
    >
      <Sidebar
        site={site}
        mobileOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar
          title={title}
          site={site}
          menuOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
        <main className="admin-main flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-4 md:p-5">
          <div className="mx-auto flex h-full min-h-0 w-full min-w-0 max-w-6xl flex-col">
            <Outlet context={{ site }} />
          </div>
        </main>
        <footer className="shrink-0 border-t border-slate-200 px-4 py-2 text-center text-xs text-slate-400 sm:px-6">
          {site.footerBlurb}
        </footer>
      </div>
    </div>
  )
}

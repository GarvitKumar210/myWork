import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Wrench,
  ArrowLeft,
  X,
} from 'lucide-react'

const links = [
  { to: '/examples/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/examples/admin/users', label: 'Users', icon: Users },
  { to: '/examples/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/examples/admin/manage', label: 'Manage', icon: Wrench },
  { to: '/examples/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/examples/admin/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ site, mobileOpen, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const nav = (
    <>
      <div className="flex shrink-0 items-center justify-between gap-2 px-4 py-4 sm:px-5 sm:py-5">
        <div className="min-w-0">
          <p className="m-0 truncate text-lg font-bold tracking-tight text-white">
            {site?.name ?? 'PulseAdmin'}
          </p>
          <p className="m-0 mt-0.5 truncate text-xs text-slate-400">
            {site?.product ?? 'Console'}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-3 pb-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition ${
                isActive
                  ? 'bg-sky-500/15 text-sky-300'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <link.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto shrink-0 border-t border-slate-800 p-3 sm:p-4">
        {site?.admin && (
          <div className="mb-3 rounded-lg bg-slate-800/60 px-3 py-2.5">
            <p className="m-0 truncate text-sm font-semibold text-white">
              {site.admin.name}
            </p>
            <p className="m-0 mt-0.5 truncate text-xs text-slate-400">
              {site.admin.role}
            </p>
          </div>
        )}
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 no-underline transition hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to home
        </Link>
      </div>
    </>
  )

  const mobileMenu =
    mounted && mobileOpen
      ? createPortal(
          <div
            className="lg:hidden"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              maxWidth: '100%',
              height: '100dvh',
              zIndex: 9999,
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="border-0"
              style={{
                position: 'absolute',
                inset: 0,
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.55)',
                cursor: 'pointer',
              }}
            />
            <aside
              className="flex flex-col bg-slate-950 shadow-2xl"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: 'min(17rem, 88vw)',
                maxWidth: '100vw',
                overflow: 'hidden',
                animation:
                  'mobile-nav-in-left 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
              }}
            >
              {nav}
            </aside>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col overflow-y-auto border-r border-slate-800 bg-slate-950 lg:flex">
        {nav}
      </aside>
      {mobileMenu}
    </>
  )
}

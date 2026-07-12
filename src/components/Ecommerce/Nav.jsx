import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ShoppingBag,
  User,
  LogIn,
  Search,
  ArrowLeft,
  Truck,
  CreditCard,
  UserPlus,
} from 'lucide-react'
import { useCart } from './CartContext'
import { useAuth } from './AuthContext'
import HamburgerButton from '../shared/HamburgerButton'
import SideDrawer from '../shared/SideDrawer'

const mainLinks = [
  { to: '/examples/ecommerce', end: true, label: 'Home' },
  { to: '/examples/ecommerce/shop', label: 'Shop' },
  { to: '/examples/ecommerce/shipping', label: 'Shipping' },
]

function linkClass({ isActive }) {
  return [
    'relative px-1 py-1 text-[0.9375rem] font-medium no-underline transition-colors',
    isActive
      ? 'text-zinc-900 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-rose-600'
      : 'text-zinc-500 hover:text-zinc-900',
  ].join(' ')
}

export default function Nav({ name = 'Shoply' }) {
  const { count } = useCart()
  const { isLoggedIn, user } = useAuth()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const accountTo = isLoggedIn
    ? '/examples/ecommerce/account'
    : '/examples/ecommerce/login'

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
      {/*
        Mobile: logo left · cart + hamburger right (space-between)
        Desktop: 3-column grid with center links + home on far right
      */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:grid md:h-[4.25rem] md:grid-cols-[1fr_auto_1fr] md:px-6">
        {/* Left: brand */}
        <div className="flex min-w-0 items-center justify-start">
          <Link
            to="/examples/ecommerce"
            className="group flex min-w-0 items-center gap-2 no-underline"
            onClick={close}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white transition group-hover:bg-rose-600">
              S
            </span>
            <span className="truncate text-lg font-semibold tracking-tight text-zinc-900">
              {name}
            </span>
          </Link>
        </div>

        {/* Center: primary links (desktop only) */}
        <nav className="hidden items-center gap-8 md:flex">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: cart + hamburger (mobile) · full actions (desktop) */}
        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-1.5">
          <Link
            to="/examples/ecommerce/shop"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-600 no-underline transition hover:bg-zinc-100 hover:text-zinc-900 lg:inline-flex"
            aria-label="Search shop"
            title="Shop"
          >
            <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
          </Link>

          <Link
            to={accountTo}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-600 no-underline transition hover:bg-zinc-100 hover:text-zinc-900 md:inline-flex"
            aria-label={isLoggedIn ? `Account, ${user?.name}` : 'Sign in'}
            title={isLoggedIn ? user?.name : 'Sign in'}
          >
            {isLoggedIn ? (
              <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
            ) : (
              <LogIn className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
            )}
          </Link>

          <Link
            to="/examples/ecommerce/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 no-underline transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label={`Cart${count ? `, ${count} items` : ''}`}
          >
            <ShoppingBag
              className="h-[1.15rem] w-[1.15rem]"
              strokeWidth={1.75}
            />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[0.625rem] font-bold leading-none text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Hamburger: mobile only */}
          <div className="md:hidden">
            <HamburgerButton
              open={open}
              onClick={() => setOpen((v) => !v)}
              className="bg-zinc-100 text-zinc-800"
              barClassName="bg-zinc-800"
            />
          </div>

          {/* Back to portfolio: desktop only — mobile uses drawer link */}
          <Link
            to="/"
            className="ml-1 hidden h-10 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 text-sm font-semibold text-zinc-700 no-underline transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 md:inline-flex"
            title="Back to home"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            Back to home
          </Link>
        </div>
      </div>

      {/* Side drawer — mobile */}
      <SideDrawer
        open={open}
        onClose={close}
        panelClassName="bg-white text-zinc-900"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white">
              S
            </span>
            <span className="font-semibold text-zinc-900">{name}</span>
          </div>
          <HamburgerButton
            open
            onClick={close}
            className="bg-zinc-100 text-zinc-800"
            barClassName="bg-zinc-800"
          />
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto p-4">
          <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Browse
          </p>
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={close}
              className={({ isActive }) =>
                `drawer-link rounded-xl px-3 py-3 text-base font-medium no-underline transition ${
                  isActive
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="my-4 border-t border-zinc-100" />

          <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Account
          </p>
          <Link
            to={accountTo}
            onClick={close}
            className="drawer-link flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-zinc-700 no-underline hover:bg-zinc-50"
          >
            {isLoggedIn ? (
              <User className="h-5 w-5 text-zinc-400" strokeWidth={1.75} />
            ) : (
              <LogIn className="h-5 w-5 text-zinc-400" strokeWidth={1.75} />
            )}
            {isLoggedIn ? user?.name || 'Account' : 'Sign in'}
          </Link>
          {!isLoggedIn && (
            <Link
              to="/examples/ecommerce/register"
              onClick={close}
              className="drawer-link flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-zinc-700 no-underline hover:bg-zinc-50"
            >
              <UserPlus className="h-5 w-5 text-zinc-400" strokeWidth={1.75} />
              Create account
            </Link>
          )}

          <div className="my-4 border-t border-zinc-100" />

          <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Order
          </p>
          <Link
            to="/examples/ecommerce/cart"
            onClick={close}
            className="drawer-link flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-zinc-700 no-underline hover:bg-zinc-50"
          >
            <span className="flex items-center gap-3">
              <ShoppingBag
                className="h-5 w-5 text-zinc-400"
                strokeWidth={1.75}
              />
              Cart
            </span>
            {count > 0 && (
              <span className="rounded-full bg-rose-600 px-2 py-0.5 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/examples/ecommerce/checkout"
            onClick={close}
            className="drawer-link flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-zinc-700 no-underline hover:bg-zinc-50"
          >
            <CreditCard className="h-5 w-5 text-zinc-400" strokeWidth={1.75} />
            Checkout
          </Link>
          <Link
            to="/examples/ecommerce/shipping"
            onClick={close}
            className="drawer-link flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-zinc-700 no-underline hover:bg-zinc-50"
          >
            <Truck className="h-5 w-5 text-zinc-400" strokeWidth={1.75} />
            Shipping & returns
          </Link>

          <div className="mt-auto border-t border-zinc-100 pt-4">
            <Link
              to="/"
              onClick={close}
              className="drawer-link flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 no-underline hover:bg-zinc-50 hover:text-zinc-700"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back to home
            </Link>
          </div>
        </nav>
      </SideDrawer>
    </header>
  )
}

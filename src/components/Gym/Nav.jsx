import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Dumbbell,
  Users,
  Calendar,
  CreditCard,
  Flame,
  ArrowLeft,
} from 'lucide-react'
import HamburgerButton from '../shared/HamburgerButton'
import SideDrawer from '../shared/SideDrawer'

const links = [
  { to: '/examples/gym', end: true, label: 'Home', icon: Flame },
  { to: '/examples/gym/classes', label: 'Classes', icon: Dumbbell },
  { to: '/examples/gym/trainers', label: 'Trainers', icon: Users },
  { to: '/examples/gym/schedule', label: 'Schedule', icon: Calendar },
  { to: '/examples/gym/membership', label: 'Membership', icon: CreditCard },
]

function navClass({ isActive }) {
  return [
    'rounded-full px-3 py-1.5 text-sm font-semibold no-underline transition',
    isActive
      ? 'bg-lime-400 text-neutral-950'
      : 'text-neutral-300 hover:bg-neutral-900 hover:text-lime-400',
  ].join(' ')
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-30 border-b border-lime-400/15 bg-neutral-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
        <Link
          to="/examples/gym"
          className="font-display text-lg font-bold tracking-[0.08em] text-lime-400 no-underline"
          onClick={close}
        >
          IRONPULSE
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navClass}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/examples/gym/join"
            className="ml-1 rounded-full bg-lime-400 px-4 py-1.5 text-sm font-bold text-neutral-950 no-underline transition hover:bg-lime-300"
          >
            Join
          </Link>
          <Link
            to="/"
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-sm font-semibold text-neutral-300 no-underline transition hover:border-lime-400/40 hover:text-lime-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/examples/gym/join"
            className="rounded-full bg-lime-400 px-3 py-1.5 text-xs font-bold text-neutral-950 no-underline"
          >
            Join
          </Link>
          <HamburgerButton
            open={open}
            onClick={() => setOpen((v) => !v)}
            className="bg-neutral-900 text-lime-400"
            barClassName="bg-lime-400"
          />
        </div>
      </div>

      <SideDrawer
        open={open}
        onClose={close}
        hideFrom="lg"
        panelClassName="bg-neutral-950 text-neutral-100 border-l border-lime-400/20"
      >
        <div className="flex items-center justify-between border-b border-lime-400/15 px-5 py-4">
          <span className="font-display font-bold tracking-[0.08em] text-lime-400">
            IRONPULSE
          </span>
          <HamburgerButton
            open
            onClick={close}
            className="bg-neutral-900 text-lime-400"
            barClassName="bg-lime-400"
          />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={close}
              className={({ isActive }) =>
                `drawer-link flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold no-underline transition ${
                  isActive
                    ? 'bg-lime-400 text-neutral-950'
                    : 'text-neutral-200 hover:bg-neutral-900 hover:text-lime-400'
                }`
              }
            >
              <link.icon className="h-5 w-5" strokeWidth={1.75} />
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/examples/gym/join"
            onClick={close}
            className="drawer-link mt-2 rounded-xl bg-lime-400 px-4 py-3.5 text-center text-base font-bold text-neutral-950 no-underline"
          >
            Join now
          </Link>
          <Link
            to="/"
            onClick={close}
            className="drawer-link mt-auto flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold text-neutral-500 no-underline hover:bg-neutral-900 hover:text-lime-400"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to home
          </Link>
        </nav>
      </SideDrawer>
    </header>
  )
}

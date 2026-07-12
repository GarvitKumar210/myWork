import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import HamburgerButton from '../shared/HamburgerButton'
import SideDrawer from '../shared/SideDrawer'

const links = [
  { to: '/examples/restaurant', end: true, label: 'Home' },
  { to: '/examples/restaurant/menu', label: 'Menu' },
  { to: '/examples/restaurant/about', label: 'About' },
  { to: '/examples/restaurant/reserve', label: 'Reserve' },
]

export default function Nav({ name = 'Ember & Oak' }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-30 border-b border-[#e8d9cc]/80 bg-[#faf6f1]/95 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <Link
          to="/examples/restaurant"
          className="font-display text-xl font-semibold tracking-tight text-[#8b3a1a] no-underline"
          onClick={close}
        >
          {name}
        </Link>

        <nav className="hidden items-center gap-1 sm:gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium no-underline transition ${
                  isActive
                    ? 'bg-[#8b3a1a] text-[#faf6f1]'
                    : 'text-[#5c4033] hover:bg-[#f0e6dc]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/"
            className="ml-1 rounded-full px-3 py-1.5 text-sm font-medium text-[#8a6f60] no-underline hover:bg-[#f0e6dc] hover:text-[#8b3a1a]"
          >
            ← Home
          </Link>
        </nav>

        <HamburgerButton
          open={open}
          onClick={() => setOpen((v) => !v)}
          className="bg-[#f0e6dc] text-[#8b3a1a] md:hidden"
          barClassName="bg-[#8b3a1a]"
        />
      </div>

      <SideDrawer
        open={open}
        onClose={close}
        panelClassName="bg-[#faf6f1] text-[#2c1810]"
      >
        <div className="flex items-center justify-between border-b border-[#e8d9cc] px-5 py-4">
          <span className="font-display font-semibold text-[#8b3a1a]">
            {name}
          </span>
          <HamburgerButton
            open
            onClick={close}
            className="bg-[#f0e6dc] text-[#8b3a1a]"
            barClassName="bg-[#8b3a1a]"
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
                `drawer-link rounded-xl px-4 py-3.5 text-base font-medium no-underline transition ${
                  isActive
                    ? 'bg-[#8b3a1a] text-[#faf6f1]'
                    : 'text-[#5c4033] hover:bg-[#f0e6dc]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/"
            onClick={close}
            className="drawer-link rounded-xl px-4 py-3.5 text-base font-medium text-[#8a6f60] no-underline hover:bg-[#f0e6dc] hover:text-[#8b3a1a]"
          >
            ← Home
          </Link>
        </nav>
      </SideDrawer>
    </header>
  )
}

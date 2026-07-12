import { useState } from 'react'
import { Button } from './Button'
import { FIVERR_URL } from './links'
import HamburgerButton from '../shared/HamburgerButton'
import SideDrawer from '../shared/SideDrawer'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-5 max-[720px]:px-[1.15rem] max-[720px]:py-4">
        <a
          href="#top"
          className="reveal inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-[0.95rem] font-bold tracking-wide text-white no-underline transition duration-200 hover:-translate-y-px hover:opacity-90"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
          onClick={closeMenu}
        >
          GK
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 min-[721px]:flex">
          <a
            href="#examples"
            className="reveal text-base font-semibold text-navy no-underline transition duration-200 hover:opacity-70"
            data-reveal
            style={{ '--reveal-delay': '60ms' }}
          >
            Examples
          </a>
          <Button
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal"
            data-reveal
            style={{ '--reveal-delay': '100ms' }}
          >
            Hire Me
          </Button>
        </nav>

        <div
          className="reveal hidden max-[720px]:block"
          data-reveal
          style={{ '--reveal-delay': '40ms' }}
        >
          <HamburgerButton
            open={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="bg-card text-navy"
            barClassName="bg-navy"
          />
        </div>
      </div>

      <SideDrawer
        open={menuOpen}
        onClose={closeMenu}
        panelClassName="bg-white text-navy"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="text-sm font-bold tracking-wide text-navy">Menu</span>
          <HamburgerButton
            open
            onClick={closeMenu}
            className="bg-card text-navy"
            barClassName="bg-navy"
          />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          <a
            href="#examples"
            className="drawer-link rounded-xl px-4 py-3.5 text-base font-semibold text-navy no-underline hover:bg-card"
            onClick={closeMenu}
          >
            Examples
          </a>
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-link rounded-xl bg-navy px-4 py-3.5 text-center text-base font-semibold text-white no-underline"
            onClick={closeMenu}
          >
            Hire Me
          </a>
        </nav>
      </SideDrawer>
    </header>
  )
}

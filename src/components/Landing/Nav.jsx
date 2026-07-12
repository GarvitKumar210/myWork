import { useState } from 'react'
import { Link } from 'react-router-dom'
import HamburgerButton from '../shared/HamburgerButton'
import SideDrawer from '../shared/SideDrawer'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-indigo-100/80 bg-white/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-indigo-600 no-underline"
          onClick={close}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white">
            N
          </span>
          NovaFlow
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="no-underline hover:text-indigo-600">
            Features
          </a>
          <a href="#pricing" className="no-underline hover:text-indigo-600">
            Pricing
          </a>
          <Link
            to="/"
            className="text-slate-500 no-underline hover:text-indigo-600"
          >
            ← Back to home
          </Link>
          <a
            href="#pricing"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-indigo-500"
          >
            Get started
          </a>
        </nav>

        <HamburgerButton
          open={open}
          onClick={() => setOpen((v) => !v)}
          className="bg-indigo-50 text-indigo-700 md:hidden"
          barClassName="bg-indigo-700"
        />
      </div>

      <SideDrawer
        open={open}
        onClose={close}
        panelClassName="bg-white text-slate-800"
      >
        <div className="flex items-center justify-between border-b border-indigo-100 px-5 py-4">
          <span className="font-bold text-indigo-600">NovaFlow</span>
          <HamburgerButton
            open
            onClick={close}
            className="bg-indigo-50 text-indigo-700"
            barClassName="bg-indigo-700"
          />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          <a
            href="#features"
            className="drawer-link rounded-xl px-4 py-3.5 text-base font-semibold no-underline hover:bg-indigo-50 hover:text-indigo-600"
            onClick={close}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="drawer-link rounded-xl px-4 py-3.5 text-base font-semibold no-underline hover:bg-indigo-50 hover:text-indigo-600"
            onClick={close}
          >
            Pricing
          </a>
          <Link
            to="/"
            className="drawer-link rounded-xl px-4 py-3.5 text-base font-semibold text-slate-500 no-underline hover:bg-indigo-50 hover:text-indigo-600"
            onClick={close}
          >
            ← Back to home
          </Link>
          <a
            href="#pricing"
            className="drawer-link mt-2 rounded-full bg-indigo-600 px-4 py-3.5 text-center text-base font-semibold text-white no-underline"
            onClick={close}
          >
            Get started
          </a>
        </nav>
      </SideDrawer>
    </header>
  )
}

import { Bell, Search } from 'lucide-react'
import HamburgerButton from '../shared/HamburgerButton'

export default function TopBar({
  title,
  site,
  menuOpen,
  onMenuOpen,
  onMenuClose,
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 w-full min-w-0 shrink-0 items-center gap-2 border-b border-slate-200 bg-white/95 px-3 backdrop-blur-md sm:h-16 sm:gap-3 sm:px-5">
      <div className="shrink-0 lg:hidden">
        <HamburgerButton
          open={menuOpen}
          onClick={() => (menuOpen ? onMenuClose?.() : onMenuOpen?.())}
          className="bg-slate-100 text-slate-800"
          barClassName="bg-slate-800"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="m-0 truncate text-base font-semibold text-slate-900 sm:text-lg">
          {title}
        </h1>
        <p className="m-0 hidden truncate text-xs text-slate-500 sm:block">
          {site?.tagline} · v{site?.version}
        </p>
      </div>

      <div className="hidden min-w-0 max-w-[14rem] items-center gap-2 truncate rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 md:flex lg:max-w-none">
        <Search className="h-4 w-4 shrink-0" />
        <span className="truncate">Search…</span>
        <kbd className="ml-auto hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[0.65rem] text-slate-400 xl:inline">
          ⌘K
        </kbd>
      </div>

      <button
        type="button"
        className="relative shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" strokeWidth={1.75} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sky-500" />
      </button>
    </header>
  )
}

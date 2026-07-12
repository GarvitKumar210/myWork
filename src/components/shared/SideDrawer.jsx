import { useEffect } from 'react'

/**
 * Full-height mobile menu that slides in from the side with animation.
 * Desktop: not used (pass desktopNav separately in the parent).
 */
export default function SideDrawer({
  open,
  onClose,
  children,
  side = 'right',
  className = '',
  panelClassName = 'bg-white text-zinc-900',
  widthClass = 'w-[min(20rem,86vw)]',
}) {
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const fromRight = side === 'right'

  return (
    <div
      className={`fixed inset-0 z-[100] md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 border-0 bg-black/45 transition-opacity duration-300 ease-out ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`absolute top-0 bottom-0 flex h-[100dvh] flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${widthClass} ${panelClassName} ${className} ${
          fromRight ? 'right-0' : 'left-0'
        } ${open ? 'side-drawer-panel is-open' : 'side-drawer-panel'} ${
          open
            ? 'translate-x-0'
            : fromRight
              ? 'translate-x-full'
              : '-translate-x-full'
        }`}
      >
        {children}
      </aside>
    </div>
  )
}

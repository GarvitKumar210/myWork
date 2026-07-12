import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Mobile navigation overlay.
 * - Portaled to document.body (never trapped by sticky/blur headers)
 * - Only mounted while open (never sits off-screen to the right)
 * - Full-viewport shell with fixed inline styles so layout cannot
 *   become a permanent side column + horizontal scroll
 */
export default function SideDrawer({
  open,
  onClose,
  children,
  side = 'right',
  className = '',
  panelClassName = 'bg-white text-zinc-900',
  /** Max panel width; shell is always full viewport. */
  widthClass = 'w-[min(20rem,86vw)]',
  hideFrom = 'md',
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyWidth = body.style.width
    const scrollY = window.scrollY

    // Lock scroll without allowing layout shift / side scroll
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.width = prevBodyWidth
      window.scrollTo(0, scrollY)
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

  if (!mounted || !open) return null

  const fromRight = side === 'right'
  const hideClass =
    hideFrom === 'lg'
      ? 'lg:hidden'
      : hideFrom === 'sm'
        ? 'sm:hidden'
        : hideFrom === 'max-720'
          ? 'min-[721px]:hidden'
          : 'md:hidden'

  const node = (
    <div
      className={`mobile-nav-root ${hideClass}`}
      role="presentation"
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
        overscrollBehavior: 'none',
      }}
    >
      {/* Dim full-screen backdrop — tap to close */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="mobile-nav-backdrop border-0"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          cursor: 'pointer',
        }}
      />

      {/* Slide-in panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`mobile-nav-panel side-drawer-panel is-open flex flex-col shadow-2xl ${widthClass} ${panelClassName} ${className}`}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          [fromRight ? 'right' : 'left']: 0,
          height: '100%',
          maxHeight: '100dvh',
          maxWidth: '100vw',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          animation: fromRight
            ? 'mobile-nav-in-right 0.28s cubic-bezier(0.22, 1, 0.36, 1) both'
            : 'mobile-nav-in-left 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {children}
      </aside>
    </div>
  )

  return createPortal(node, document.body)
}

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Mobile navigation overlay.
 * Portaled to document.body; only mounted while open.
 * Uses a light scroll lock (overflow only) so the page stays
 * vertically scrollable after the menu closes.
 */
export default function SideDrawer({
  open,
  onClose,
  children,
  side = 'right',
  className = '',
  panelClassName = 'bg-white text-zinc-900',
  widthClass = 'w-[min(20rem,86vw)]',
  hideFrom = 'md',
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const body = document.body
    const prev = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = prev || ''
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
        inset: 0,
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
          border: 'none',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          cursor: 'pointer',
        }}
      />

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
          maxWidth: 'min(20rem, 86vw)',
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

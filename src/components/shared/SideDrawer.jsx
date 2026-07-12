import { useEffect, useState } from 'react'

/**
 * Full-height mobile menu that slides in from the side.
 * Unmounts when closed so the off-screen panel cannot create
 * horizontal page scroll or a “stuck” sidebar on the right.
 */
export default function SideDrawer({
  open,
  onClose,
  children,
  side = 'right',
  className = '',
  panelClassName = 'bg-white text-zinc-900',
  widthClass = 'w-[min(20rem,86vw)]',
  /** Hide shell at this breakpoint and up (match site desktop nav). */
  hideFrom = 'md',
}) {
  const [rendered, setRendered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setRendered(true)
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(id)
    }
    setVisible(false)
    return undefined
  }, [open])

  // Fallback unmount if transitionend is skipped (reduced motion / interrupted)
  useEffect(() => {
    if (open || !rendered) return undefined
    const t = window.setTimeout(() => setRendered(false), 360)
    return () => window.clearTimeout(t)
  }, [open, rendered])

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

  if (!rendered) return null

  const fromRight = side === 'right'
  const hideClass =
    hideFrom === 'lg'
      ? 'lg:hidden'
      : hideFrom === 'sm'
        ? 'sm:hidden'
        : hideFrom === 'max-720'
          ? 'min-[721px]:hidden'
          : 'md:hidden'

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden ${hideClass} ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={visible ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 border-0 bg-black/45 transition-opacity duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return
          if (!open && !visible) setRendered(false)
        }}
        className={`absolute top-0 bottom-0 flex h-[100dvh] max-w-[100vw] flex-col overflow-y-auto overscroll-contain shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${widthClass} ${panelClassName} ${className} ${
          fromRight ? 'right-0' : 'left-0'
        } ${visible ? 'side-drawer-panel is-open' : 'side-drawer-panel'} ${
          visible
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

/**
 * Accessible hamburger toggle for responsive navbars.
 * Uses global .menu-toggle / .is-open styles from index.css
 */
export default function HamburgerButton({
  open,
  onClick,
  className = '',
  barClassName = 'bg-current',
  labelOpen = 'Close menu',
  labelClosed = 'Open menu',
}) {
  return (
    <button
      type="button"
      className={`menu-toggle flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-xl border-none p-2.5 ${className}`}
      aria-label={open ? labelOpen : labelClosed}
      aria-expanded={open}
      onClick={onClick}
    >
      <span className={barClassName} />
      <span className={barClassName} />
      <span className={barClassName} />
    </button>
  )
}

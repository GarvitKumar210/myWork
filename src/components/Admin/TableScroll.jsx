/**
 * Table scroller: horizontal + vertical, stays inside the admin viewport.
 * Sticky header so columns stay readable while scrolling.
 */
export default function TableScroll({ children, className = '' }) {
  return (
    <div
      className={`admin-table-scroll min-h-0 flex-1 overflow-auto overscroll-contain ${className}`}
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

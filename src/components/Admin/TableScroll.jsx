/**
 * Table wrapper: allows horizontal scroll on small screens.
 * Vertical scrolling is handled by the page.
 */
export default function TableScroll({ children, className = '' }) {
  return (
    <div
      className={`admin-table-scroll ${className}`}
      role="region"
      aria-label="Data table"
    >
      {children}
    </div>
  )
}

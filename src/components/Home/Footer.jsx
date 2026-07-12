export default function Footer() {
  return (
    <footer
      className="reveal mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line px-6 py-6 text-[0.9rem] text-muted"
      data-reveal
      style={{ '--reveal-delay': '0ms' }}
    >
      <p className="m-0">© {new Date().getFullYear()} Garvit Kumar</p>
      <a
        href="#top"
        className="font-semibold text-navy no-underline hover:opacity-75"
      >
        Back to top
      </a>
    </footer>
  )
}

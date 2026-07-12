import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-indigo-100 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <div>
          <p className="m-0 text-sm font-bold text-indigo-600">NovaFlow</p>
          <p className="mt-1 mb-0 text-sm text-slate-500">
            Demo mini-site · not a real product
          </p>
        </div>
        <Link
          to="/"
          className="text-sm font-semibold text-slate-600 no-underline hover:text-indigo-600"
        >
          ← Back to home
        </Link>
      </div>
    </footer>
  )
}

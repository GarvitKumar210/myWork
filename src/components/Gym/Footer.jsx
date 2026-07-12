import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer({ site }) {
  if (!site) return null

  return (
    <footer className="mt-auto border-t border-lime-400/15 bg-black text-neutral-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display m-0 text-lg font-bold tracking-[0.08em] text-lime-400">
            {site.name}
          </p>
          <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-500">
            {site.footerBlurb}
          </p>
        </div>
        <div>
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-lime-400">
            Visit
          </p>
          <p className="mt-3 mb-1 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-400" />
            {site.address.street}, {site.address.city}, {site.address.state}{' '}
            {site.address.zip}
          </p>
          <p className="m-0 flex items-center gap-2 text-sm">
            <Phone className="h-3.5 w-3.5 text-lime-400" /> {site.phone}
          </p>
          <p className="mt-1 mb-0 flex items-center gap-2 text-sm">
            <Mail className="h-3.5 w-3.5 text-lime-400" /> {site.email}
          </p>
        </div>
        <div>
          <p className="m-0 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400">
            <Clock className="h-3.5 w-3.5" /> Hours
          </p>
          <ul className="mt-3 mb-4 list-none space-y-1 p-0 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-neutral-500">{h.time}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/examples/gym/join"
            className="inline-block rounded-full bg-lime-400 px-5 py-2 text-sm font-bold text-neutral-950 no-underline hover:bg-lime-300"
          >
            Join the floor
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-4 text-center text-xs text-neutral-600">
        Demo mini-site ·{' '}
        <Link to="/" className="text-lime-500 no-underline hover:underline">
          Back to home
        </Link>
      </div>
    </footer>
  )
}

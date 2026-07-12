import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  AtSign,
  ShoppingBag,
  LogIn,
  UserPlus,
} from 'lucide-react'

export default function Footer({ site }) {
  if (!site) return null

  return (
    <footer className="mt-auto border-t border-rose-100 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="m-0 text-lg font-bold text-white">{site.name}</p>
          <p className="mt-2 mb-0 text-sm leading-relaxed text-zinc-400">
            {site.footerBlurb}
          </p>
          <p className="mt-3 mb-0 flex items-center gap-2 text-sm text-zinc-500">
            <AtSign className="h-4 w-4" /> {site.social.instagram}
          </p>
        </div>
        <div>
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-rose-400">
            Explore
          </p>
          <ul className="mt-3 mb-0 list-none space-y-2.5 p-0 text-sm">
            <li>
              <Link
                to="/examples/ecommerce/shop"
                className="inline-flex items-center gap-2 text-zinc-300 no-underline hover:text-white"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Shop all
              </Link>
            </li>
            <li>
              <Link
                to="/examples/ecommerce/login"
                className="inline-flex items-center gap-2 text-zinc-300 no-underline hover:text-white"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
            </li>
            <li>
              <Link
                to="/examples/ecommerce/register"
                className="inline-flex items-center gap-2 text-zinc-300 no-underline hover:text-white"
              >
                <UserPlus className="h-3.5 w-3.5" /> Register
              </Link>
            </li>
            <li>
              <Link
                to="/examples/ecommerce/checkout"
                className="inline-flex items-center gap-2 text-zinc-300 no-underline hover:text-white"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-rose-400">
            Contact
          </p>
          <p className="mt-3 mb-1 flex items-center gap-2 text-sm">
            <Mail className="h-3.5 w-3.5 text-rose-400" /> {site.email}
          </p>
          <p className="m-0 flex items-center gap-2 text-sm text-zinc-400">
            <Phone className="h-3.5 w-3.5 text-rose-400" /> {site.phone}
          </p>
          <p className="mt-2 mb-0 flex items-start gap-2 text-sm text-zinc-500">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
            {site.address.street}, {site.address.city}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-zinc-500">
        Demo mini-site · Lucide icons ·{' '}
        <Link to="/" className="text-rose-400 no-underline hover:underline">
          Back to home
        </Link>
      </div>
    </footer>
  )
}

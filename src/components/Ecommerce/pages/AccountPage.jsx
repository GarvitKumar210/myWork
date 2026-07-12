import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Package,
  Heart,
  LogOut,
  ShoppingBag,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../AuthContext'
import { useCart } from '../CartContext'
import { useReveal } from '../../shared/useReveal'

export default function AccountPage() {
  const { user, isLoggedIn, logout } = useAuth()
  const { count, subtotal } = useCart()
  const navigate = useNavigate()

  useReveal([isLoggedIn])

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center sm:px-6">
        <User className="mx-auto h-10 w-10 text-zinc-400" strokeWidth={1.5} />
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">Account</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in to view your profile and order shortcuts.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/examples/ecommerce/login"
            className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline"
          >
            Sign in
          </Link>
          <Link
            to="/examples/ecommerce/register"
            className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-800 no-underline"
          >
            Register
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-rose-600">
          Your profile
        </p>
        <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900">Account</h1>
      </div>

      <div
        className="reveal mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6"
        data-reveal
        style={{ '--reveal-delay': '80ms' }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <User className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-lg font-bold text-zinc-900">{user.name}</p>
          <p className="m-0 mt-0.5 flex items-center gap-1.5 text-sm text-zinc-500">
            <Mail className="h-3.5 w-3.5" /> {user.email}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/examples/ecommerce/login')
          }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-rose-200 hover:text-rose-600"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: ShoppingBag,
            label: 'Cart items',
            value: String(count),
            to: '/examples/ecommerce/cart',
          },
          {
            icon: Package,
            label: 'Cart value',
            value: `$${subtotal.toFixed(0)}`,
            to: '/examples/ecommerce/checkout',
          },
          {
            icon: Heart,
            label: 'Wishlist',
            value: 'Demo',
            to: '/examples/ecommerce/shop',
          },
        ].map((card, i) => (
          <Link
            key={card.label}
            to={card.to}
            className="reveal hover-lift rounded-2xl border border-zinc-200 bg-white p-5 text-inherit no-underline"
            data-reveal
            style={{ '--reveal-delay': `${100 + i * 70}ms` }}
          >
            <card.icon className="h-5 w-5 text-rose-600" strokeWidth={1.75} />
            <p className="m-0 mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {card.label}
            </p>
            <p className="m-0 mt-1 text-xl font-bold text-zinc-900">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div
        className="reveal mt-6 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800"
        data-reveal
        style={{ '--reveal-delay': '200ms' }}
      >
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
        <p className="m-0">
          Demo auth only. Sessions and registered accounts stay in this
          browser&apos;s localStorage — nothing is sent to a real server.
        </p>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CreditCard,
  Lock,
  CheckCircle2,
  Truck,
  Tag,
  ShoppingBag,
  LogIn,
} from 'lucide-react'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

const empty = {
  email: '',
  name: '',
  address: '',
  city: '',
  zip: '',
  country: 'United States',
  shipping: 'standard',
  promo: '',
}

export default function CheckoutPage() {
  const { items, subtotal, clear, count } = useCart()
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const {
    data: shippingData,
    error,
    loading,
  } = useBackend('ecommerce', 'shipping')
  const [form, setForm] = useState(empty)
  const [placed, setPlaced] = useState(null)

  useEffect(() => {
    if (!user) return
    setForm((f) => ({
      ...f,
      email: f.email || user.email,
      name: f.name || user.name,
    }))
  }, [user])

  useReveal([shippingData, placed, items.length, isLoggedIn])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-rose-600">{error}</p>
    )
  }

  if (loading || !shippingData) return <SoftLoader label="Loading checkout…" />

  if (count === 0 && !placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="m-0 text-2xl font-bold">Nothing to checkout</h1>
        <Link
          to="/examples/ecommerce/shop"
          className="mt-6 inline-block rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline"
        >
          Go to shop
        </Link>
      </div>
    )
  }

  const method =
    shippingData.methods.find((m) => m.id === form.shipping) ??
    shippingData.methods[0]

  let shipCost = method.price
  if (method.freeOver != null && subtotal >= method.freeOver) shipCost = 0

  let discount = 0
  if (form.promo.trim().toUpperCase() === 'WELCOME15') {
    discount = subtotal * 0.15
  }

  const total = Math.max(0, subtotal - discount + shipCost)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const order = {
      id: `SLY-${Date.now().toString().slice(-8)}`,
      items: [...items],
      form: { ...form },
      subtotal,
      discount,
      shipCost,
      total,
      method: method.name,
    }
    clear()
    setPlaced(order)
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 sm:px-6">
        <div
          className="reveal rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm"
          data-reveal
          style={{ '--reveal-delay': '60ms' }}
        >
          <CheckCircle2
            className="mx-auto h-12 w-12 text-emerald-500"
            strokeWidth={1.5}
          />
          <p className="m-0 mt-3 text-sm font-semibold uppercase tracking-wider text-rose-600">
            Order confirmed
          </p>
          <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900">
            Thanks, {placed.form.name.split(' ')[0] || 'friend'}!
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            Order <strong>{placed.id}</strong> · ${placed.total.toFixed(2)} via{' '}
            {placed.method}
          </p>
          <p className="mt-2 text-xs text-zinc-400">
            Demo only — no payment was processed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/examples/ecommerce/shop"
              className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline"
            >
              Keep shopping
            </Link>
            <button
              type="button"
              onClick={() => navigate('/examples/ecommerce')}
              className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-800"
            >
              Store home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600">
          <Lock className="h-3.5 w-3.5" /> Secure checkout
        </p>
        <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900">Checkout</h1>
        {!isLoggedIn && (
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <LogIn className="h-4 w-4" />
            Have an account?{' '}
            <Link
              to="/examples/ecommerce/login"
              state={{ from: '/examples/ecommerce/checkout' }}
              className="font-semibold text-rose-600 no-underline hover:underline"
            >
              Sign in
            </Link>{' '}
            to prefill your details.
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div
          className="reveal space-y-6"
          data-reveal
          style={{ '--reveal-delay': '80ms' }}
        >
          <fieldset className="rounded-2xl border border-zinc-200 bg-white p-5">
            <legend className="px-1 text-sm font-bold text-zinc-900">
              Contact
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-zinc-700 sm:col-span-2">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-rose-400"
                />
              </label>
              <label className="block text-sm font-medium text-zinc-700 sm:col-span-2">
                Full name
                <input
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-rose-400"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-zinc-200 bg-white p-5">
            <legend className="px-1 text-sm font-bold text-zinc-900">
              Shipping address
            </legend>
            <div className="grid gap-3">
              <label className="block text-sm font-medium text-zinc-700">
                Address
                <input
                  required
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-rose-400"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block text-sm font-medium text-zinc-700">
                  City
                  <input
                    required
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-rose-400"
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  ZIP
                  <input
                    required
                    value={form.zip}
                    onChange={(e) => update('zip', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-rose-400"
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Country
                  <select
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none focus:border-rose-400"
                  >
                    {shippingData.regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-zinc-200 bg-white p-5">
            <legend className="inline-flex items-center gap-1.5 px-1 text-sm font-bold text-zinc-900">
              <Truck className="h-4 w-4 text-rose-600" /> Shipping method
            </legend>
            <div className="space-y-2">
              {shippingData.methods.map((m) => {
                let priceLabel = `$${m.price.toFixed(2)}`
                if (m.freeOver != null && subtotal >= m.freeOver) {
                  priceLabel = 'Free'
                }
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      form.shipping === m.id
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={form.shipping === m.id}
                        onChange={() => update('shipping', m.id)}
                      />
                      <span>
                        <span className="font-semibold text-zinc-900">
                          {m.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-zinc-500">
                          {m.eta}
                        </span>
                      </span>
                    </span>
                    <span className="font-semibold">{priceLabel}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        <aside
          className="reveal h-fit rounded-2xl border border-zinc-200 bg-white p-6"
          data-reveal
          style={{ '--reveal-delay': '140ms' }}
        >
          <h2 className="m-0 flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-rose-600" /> Order summary
          </h2>
          <ul className="mt-4 mb-0 list-none space-y-3 border-b border-zinc-100 p-0 pb-4">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between gap-2 text-sm">
                <span className="text-zinc-600">
                  {i.name} × {i.qty}
                </span>
                <span className="font-semibold">
                  ${(i.price * i.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <label className="mt-4 block text-sm font-medium text-zinc-700">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" /> Promo code
            </span>
            <div className="mt-1 flex gap-2">
              <input
                value={form.promo}
                onChange={(e) => update('promo', e.target.value)}
                placeholder="WELCOME15"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-rose-400"
              />
            </div>
            {form.promo && form.promo.trim().toUpperCase() !== 'WELCOME15' && (
              <span className="mt-1 block text-xs text-zinc-400">
                Unknown code (try WELCOME15)
              </span>
            )}
            {discount > 0 && (
              <span className="mt-1 block text-xs font-semibold text-emerald-600">
                15% off applied
              </span>
            )}
          </label>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Subtotal</dt>
              <dd className="m-0">${subtotal.toFixed(2)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <dt>Discount</dt>
                <dd className="m-0">−${discount.toFixed(2)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-zinc-500">Shipping</dt>
              <dd className="m-0">
                {shipCost === 0 ? 'Free' : `$${shipCost.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between border-t border-zinc-100 pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd className="m-0">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            <CreditCard className="h-4 w-4" /> Place order
          </button>
          <p className="mt-3 mb-0 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-400">
            <Lock className="h-3 w-3" /> Demo checkout — no real payment
          </p>
        </aside>
      </form>
    </div>
  )
}

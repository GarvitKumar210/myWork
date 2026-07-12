import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  PackageOpen,
} from 'lucide-react'
import { useCart } from '../CartContext'
import { useReveal } from '../../shared/useReveal'

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, count } = useCart()
  useReveal([items.length, count])

  const shippingHint = subtotal >= 75 ? 0 : Math.max(0, 75 - subtotal)

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600">
          <ShoppingBag className="h-3.5 w-3.5" /> Your bag
        </p>
        <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
          Cart
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {count} item{count === 1 ? '' : 's'}
        </p>
      </div>

      {items.length === 0 ? (
        <div
          className="reveal mt-12 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center"
          data-reveal
          style={{ '--reveal-delay': '100ms' }}
        >
          <PackageOpen
            className="mx-auto h-10 w-10 text-zinc-300"
            strokeWidth={1.5}
          />
          <p className="m-0 mt-4 text-lg font-semibold text-zinc-800">
            Your cart is empty
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Browse the shop and add something you love.
          </p>
          <Link
            to="/examples/ecommerce/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-rose-500"
          >
            Continue shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="m-0 list-none space-y-4 p-0">
            {items.map((item, i) => (
              <li
                key={item.key}
                className="reveal hover-lift flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
                data-reveal
                style={{ '--reveal-delay': `${60 + i * 70}ms` }}
              >
                <Link
                  to={`/examples/ecommerce/product/${item.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/examples/ecommerce/product/${item.slug}`}
                        className="text-base font-semibold text-zinc-900 no-underline hover:text-rose-600"
                      >
                        {item.name}
                      </Link>
                      <p className="m-0 mt-1 text-sm text-zinc-500">
                        {[item.color, item.size].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <p className="m-0 text-base font-bold text-zinc-900">
                      ${item.price * item.qty}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-zinc-200">
                      <button
                        type="button"
                        className="px-2.5 py-1.5 text-zinc-600"
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="px-2.5 py-1.5 text-zinc-600"
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside
            className="reveal h-fit rounded-2xl border border-zinc-200 bg-white p-6"
            data-reveal
            style={{ '--reveal-delay': '120ms' }}
          >
            <h2 className="m-0 text-lg font-bold text-zinc-900">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Subtotal</dt>
                <dd className="m-0 font-semibold">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Shipping</dt>
                <dd className="m-0 font-semibold text-zinc-600">
                  {subtotal >= 75 ? 'Free' : 'Calculated at checkout'}
                </dd>
              </div>
            </dl>
            {shippingHint > 0 && (
              <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700">
                Add ${shippingHint.toFixed(2)} more for free standard shipping.
              </p>
            )}
            <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4 text-base font-bold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/examples/ecommerce/checkout"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-rose-600 py-3 text-sm font-semibold text-white no-underline transition hover:bg-rose-500"
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/examples/ecommerce/shop"
              className="mt-3 block text-center text-sm font-semibold text-zinc-600 no-underline hover:text-rose-600"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

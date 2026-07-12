import { Link } from 'react-router-dom'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function ShippingPage() {
  const { data, error, loading } = useBackendMany('ecommerce', [
    'shipping',
    'site',
  ])

  useReveal([data])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-rose-600">{error}</p>
    )
  }

  if (loading || !data) return <SoftLoader label="Loading…" />

  const { shipping, site } = data

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-rose-600">
          Policies
        </p>
        <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
          Shipping & returns
        </h1>
        <p className="mt-3 max-w-xl text-sm text-zinc-600">{shipping.returns}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {shipping.methods.map((m, i) => (
          <div
            key={m.id}
            className="reveal hover-lift rounded-2xl border border-zinc-200 bg-white p-5"
            data-reveal
            style={{ '--reveal-delay': `${80 + i * 90}ms` }}
          >
            <h2 className="m-0 text-lg font-bold text-zinc-900">{m.name}</h2>
            <p className="mt-1 mb-0 text-2xl font-bold text-rose-600">
              ${m.price.toFixed(2)}
            </p>
            <p className="mt-2 mb-0 text-sm text-zinc-500">{m.eta}</p>
            {m.freeOver != null && (
              <p className="mt-2 mb-0 text-xs font-semibold text-emerald-600">
                Free over ${m.freeOver}
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        className="reveal mt-12 rounded-2xl border border-zinc-200 bg-white p-6"
        data-reveal
        style={{ '--reveal-delay': '120ms' }}
      >
        <h2 className="m-0 text-xl font-bold text-zinc-900">FAQ</h2>
        <dl className="mt-6 space-y-5">
          {shipping.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-zinc-900">{item.q}</dt>
              <dd className="m-0 mt-1 text-sm leading-relaxed text-zinc-600">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="reveal mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-zinc-900 px-6 py-8"
        data-reveal
        style={{ '--reveal-delay': '160ms' }}
      >
        <div>
          <p className="m-0 text-lg font-bold text-white">Ready to order?</p>
          <p className="mt-1 mb-0 text-sm text-zinc-400">
            {site.promo.banner}
          </p>
        </div>
        <Link
          to="/examples/ecommerce/shop"
          className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-rose-500"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}

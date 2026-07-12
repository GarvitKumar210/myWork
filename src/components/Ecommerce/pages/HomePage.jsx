import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function HomePage() {
  const { data, error, loading } = useBackendMany('ecommerce', [
    'site',
    'products',
    'categories',
    'reviews',
  ])

  useReveal([data])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-rose-600">
        Could not load store: {error}
      </p>
    )
  }

  if (loading || !data) return <SoftLoader label="Loading store…" />

  const { site, products, categories, reviews } = data
  const featured = products.items.filter((p) => p.featured)
  const cats = categories.items.filter((c) => c.id !== 'all')
  const storeReviews = reviews.items.slice(0, 3)

  return (
    <div>
      <section className="relative min-h-[62vh] overflow-hidden">
        <img
          src="/images/ecommerce/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/55 to-transparent" />
        <div
          className="reveal relative mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-center px-5 py-20 sm:px-6"
          data-reveal
          style={{ '--reveal-delay': '80ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
            {site.tagline}
          </p>
          <h1 className="m-0 max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Dress the week, not the algorithm
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-200 sm:text-lg">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/examples/ecommerce/shop"
              className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-rose-500"
            >
              Shop collection
            </Link>
            <Link
              to="/examples/ecommerce/shop?category=footwear"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white no-underline backdrop-blur-sm transition hover:bg-white/20"
            >
              New sneakers
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div
          className="reveal mb-8 flex items-end justify-between"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
        >
          <h2 className="m-0 text-2xl font-bold text-zinc-900 sm:text-3xl">
            Shop by category
          </h2>
          <Link
            to="/examples/ecommerce/shop"
            className="text-sm font-semibold text-rose-600 no-underline hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/examples/ecommerce/shop?category=${cat.id}`}
              className="reveal hover-lift group relative aspect-[4/5] overflow-hidden rounded-2xl no-underline"
              data-reveal
              style={{ '--reveal-delay': `${80 + i * 90}ms` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="m-0 text-lg font-bold">{cat.name}</p>
                <p className="m-0 mt-0.5 text-sm text-zinc-200">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
          <div
            className="reveal mb-8"
            data-reveal
            style={{ '--reveal-delay': '0ms' }}
          >
            <p className="m-0 text-xs font-semibold uppercase tracking-wider text-rose-600">
              Featured
            </p>
            <h2 className="m-0 mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
              Staff picks this week
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={80 + i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div
          className="reveal mb-8"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
        >
          <h2 className="m-0 text-2xl font-bold text-zinc-900">
            What customers say
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {storeReviews.map((r, i) => (
            <blockquote
              key={r.id}
              className="reveal hover-lift m-0 rounded-2xl border border-zinc-200 bg-white p-5"
              data-reveal
              style={{ '--reveal-delay': `${80 + i * 90}ms` }}
            >
              <p className="m-0 text-sm font-semibold text-rose-600">
                {'★'.repeat(r.rating)}
              </p>
              <p className="mt-2 mb-0 text-base font-semibold text-zinc-900">
                {r.title}
              </p>
              <p className="mt-2 mb-0 text-sm leading-relaxed text-zinc-600">
                “{r.text}”
              </p>
              <footer className="mt-3 text-sm text-zinc-500">{r.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <div
          className="reveal overflow-hidden rounded-3xl bg-zinc-900 px-8 py-12 text-center sm:px-12"
          data-reveal
          style={{ '--reveal-delay': '60ms' }}
        >
          <p className="m-0 text-sm font-semibold text-rose-400">
            {site.promo.codeLabel}
          </p>
          <h2 className="m-0 mt-2 text-2xl font-bold text-white sm:text-3xl">
            Use code {site.promo.code} at checkout
          </h2>
          <Link
            to="/examples/ecommerce/shop"
            className="mt-6 inline-block rounded-full bg-rose-600 px-7 py-3 text-sm font-semibold text-white no-underline transition hover:bg-rose-500"
          >
            Start shopping
          </Link>
        </div>
      </section>
    </div>
  )
}

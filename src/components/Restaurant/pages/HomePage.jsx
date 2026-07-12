import { Link } from 'react-router-dom'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import { publicUrl } from '../../shared/publicUrl'

export default function HomePage() {
  const { data, error, loading } = useBackendMany('restaurant', [
    'site',
    'menu',
    'reviews',
  ])

  useReveal([data])

  if (error) {
    return (
      <p className="mx-auto max-w-5xl px-6 py-20 text-[#8b3a1a]">
        Could not load content: {error}
      </p>
    )
  }

  if (loading || !data) return <SoftLoader label="Loading…" />

  const { site, menu, reviews } = data
  const featured = menu.categories
    .flatMap((c) => c.items)
    .filter((item) => ['m1', 'm2', 'd1'].includes(item.id))

  return (
    <div>
      <section className="relative min-h-[70vh] overflow-hidden">
        <img
          src={publicUrl('images/restaurant/hero.jpg')}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover transition duration-[1.2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/90 via-[#2c1810]/45 to-[#2c1810]/25" />
        <div
          className="reveal relative mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-end px-5 pb-14 pt-28 sm:px-6"
          data-reveal
          style={{ '--reveal-delay': '80ms' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c4a8]">
            {site.tagline}
          </p>
          <h1 className="font-display m-0 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#f0e0d4] sm:text-lg">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/examples/restaurant/reserve"
              className="rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-[#a3360a] hover:shadow-lg"
            >
              Reserve a table
            </Link>
            <Link
              to="/examples/restaurant/menu"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white no-underline backdrop-blur-sm transition hover:bg-white/20"
            >
              View menu
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6">
        <div
          className="reveal mb-8 flex items-end justify-between gap-4"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
        >
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-wider text-[#c2410c]">
              From the fire
            </p>
            <h2 className="font-display m-0 mt-2 text-3xl font-semibold text-[#2c1810]">
              A few plates we love
            </h2>
          </div>
          <Link
            to="/examples/restaurant/menu"
            className="text-sm font-semibold text-[#8b3a1a] no-underline hover:underline"
          >
            Full menu →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {featured.map((item, i) => (
            <article
              key={item.id}
              className="reveal hover-lift overflow-hidden rounded-2xl border border-[#e8d9cc] bg-white shadow-sm"
              data-reveal
              style={{ '--reveal-delay': `${80 + i * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="m-0 text-base font-semibold text-[#2c1810]">
                    {item.name}
                  </h3>
                  <span className="shrink-0 text-sm font-semibold text-[#c2410c]">
                    ${item.price}
                  </span>
                </div>
                <p className="mt-2 mb-0 text-sm leading-relaxed text-[#6b4f42]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e8d9cc] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6">
          <div
            className="reveal"
            data-reveal
            style={{ '--reveal-delay': '0ms' }}
          >
            <p className="m-0 text-xs font-semibold uppercase tracking-wider text-[#c2410c]">
              Guests say
            </p>
            <h2 className="font-display m-0 mt-2 text-3xl font-semibold text-[#2c1810]">
              {reviews.average} ★ · {reviews.count} reviews
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reviews.items.slice(0, 4).map((r, i) => (
              <blockquote
                key={r.id}
                className="reveal hover-lift m-0 rounded-2xl border border-[#e8d9cc] bg-[#faf6f1] p-5"
                data-reveal
                style={{ '--reveal-delay': `${80 + i * 90}ms` }}
              >
                <p className="m-0 text-sm leading-relaxed text-[#4a3428]">
                  “{r.text}”
                </p>
                <footer className="mt-3 text-sm font-semibold text-[#8b3a1a]">
                  {r.name}{' '}
                  <span className="font-normal text-[#8a6f60]">
                    · {'★'.repeat(r.rating)}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6">
        <div
          className="reveal grid items-center gap-8 overflow-hidden rounded-3xl bg-[#2c1810] sm:grid-cols-2"
          data-reveal
          style={{ '--reveal-delay': '60ms' }}
        >
          <div className="p-8 sm:p-10">
            <h2 className="font-display m-0 text-2xl font-semibold text-[#f5ebe3] sm:text-3xl">
              Join us this week
            </h2>
            <p className="mt-3 mb-6 text-sm leading-relaxed text-[#c4a994]">
              {site.address.street}, {site.address.city} · {site.phone}
            </p>
            <ul className="mb-6 list-none space-y-1 p-0 text-sm text-[#c4a994]">
              {site.hours.slice(0, 3).map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
            <Link
              to="/examples/restaurant/reserve"
              className="inline-block rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-[#a3360a]"
            >
              Make a reservation
            </Link>
          </div>
          <div className="min-h-[220px] sm:min-h-full">
            <img
              src={publicUrl('images/restaurant/interior.jpg')}
              alt="Dining room"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

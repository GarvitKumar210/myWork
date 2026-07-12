import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Flame,
  Zap,
  Dumbbell,
  Star,
} from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import { publicUrl } from '../../shared/publicUrl'

export default function HomePage() {
  const { data, error, loading } = useBackendMany('gym', [
    'site',
    'classes',
    'trainers',
    'memberships',
    'reviews',
  ])

  useReveal([data])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-lime-400">{error}</p>
    )
  }

  if (loading || !data) return <SoftLoader label="Loading gym…" className="text-lime-400" />

  const { site, classes, trainers, memberships, reviews } = data
  const featured = classes.items.filter((c) => c.featured).slice(0, 3)
  const coaches = trainers.items.slice(0, 3)
  const plan = memberships.plans.find((p) => p.featured) ?? memberships.plans[1]

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[78vh] overflow-hidden">
        <img
          src={publicUrl('images/gym/hero.jpg')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
        <div
          className="reveal relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-5 py-20 sm:px-6"
          data-reveal
          style={{ '--reveal-delay': '60ms' }}
        >
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
            <Flame className="h-3.5 w-3.5" /> {site.tagline}
          </p>
          <h1 className="font-display m-0 max-w-2xl text-5xl font-bold uppercase leading-[0.95] tracking-wide text-white sm:text-6xl md:text-7xl">
            Earn the burn.
            <br />
            Own the floor.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-300 sm:text-lg">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/examples/gym/join"
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-neutral-950 no-underline transition hover:bg-lime-300"
            >
              Start free week <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/examples/gym/classes"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white no-underline backdrop-blur-sm transition hover:bg-white/10"
            >
              View classes
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-lime-400/10 bg-neutral-900/80">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-lime-400/10 sm:grid-cols-4">
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal bg-neutral-950 px-5 py-8 text-center"
              data-reveal
              style={{ '--reveal-delay': `${i * 60}ms` }}
            >
              <p className="font-display m-0 text-3xl font-bold text-lime-400 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 mb-0 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured classes */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div
          className="reveal mb-8 flex items-end justify-between gap-4"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
        >
          <div>
            <p className="m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400">
              <Dumbbell className="h-3.5 w-3.5" /> Classes
            </p>
            <h2 className="font-display m-0 mt-2 text-3xl font-bold uppercase text-white sm:text-4xl">
              What we program
            </h2>
          </div>
          <Link
            to="/examples/gym/classes"
            className="text-sm font-semibold text-lime-400 no-underline hover:underline"
          >
            All classes →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {featured.map((c, i) => (
            <article
              key={c.id}
              className="reveal hover-lift overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
              data-reveal
              style={{ '--reveal-delay': `${80 + i * 90}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="m-0 text-xs font-bold uppercase tracking-wide text-lime-400">
                  {c.category} · {c.duration} min
                </p>
                <h3 className="font-display m-0 mt-1 text-xl font-bold uppercase text-white">
                  {c.name}
                </h3>
                <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-400">
                  {c.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trainers strip */}
      <section className="border-y border-neutral-800 bg-neutral-900/50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
          <div
            className="reveal mb-8 flex items-end justify-between"
            data-reveal
            style={{ '--reveal-delay': '0ms' }}
          >
            <h2 className="font-display m-0 text-3xl font-bold uppercase text-white">
              Coaches
            </h2>
            <Link
              to="/examples/gym/trainers"
              className="text-sm font-semibold text-lime-400 no-underline hover:underline"
            >
              Meet the team →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {coaches.map((t, i) => (
              <article
                key={t.id}
                className="reveal hover-lift overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950"
                data-reveal
                style={{ '--reveal-delay': `${80 + i * 80}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="m-0 text-lg font-bold text-white">{t.name}</h3>
                  <p className="m-0 mt-0.5 text-sm text-lime-400">{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA + reviews */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            className="reveal rounded-3xl border border-lime-400/30 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8"
            data-reveal
            style={{ '--reveal-delay': '60ms' }}
          >
            <p className="m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400">
              <Zap className="h-3.5 w-3.5" /> Featured plan
            </p>
            <h2 className="font-display m-0 mt-2 text-3xl font-bold uppercase text-white">
              {plan.name}
            </h2>
            <p className="mt-3 mb-0">
              <span className="font-display text-4xl font-bold text-lime-400">
                ${plan.price}
              </span>
              <span className="text-neutral-500"> / {plan.period}</span>
            </p>
            <ul className="mt-5 mb-6 list-none space-y-2 p-0">
              {plan.features.map((f) => (
                <li key={f} className="text-sm text-neutral-300">
                  <span className="mr-2 text-lime-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/examples/gym/membership"
              className="inline-flex rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-neutral-950 no-underline hover:bg-lime-300"
            >
              See all plans
            </Link>
          </div>

          <div
            className="reveal space-y-4"
            data-reveal
            style={{ '--reveal-delay': '120ms' }}
          >
            <p className="m-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400">
              <Star className="h-3.5 w-3.5 fill-lime-400" /> {reviews.average} ·{' '}
              {reviews.count} reviews
            </p>
            {reviews.items.slice(0, 3).map((r) => (
              <blockquote
                key={r.id}
                className="m-0 rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
              >
                <p className="m-0 text-sm leading-relaxed text-neutral-300">
                  “{r.text}”
                </p>
                <footer className="mt-2 text-sm font-semibold text-lime-400">
                  {r.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

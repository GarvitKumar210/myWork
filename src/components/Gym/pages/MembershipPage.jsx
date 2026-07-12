import { Link } from 'react-router-dom'
import { Check, Sparkles } from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function MembershipPage() {
  const { data, error, loading } = useBackendMany('gym', [
    'memberships',
    'site',
  ])
  useReveal([data])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-lime-400">{error}</p>
    )
  }

  if (loading || !data) {
    return <SoftLoader label="Loading plans…" className="text-lime-400" />
  }

  const { memberships, site } = data

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal text-center" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-lime-400">
          Pricing
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-bold uppercase text-white sm:text-5xl">
          Membership
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
          {site.promo}
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {memberships.plans.map((plan, i) => (
          <article
            key={plan.id}
            className={`reveal hover-lift flex flex-col rounded-2xl border p-6 ${
              plan.featured
                ? 'border-lime-400 bg-neutral-900 shadow-[0_0_40px_rgba(163,230,53,0.12)]'
                : 'border-neutral-800 bg-neutral-900/80'
            }`}
            data-reveal
            style={{ '--reveal-delay': `${60 + i * 80}ms` }}
          >
            {plan.featured && (
              <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-lime-400 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase text-neutral-950">
                <Sparkles className="h-3 w-3" /> Popular
              </span>
            )}
            <h2 className="font-display m-0 text-xl font-bold uppercase text-white">
              {plan.name}
            </h2>
            <p className="mt-3 mb-0">
              <span className="font-display text-4xl font-bold text-lime-400">
                ${plan.price}
              </span>
              <span className="text-sm text-neutral-500"> / {plan.period}</span>
            </p>
            {plan.billed && (
              <p className="mt-1 mb-0 text-xs text-neutral-500">{plan.billed}</p>
            )}
            <ul className="mt-5 mb-6 flex-1 list-none space-y-2.5 p-0">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-2 text-sm text-neutral-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/examples/gym/join"
              state={{ plan: plan.name }}
              className={`block rounded-full py-2.5 text-center text-sm font-bold no-underline transition ${
                plan.featured
                  ? 'bg-lime-400 text-neutral-950 hover:bg-lime-300'
                  : 'border border-neutral-600 text-white hover:border-lime-400 hover:text-lime-400'
              }`}
            >
              Choose plan
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {memberships.perks.map((p, i) => (
          <div
            key={p.title}
            className="reveal rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
            data-reveal
            style={{ '--reveal-delay': `${80 + i * 70}ms` }}
          >
            <h3 className="m-0 text-base font-bold text-lime-400">{p.title}</h3>
            <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-400">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

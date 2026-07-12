const plans = [
  {
    name: 'Starter',
    price: '$0',
    note: 'For solo trials',
    features: ['Up to 3 projects', 'Basic board', 'Email support'],
    cta: 'Try free',
    highlight: false,
  },
  {
    name: 'Team',
    price: '$19',
    note: 'per seat / month',
    features: ['Unlimited projects', 'Shared dashboards', 'Priority support'],
    cta: 'Start trial',
    highlight: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-indigo-50 bg-indigo-50/40">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div
          className="reveal text-center"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
        >
          <h2 className="m-0 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Simple pricing
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Start free. Upgrade when the team is ready.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
          {plans.map((plan, i) => (
            <article
              key={plan.name}
              className={`reveal hover-lift rounded-2xl border bg-white p-6 ${
                plan.highlight
                  ? 'border-indigo-300 shadow-lg shadow-indigo-100'
                  : 'border-slate-200'
              }`}
              data-reveal
              style={{ '--reveal-delay': `${100 + i * 140}ms` }}
            >
              <h3 className="m-0 text-lg font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-3 mb-0 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-500">{plan.note}</span>
              </p>
              <ul className="mt-5 mb-6 list-none space-y-2 p-0">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <span className="text-indigo-500" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#top"
                className={`block rounded-full py-2.5 text-center text-sm font-semibold no-underline transition ${
                  plan.highlight
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

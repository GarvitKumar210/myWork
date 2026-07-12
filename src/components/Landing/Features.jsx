import { FeatureIcon } from './Illustrations'

const features = [
  {
    name: 'flow',
    title: 'Clear priorities',
    desc: 'See what matters this week without digging through boards and chats.',
  },
  {
    name: 'sync',
    title: 'Stay in sync',
    desc: 'Updates land in one place so handoffs stop getting lost in threads.',
  },
  {
    name: 'shield',
    title: 'Safe by default',
    desc: 'Roles and access that keep client work private without extra setup.',
  },
]

export default function Features() {
  return (
    <section id="features" className="border-t border-indigo-50 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div
          className="reveal max-w-lg"
          data-reveal
          style={{ '--reveal-delay': '0ms' }}
        >
          <h2 className="m-0 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Built for teams who want less noise
          </h2>
          <p className="mt-3 text-slate-600">
            Three things NovaFlow does well — nothing more, nothing fluff.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-3">
          {features.map((f, i) => (
            <li
              key={f.title}
              className="reveal hover-lift rounded-2xl border border-slate-100 bg-slate-50/80 p-6"
              data-reveal
              style={{ '--reveal-delay': `${100 + i * 120}ms` }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <FeatureIcon name={f.name} className="h-5 w-5" />
              </div>
              <h3 className="m-0 text-base font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 mb-0 text-sm leading-relaxed text-slate-600">
                {f.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

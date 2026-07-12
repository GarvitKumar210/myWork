import { Award } from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function TrainersPage() {
  const { data, error, loading } = useBackend('gym', 'trainers')
  useReveal([data])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-lime-400">{error}</p>
    )
  }

  if (loading || !data) {
    return <SoftLoader label="Loading coaches…" className="text-lime-400" />
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-lime-400">
          Team
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-bold uppercase text-white sm:text-5xl">
          Trainers
        </h1>
        <p className="mt-3 max-w-lg text-sm text-neutral-400">
          Coaches who program, cue, and push — not just film content.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((t, i) => (
          <article
            key={t.id}
            className="reveal hover-lift overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
            data-reveal
            style={{ '--reveal-delay': `${60 + i * 70}ms` }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h2 className="m-0 text-xl font-bold text-white">{t.name}</h2>
              <p className="m-0 mt-1 text-sm font-semibold text-lime-400">
                {t.role}
              </p>
              <p className="mt-1 mb-0 text-xs uppercase tracking-wide text-neutral-500">
                {t.specialty} · {t.years} yrs
              </p>
              <p className="mt-3 mb-3 text-sm leading-relaxed text-neutral-400">
                {t.bio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {t.certs.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-2.5 py-0.5 text-[0.65rem] font-semibold text-neutral-400"
                  >
                    <Award className="h-3 w-3 text-lime-400" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

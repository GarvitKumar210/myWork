import { useMemo, useState } from 'react'
import { Clock, Gauge, User } from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

const filters = ['All', 'Strength', 'HIIT', 'Recovery']

export default function ClassesPage() {
  const { data, error, loading } = useBackend('gym', 'classes')
  const [filter, setFilter] = useState('All')

  const list = useMemo(() => {
    if (!data) return []
    if (filter === 'All') return data.items
    return data.items.filter((c) => c.category === filter)
  }, [data, filter])

  useReveal([data, filter, list.length])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-lime-400">{error}</p>
    )
  }

  if (loading || !data) {
    return <SoftLoader label="Loading classes…" className="text-lime-400" />
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-lime-400">
          Programming
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-bold uppercase text-white sm:text-5xl">
          Classes
        </h1>
        <p className="mt-3 max-w-lg text-sm text-neutral-400">
          Strength, conditioning, and recovery — coached sessions every week.
        </p>
      </div>

      <div
        className="reveal mt-8 flex flex-wrap gap-2"
        data-reveal
        style={{ '--reveal-delay': '60ms' }}
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              filter === f
                ? 'border-lime-400 bg-lime-400 text-neutral-950'
                : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-lime-400/40'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <article
            key={c.id}
            className="reveal hover-lift overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
            data-reveal
            style={{ '--reveal-delay': `${40 + (i % 6) * 50}ms` }}
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
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-lime-400">
                  {c.category}
                </span>
                <span className="text-xs text-neutral-500">{c.level}</span>
              </div>
              <h2 className="font-display m-0 mt-1 text-xl font-bold uppercase text-white">
                {c.name}
              </h2>
              <p className="mt-2 mb-3 text-sm leading-relaxed text-neutral-400">
                {c.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {c.duration} min
                </span>
                <span className="inline-flex items-center gap-1">
                  <Gauge className="h-3.5 w-3.5" /> Intensity {c.intensity}/5
                </span>
                <span className="inline-flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> {c.coach}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

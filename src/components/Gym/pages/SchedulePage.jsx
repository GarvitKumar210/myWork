import { useMemo, useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function SchedulePage() {
  const { data, error, loading } = useBackend('gym', 'schedule')
  const [day, setDay] = useState('Mon')

  const slots = useMemo(() => {
    if (!data) return []
    return data.slots.filter((s) => s.day === day)
  }, [data, day])

  useReveal([data, day, slots.length])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-lime-400">{error}</p>
    )
  }

  if (loading || !data) {
    return <SoftLoader label="Loading schedule…" className="text-lime-400" />
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-lime-400">
          This week
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-bold uppercase text-white sm:text-5xl">
          Schedule
        </h1>
        <p className="mt-3 max-w-lg text-sm text-neutral-400">
          Demo timetable — book holds are not real.
        </p>
      </div>

      <div
        className="reveal mt-8 flex flex-wrap gap-2"
        data-reveal
        style={{ '--reveal-delay': '60ms' }}
      >
        {data.days.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDay(d)}
            className={`min-w-[3.25rem] rounded-full border px-3 py-2 text-sm font-bold transition ${
              day === d
                ? 'border-lime-400 bg-lime-400 text-neutral-950'
                : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-lime-400/40'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <ul className="mt-8 list-none space-y-3 p-0">
        {slots.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-neutral-700 px-5 py-10 text-center text-neutral-500">
            No classes scheduled for {day}.
          </li>
        ) : (
          slots.map((s, i) => (
            <li
              key={s.id}
              className="reveal hover-lift flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4"
              data-reveal
              style={{ '--reveal-delay': `${40 + i * 50}ms` }}
            >
              <div>
                <p className="m-0 flex items-center gap-2 text-sm font-semibold text-lime-400">
                  <Clock className="h-3.5 w-3.5" /> {s.time}
                </p>
                <h2 className="font-display m-0 mt-1 text-xl font-bold uppercase text-white">
                  {s.className}
                </h2>
                <p className="m-0 mt-1 text-sm text-neutral-400">
                  {s.coach} ·{' '}
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {s.room}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-lime-400/50 px-4 py-2 text-sm font-bold text-lime-400 transition hover:bg-lime-400 hover:text-neutral-950"
              >
                Hold spot
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

const emptyForm = {
  name: '',
  email: '',
  date: '',
  time: '',
  partySize: '2',
  occasion: 'Regular dinner',
  notes: '',
}

export default function ReservePage() {
  const { data, error, loading } = useBackendMany('restaurant', [
    'reservations',
    'site',
  ])
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(null)

  useEffect(() => {
    if (!data) return
    setForm((f) => ({
      ...f,
      time: f.time || data.reservations.timeSlots[2] || '',
      occasion: f.occasion || data.reservations.occasions[0],
    }))
  }, [data])

  useReveal([data, submitted])

  if (error) {
    return (
      <p className="mx-auto max-w-5xl px-6 py-20 text-[#8b3a1a]">
        Could not load reservations: {error}
      </p>
    )
  }

  if (loading || !data) return <SoftLoader label="Loading…" />

  const { reservations, site } = data

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted({
      ...form,
      id: `local-${Date.now()}`,
      status: 'confirmed (demo)',
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-[#c2410c]">
          Book a table
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-semibold text-[#2c1810]">
          Reservations
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#6b4f42]">
          {reservations.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          className="reveal"
          data-reveal
          style={{ '--reveal-delay': '100ms' }}
        >
          {submitted ? (
            <div className="rounded-2xl border border-[#c4a994] bg-white p-6">
              <h2 className="font-display m-0 text-2xl font-semibold text-[#8b3a1a]">
                You are on the list
              </h2>
              <p className="mt-3 mb-0 text-sm leading-relaxed text-[#5c4033]">
                Thanks, <strong>{submitted.name}</strong>. We have a table for{' '}
                {submitted.partySize} on {submitted.date} at {submitted.time}.
                Status: {submitted.status}.
              </p>
              <p className="mt-2 text-sm text-[#6b4f42]">
                Demo only — nothing was sent to a real kitchen.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(null)
                  setForm(emptyForm)
                }}
                className="mt-6 rounded-full bg-[#8b3a1a] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Book another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-[#e8d9cc] bg-white p-6 shadow-sm"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-[#4a3428]">
                  Name
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                  />
                </label>
                <label className="block text-sm font-medium text-[#4a3428]">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block text-sm font-medium text-[#4a3428]">
                  Date
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                  />
                </label>
                <label className="block text-sm font-medium text-[#4a3428]">
                  Time
                  <select
                    required
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                  >
                    {reservations.timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-[#4a3428]">
                  Party size
                  <select
                    value={form.partySize}
                    onChange={(e) => update('partySize', e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                  >
                    {reservations.partySizes.map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm font-medium text-[#4a3428]">
                Occasion
                <select
                  value={form.occasion}
                  onChange={(e) => update('occasion', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                >
                  {reservations.occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-[#4a3428]">
                Notes
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder="Allergies, high chair, celebration cake…"
                  className="mt-1 w-full resize-y rounded-xl border border-[#e8d9cc] bg-[#faf6f1] px-3 py-2.5 text-sm outline-none focus:border-[#c2410c]"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-[#c2410c] py-3 text-sm font-semibold text-white hover:bg-[#a3360a] sm:w-auto sm:px-8"
              >
                Confirm reservation
              </button>
              <p className="m-0 text-xs text-[#8a6f60]">
                {reservations.largePartyNote}
              </p>
            </form>
          )}
        </div>

        <aside
          className="reveal space-y-6"
          data-reveal
          style={{ '--reveal-delay': '180ms' }}
        >
          <div className="hover-lift rounded-2xl border border-[#e8d9cc] bg-white p-5">
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-[#8b3a1a]">
              Policies
            </h2>
            <ul className="mt-3 mb-0 list-disc space-y-2 pl-4 text-sm text-[#6b4f42]">
              {reservations.policies.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#e8d9cc] bg-white p-5">
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-[#8b3a1a]">
              Tonight&apos;s book (sample)
            </h2>
            <ul className="mt-3 mb-0 list-none space-y-3 p-0">
              {reservations.sampleBookings.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-2 border-b border-[#f0e6dc] pb-2 text-sm last:border-0"
                >
                  <span className="text-[#4a3428]">
                    {b.time} · {b.partySize} pax
                  </span>
                  <span className="text-xs font-semibold uppercase text-[#c2410c]">
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 mb-0 text-xs text-[#8a6f60]">
              From reservations.json · {site.phone}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

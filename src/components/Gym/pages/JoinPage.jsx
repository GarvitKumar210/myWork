import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CheckCircle2, Send } from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

const empty = {
  name: '',
  email: '',
  phone: '',
  plan: '',
  goals: '',
  experience: 'Beginner',
}

export default function JoinPage() {
  const location = useLocation()
  const preselected = location.state?.plan || ''
  const { data, error, loading } = useBackendMany('gym', [
    'memberships',
    'site',
  ])
  const [form, setForm] = useState({ ...empty, plan: preselected })
  const [submitted, setSubmitted] = useState(null)

  useReveal([data, submitted])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-lime-400">{error}</p>
    )
  }

  if (loading || !data) {
    return <SoftLoader label="Loading…" className="text-lime-400" />
  }

  const { memberships, site } = data

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted({
      ...form,
      id: `IP-${Date.now().toString().slice(-6)}`,
    })
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center sm:px-6">
        <CheckCircle2
          className="mx-auto h-14 w-14 text-lime-400"
          strokeWidth={1.5}
        />
        <h1 className="font-display m-0 mt-4 text-3xl font-bold uppercase text-white">
          You&apos;re on the list
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Thanks, <strong className="text-white">{submitted.name}</strong>. Ref{' '}
          <strong className="text-lime-400">{submitted.id}</strong>
          {submitted.plan ? ` · ${submitted.plan}` : ''}. Demo only — nothing was
          sent.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/examples/gym/schedule"
            className="rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-neutral-950 no-underline"
          >
            See schedule
          </Link>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null)
              setForm({ ...empty, plan: preselected })
            }}
            className="rounded-full border border-neutral-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-lime-400">
          Start training
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-bold uppercase text-white sm:text-5xl">
          Join IRONPULSE
        </h1>
        <p className="mt-3 max-w-lg text-sm text-neutral-400">
          {site.promo} · {site.phone}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="reveal mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
        data-reveal
        style={{ '--reveal-delay': '80ms' }}
      >
        <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-neutral-300">
              Name
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-400"
              />
            </label>
            <label className="block text-sm font-medium text-neutral-300">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-400"
              />
            </label>
          </div>
          <label className="block text-sm font-medium text-neutral-300">
            Phone
            <input
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-400"
            />
          </label>
          <label className="block text-sm font-medium text-neutral-300">
            Plan interest
            <select
              value={form.plan}
              onChange={(e) => update('plan', e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-400"
            >
              <option value="">Not sure yet</option>
              {memberships.plans.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} — ${p.price}/{p.period}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-neutral-300">
            Experience
            <select
              value={form.experience}
              onChange={(e) => update('experience', e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-400"
            >
              {['Beginner', 'Intermediate', 'Advanced', 'Competitive'].map(
                (x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ),
              )}
            </select>
          </label>
          <label className="block text-sm font-medium text-neutral-300">
            Goals
            <textarea
              rows={3}
              value={form.goals}
              onChange={(e) => update('goals', e.target.value)}
              placeholder="Strength, fat loss, competition prep…"
              className="mt-1 w-full resize-y rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-400"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-3 text-sm font-bold text-neutral-950 transition hover:bg-lime-300 sm:w-auto sm:px-8"
          >
            <Send className="h-4 w-4" /> Submit application
          </button>
        </div>

        <aside className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="font-display m-0 text-xl font-bold uppercase text-white">
            What happens next
          </h2>
          <ol className="mt-4 mb-0 list-decimal space-y-3 pl-5 text-sm text-neutral-400">
            <li>We confirm your free intro week (demo).</li>
            <li>You tour the floor and meet a coach.</li>
            <li>Pick a plan and start training.</li>
          </ol>
          <p className="mt-6 mb-0 text-xs text-neutral-600">
            {site.address.street}, {site.address.city} · {site.email}
          </p>
        </aside>
      </form>
    </div>
  )
}

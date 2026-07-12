import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../AuthContext'
import { useReveal } from '../../shared/useReveal'

export default function RegisterPage() {
  const { register, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useReveal([])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await register({ name, email, password })
      navigate('/examples/ecommerce/account', { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setBusy(false)
    }
  }

  if (isLoggedIn) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center">
        <p className="text-zinc-600">You already have an active session.</p>
        <Link
          to="/examples/ecommerce/account"
          className="mt-4 inline-block font-semibold text-rose-600"
        >
          Open account
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-5 py-12 sm:px-6 sm:py-16">
      <div
        className="reveal text-center"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <UserPlus className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h1 className="m-0 mt-4 text-3xl font-bold text-zinc-900">
          Create account
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Demo registration — stored in this browser only.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="reveal mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        data-reveal
        style={{ '--reveal-delay': '80ms' }}
      >
        {error && (
          <p className="m-0 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-zinc-700">
          Full name
          <div className="relative mt-1">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-rose-400"
              autoComplete="name"
            />
          </div>
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Email
          <div className="relative mt-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-rose-400"
              autoComplete="email"
            />
          </div>
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Password
          <div className="relative mt-1">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-rose-400"
              autoComplete="new-password"
            />
          </div>
          <span className="mt-1 block text-xs text-zinc-400">
            At least 6 characters
          </span>
        </label>

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
        >
          {busy ? 'Creating…' : 'Create account'}
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="m-0 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link
            to="/examples/ecommerce/login"
            className="font-semibold text-rose-600 no-underline hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

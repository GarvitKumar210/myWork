import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../AuthContext'
import { useReveal } from '../../shared/useReveal'

export default function LoginPage() {
  const { login, isLoggedIn, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/examples/ecommerce/account'

  const [email, setEmail] = useState('demo@shoply.demo')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useReveal([isLoggedIn])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  if (isLoggedIn) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center sm:px-6">
        <LogIn className="mx-auto h-10 w-10 text-rose-600" strokeWidth={1.75} />
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">
          You&apos;re signed in
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Welcome back, {user.name}.
        </p>
        <Link
          to="/examples/ecommerce/account"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white no-underline"
        >
          Go to account <ArrowRight className="h-4 w-4" />
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
          <LogIn className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h1 className="m-0 mt-4 text-3xl font-bold text-zinc-900">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Demo account prefilled — or use one you registered.
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-rose-400"
              autoComplete="current-password"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="m-0 text-center text-sm text-zinc-500">
          New here?{' '}
          <Link
            to="/examples/ecommerce/register"
            className="font-semibold text-rose-600 no-underline hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}

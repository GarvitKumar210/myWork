import { useMemo, useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import TableScroll from '../TableScroll'

const statusStyle = {
  active: 'bg-emerald-50 text-emerald-700',
  suspended: 'bg-rose-50 text-rose-700',
  invited: 'bg-amber-50 text-amber-700',
}

export default function UsersPage() {
  const { data, error, loading } = useBackend('admin', 'users')
  const [q, setQ] = useState('')
  const [role, setRole] = useState('All')

  const list = useMemo(() => {
    if (!data) return []
    return data.items.filter((u) => {
      const matchQ =
        !q.trim() ||
        u.name.toLowerCase().includes(q.toLowerCase()) ||
        u.email.toLowerCase().includes(q.toLowerCase())
      const matchRole = role === 'All' || u.role === role
      return matchQ && matchRole
    })
  }, [data, q, role])

  const roles = useMemo(() => {
    if (!data) return ['All']
    return ['All', ...new Set(data.items.map((u) => u.role))]
  }, [data])

  useReveal([data, list.length, role])

  if (error) return <p className="text-sky-700">{error}</p>
  if (loading || !data) {
    return (
      <div className="admin-page">
        <SoftLoader label="Loading users…" />
      </div>
    )
  }

  return (
    <div className="admin-page gap-3">
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-sm text-slate-500">
          {list.length} user{list.length === 1 ? '' : 's'}
        </p>
        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:flex-initial">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or email…"
              className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none sm:w-48"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none sm:flex-initial"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky-500"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden min-[400px]:inline">Invite</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <TableScroll>
          <table className="min-w-[40rem] text-left text-sm sm:min-w-[44rem]">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  User
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Orders
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Spent
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <p className="m-0 font-medium text-slate-900">{u.name}</p>
                    <p className="m-0 text-xs text-slate-500">{u.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-5">
                    {u.role}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        statusStyle[u.status] ?? 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-5">
                    {u.orders}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900 sm:px-5">
                    ${u.spent.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 sm:px-5">
                    {u.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      </div>
    </div>
  )
}

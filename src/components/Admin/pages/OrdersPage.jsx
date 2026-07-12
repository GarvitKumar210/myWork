import { useMemo, useState } from 'react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import TableScroll from '../TableScroll'

const statusStyle = {
  fulfilled: 'bg-emerald-50 text-emerald-700',
  processing: 'bg-sky-50 text-sky-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  pending: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-rose-50 text-rose-700',
}

export default function OrdersPage() {
  const { data, error, loading } = useBackend('admin', 'orders')
  const [status, setStatus] = useState('all')

  const list = useMemo(() => {
    if (!data) return []
    if (status === 'all') return data.items
    return data.items.filter((o) => o.status === status)
  }, [data, status])

  const statuses = useMemo(() => {
    if (!data) return ['all']
    return ['all', ...new Set(data.items.map((o) => o.status))]
  }, [data])

  useReveal([data, status, list.length])

  if (error) return <p className="text-sky-700">{error}</p>
  if (loading || !data) {
    return (
      <div className="admin-page">
        <SoftLoader label="Loading orders…" />
      </div>
    )
  }

  const total = list.reduce((n, o) => n + o.total, 0)

  return (
    <div className="admin-page gap-3">
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-sm text-slate-500">
          {list.length} orders · ${total.toLocaleString()} total
        </p>
        <div className="flex max-w-full flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                status === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
        <TableScroll>
          <table className="min-w-[44rem] text-left text-sm sm:min-w-[48rem]">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Order
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Customer
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Items
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Channel
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Total
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900 sm:px-5">
                    {o.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <p className="m-0 text-slate-900">{o.customer}</p>
                    <p className="m-0 text-xs text-slate-500">{o.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-5">
                    {o.items}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600 sm:px-5">
                    {o.channel}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900 sm:px-5">
                    ${o.total}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        statusStyle[o.status] ?? 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500 sm:px-5">
                    {o.date}
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

import { Link } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  AlertTriangle,
  Activity,
  ArrowRight,
} from 'lucide-react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import TableScroll from '../TableScroll'

const activityIcon = {
  order: Package,
  user: Users,
  alert: AlertTriangle,
  system: Activity,
}

const statusColor = {
  fulfilled: 'bg-emerald-50 text-emerald-700',
  processing: 'bg-sky-50 text-sky-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  pending: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-rose-50 text-rose-700',
}

export default function DashboardPage() {
  const { data, error, loading } = useBackendMany('admin', [
    'stats',
    'activity',
    'orders',
  ])

  useReveal([data])

  if (error) {
    return (
      <div className="admin-page">
        <p className="text-sky-700">{error}</p>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="admin-page">
        <SoftLoader label="Loading dashboard…" />
      </div>
    )
  }

  const { stats, activity, orders } = data
  const maxRev = Math.max(...stats.chart.revenue)

  return (
    <div className="admin-page gap-3">
      {/* KPIs — fixed, no scroll */}
      <div className="grid shrink-0 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
        {stats.kpis.map((kpi) => {
          const up = kpi.change >= 0
          return (
            <div
              key={kpi.id}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <p className="m-0 text-xs font-medium text-slate-500 sm:text-sm">
                {kpi.label}
              </p>
              <p className="m-0 mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                {kpi.value}
              </p>
              <p
                className={`mt-1 mb-0 flex items-center gap-1 text-[0.65rem] font-semibold sm:text-xs ${
                  up ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {up ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {up ? '+' : ''}
                {kpi.change}%
              </p>
            </div>
          )
        })}
      </div>

      {/* Chart + activity — fixed height, no page scroll */}
      <div className="grid min-h-0 shrink-0 gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="m-0 text-sm font-semibold text-slate-900 sm:text-base">
              Weekly revenue
            </h2>
            <Link
              to="/examples/admin/analytics"
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 no-underline hover:underline sm:text-sm"
            >
              Analytics <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="flex h-28 min-w-0 items-end gap-1.5 sm:h-32 sm:gap-2">
            {stats.chart.labels.map((label, i) => {
              const h = (stats.chart.revenue[i] / maxRev) * 100
              return (
                <div
                  key={label}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1"
                >
                  <div
                    className="w-full max-w-full rounded-t-md bg-sky-500/90"
                    style={{ height: `${h}%`, minHeight: 6 }}
                    title={`$${stats.chart.revenue[i].toLocaleString()}`}
                  />
                  <span className="text-[0.6rem] font-medium text-slate-400">
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <h2 className="m-0 mb-2 text-sm font-semibold text-slate-900 sm:text-base">
            Recent activity
          </h2>
          <ul className="m-0 list-none space-y-2 p-0">
            {activity.items.slice(0, 4).map((a) => {
              const Icon = activityIcon[a.type] ?? Activity
              return (
                <li key={a.id} className="flex gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-xs font-medium text-slate-900 sm:text-sm">
                      {a.title}
                    </p>
                    <p className="m-0 truncate text-[0.65rem] text-slate-500">
                      {a.detail}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Only this table scrolls */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-2.5 sm:px-5">
          <h2 className="m-0 text-sm font-semibold text-slate-900 sm:text-base">
            Latest orders
          </h2>
          <Link
            to="/examples/admin/orders"
            className="text-xs font-medium text-sky-600 no-underline hover:underline sm:text-sm"
          >
            View all
          </Link>
        </div>
        <TableScroll>
          <table className="min-w-[32rem] text-left text-sm sm:min-w-[36rem]">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Order
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Customer
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Total
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.items.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-900 sm:px-5">
                    {o.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-600 sm:px-5">
                    {o.customer}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-900 sm:px-5">
                    ${o.total}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 sm:px-5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        statusColor[o.status] ?? 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-500 sm:px-5">
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

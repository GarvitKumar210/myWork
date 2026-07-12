import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import TableScroll from '../TableScroll'

export default function AnalyticsPage() {
  const { data: stats, error, loading } = useBackend('admin', 'stats')
  useReveal([stats])

  if (error) {
    return (
      <div className="admin-page">
        <p className="text-sky-700">{error}</p>
      </div>
    )
  }
  if (loading || !stats) {
    return (
      <div className="admin-page">
        <SoftLoader label="Loading analytics…" />
      </div>
    )
  }

  const maxRev = Math.max(...stats.chart.revenue)
  const maxOrd = Math.max(...stats.chart.orders)

  return (
    <div className="admin-page gap-3">
      <div className="grid min-h-0 shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <h2 className="m-0 text-sm font-semibold text-slate-900 sm:text-base">
            Revenue (7 days)
          </h2>
          <div className="mt-3 flex h-28 min-w-0 items-end gap-1.5 sm:h-32 sm:gap-2">
            {stats.chart.labels.map((label, i) => (
              <div
                key={label}
                className="flex min-w-0 flex-1 flex-col items-center gap-1"
              >
                <span className="text-[0.6rem] font-medium text-slate-500">
                  ${(stats.chart.revenue[i] / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full max-w-full rounded-t-md bg-sky-500"
                  style={{
                    height: `${(stats.chart.revenue[i] / maxRev) * 100}%`,
                    minHeight: 6,
                  }}
                />
                <span className="text-[0.6rem] text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <h2 className="m-0 text-sm font-semibold text-slate-900 sm:text-base">
            Orders (7 days)
          </h2>
          <div className="mt-3 flex h-28 min-w-0 items-end gap-1.5 sm:h-32 sm:gap-2">
            {stats.chart.labels.map((label, i) => (
              <div
                key={label}
                className="flex min-w-0 flex-1 flex-col items-center gap-1"
              >
                <span className="text-[0.6rem] font-medium text-slate-500">
                  {stats.chart.orders[i]}
                </span>
                <div
                  className="w-full max-w-full rounded-t-md bg-indigo-500"
                  style={{
                    height: `${(stats.chart.orders[i] / maxOrd) * 100}%`,
                    minHeight: 6,
                  }}
                />
                <span className="text-[0.6rem] text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product list as table so only this scrolls */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="shrink-0 border-b border-slate-100 px-4 py-2.5 sm:px-5">
          <h2 className="m-0 text-sm font-semibold text-slate-900 sm:text-base">
            Top products
          </h2>
        </div>
        <TableScroll>
          <table className="min-w-[20rem] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Product
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Sold
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 font-semibold sm:px-5">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((p, i) => (
                <tr
                  key={p.name}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-500 sm:px-5">
                    {i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-900 sm:px-5">
                    {p.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-600 sm:px-5">
                    {p.sold}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-slate-900 sm:px-5">
                    ${p.revenue.toLocaleString()}
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

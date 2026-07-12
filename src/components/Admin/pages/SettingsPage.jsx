import { useState } from 'react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'
import TableScroll from '../TableScroll'

export default function SettingsPage() {
  const { data, error, loading } = useBackend('admin', 'settings')
  const [saved, setSaved] = useState(false)
  const [notes, setNotes] = useState({})

  useReveal([data, saved])

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
        <SoftLoader label="Loading settings…" />
      </div>
    )
  }

  const toggles = data.notifications.map((n) => ({
    ...n,
    enabled: notes[n.id] ?? n.enabled,
  }))

  function toggle(id) {
    setNotes((prev) => {
      const current =
        prev[id] ?? data.notifications.find((n) => n.id === id)?.enabled
      return { ...prev, [id]: !current }
    })
    setSaved(false)
  }

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div className="admin-page gap-3">
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-3"
      >
        <div className="grid shrink-0 gap-3 sm:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <h2 className="m-0 text-sm font-semibold text-slate-900">General</h2>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {Object.entries(data.general).map(([key, value]) => (
                <label
                  key={key}
                  className="block text-xs font-medium capitalize text-slate-700"
                >
                  {key.replace(/([A-Z])/g, ' $1')}
                  <input
                    defaultValue={value}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm outline-none focus:border-sky-400"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <h2 className="m-0 text-sm font-semibold text-slate-900">
              Notifications
            </h2>
            <ul className="mt-3 mb-0 list-none space-y-2 p-0">
              {toggles.map((n) => (
                <li
                  key={n.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2"
                >
                  <span className="text-xs text-slate-700 sm:text-sm">
                    {n.label}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={n.enabled}
                    onClick={() => toggle(n.id)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      n.enabled ? 'bg-sky-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                        n.enabled ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Team table — only scrollable area */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <h2 className="m-0 text-sm font-semibold text-slate-900">Team</h2>
            <div className="flex items-center gap-2">
              {saved && (
                <span className="text-xs font-medium text-emerald-600">
                  Saved (demo)
                </span>
              )}
              <button
                type="submit"
                className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 sm:text-sm"
              >
                Save
              </button>
            </div>
          </div>
          <TableScroll>
            <table className="min-w-[22rem] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="whitespace-nowrap px-4 py-2.5 font-semibold">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-semibold">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-semibold">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.team.map((m) => (
                  <tr
                    key={m.email}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-slate-900">
                      {m.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">
                      {m.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                        {m.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        </div>
      </form>
    </div>
  )
}

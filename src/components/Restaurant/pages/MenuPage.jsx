import { useEffect, useState } from 'react'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function MenuPage() {
  const { data: menu, error, loading } = useBackend('restaurant', 'menu')
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (menu && !active) setActive(menu.categories[0]?.id ?? null)
  }, [menu, active])

  useReveal([menu, active])

  if (error) {
    return (
      <p className="mx-auto max-w-5xl px-6 py-20 text-[#8b3a1a]">
        Could not load menu: {error}
      </p>
    )
  }

  if (loading || !menu) return <SoftLoader label="Loading menu…" />

  const category =
    menu.categories.find((c) => c.id === active) ?? menu.categories[0]

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
      <div
        className="reveal"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-[#c2410c]">
          Seasonal list
        </p>
        <h1 className="font-display m-0 mt-2 text-4xl font-semibold text-[#2c1810]">
          Menu
        </h1>
        <p className="mt-3 max-w-lg text-sm text-[#6b4f42]">{menu.note}</p>
      </div>

      <div
        className="reveal mt-8 flex flex-wrap gap-2"
        data-reveal
        style={{ '--reveal-delay': '80ms' }}
      >
        {menu.categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              category.id === c.id
                ? 'border-[#8b3a1a] bg-[#8b3a1a] text-white'
                : 'border-[#e8d9cc] bg-white text-[#5c4033] hover:border-[#c4a994]'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {category.items.map((item, i) => (
          <article
            key={item.id}
            className="reveal hover-lift flex gap-4 overflow-hidden rounded-2xl border border-[#e8d9cc] bg-white p-3 shadow-sm"
            data-reveal
            style={{ '--reveal-delay': `${60 + i * 70}ms` }}
          >
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
              <div className="flex items-start justify-between gap-2">
                <h2 className="m-0 text-base font-semibold text-[#2c1810]">
                  {item.name}
                </h2>
                <span className="shrink-0 text-sm font-bold text-[#c2410c]">
                  ${item.price}
                </span>
              </div>
              <p className="mt-1 mb-2 flex-1 text-sm leading-relaxed text-[#6b4f42]">
                {item.description}
              </p>
              {item.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f0e6dc] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[#8b3a1a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

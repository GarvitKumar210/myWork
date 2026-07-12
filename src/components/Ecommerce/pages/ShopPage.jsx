import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../ProductCard'
import { SoftLoader } from '../../shared/Skeleton'
import { useBackendMany } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'rating', label: 'Top rated' },
]

export default function ShopPage() {
  const { data, error, loading } = useBackendMany('ecommerce', [
    'products',
    'categories',
  ])
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')

  const category = searchParams.get('category') || 'all'

  const filtered = useMemo(() => {
    if (!data) return []
    let list = [...data.products.items]
    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return list
  }, [data, category, sort, query])

  useReveal([data, category, sort, query, filtered.length])

  if (error) {
    return (
      <p className="mx-auto max-w-6xl px-6 py-20 text-rose-600">
        Could not load catalog: {error}
      </p>
    )
  }

  if (loading || !data) return <SoftLoader label="Loading products…" />

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-rose-600">
          Catalog
        </p>
        <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
          Shop
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {filtered.length} product{filtered.length === 1 ? '' : 's'}
        </p>
      </div>

      <div
        className="reveal mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        data-reveal
        style={{ '--reveal-delay': '80ms' }}
      >
        <div className="flex flex-wrap gap-2">
          {data.categories.items.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                if (c.id === 'all') setSearchParams({})
                else setSearchParams({ category: c.id })
              }}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                category === c.id
                  ? 'border-rose-600 bg-rose-600 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-rose-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-[180px] flex-1 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-rose-400"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-rose-400"
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-zinc-500">
          No products match your filters.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={40 + (i % 8) * 50} />
          ))}
        </div>
      )}
    </div>
  )
}

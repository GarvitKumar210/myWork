import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { getProductBySlug } from '../api'
import { useCart } from '../CartContext'
import ProductCard from '../ProductCard'
import { SoftLoader } from '../../shared/Skeleton'
import { useReveal } from '../../shared/useReveal'

export default function ProductPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getProductBySlug(slug)
      .then((d) => {
        if (cancelled) return
        if (!d) {
          setError('Product not found')
          setData(null)
          setLoading(false)
          return
        }
        setData(d)
        setColor(d.product.colors?.[0] ?? '')
        setSize(d.product.sizes?.[0] ?? '')
        setActiveImg(0)
        setQty(1)
        setAdded(false)
        setLoading(false)
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  useReveal([data, slug])

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-rose-600">{error}</p>
        <Link
          to="/examples/ecommerce/shop"
          className="mt-4 inline-block text-sm font-semibold text-zinc-900"
        >
          ← Back to shop
        </Link>
      </div>
    )
  }

  // Keep previous product on screen while next product loads (SPA feel)
  if (loading && !data) return <SoftLoader label="Loading product…" />
  if (!data) return <SoftLoader label="Loading product…" />

  const { product, productReviews, related } = data
  const gallery = product.gallery?.length ? product.gallery : [product.image]

  function handleAdd() {
    if (!product.inStock) return
    addItem(product, { color, size, qty })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <p
        className="reveal m-0 text-sm text-zinc-500"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        <Link
          to="/examples/ecommerce/shop"
          className="text-zinc-500 no-underline hover:text-rose-600"
        >
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">{product.name}</span>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div
          className="reveal"
          data-reveal
          style={{ '--reveal-delay': '60ms' }}
        >
          <div className="aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <img
              src={gallery[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${
                    activeImg === i ? 'border-rose-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div
          className="reveal"
          data-reveal
          style={{ '--reveal-delay': '140ms' }}
        >
          {product.badge && (
            <span className="inline-block rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-rose-700">
              {product.badge}
            </span>
          )}
          <h1 className="m-0 mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-bold text-zinc-900">
              ${product.price}
            </span>
            {product.compareAt && (
              <span className="text-lg text-zinc-400 line-through">
                ${product.compareAt}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sm text-zinc-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {product.rating} · {product.reviews} reviews
            </span>
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            {product.description}
          </p>

          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="m-0 text-sm font-semibold text-zinc-800">
                Color: <span className="font-normal text-zinc-500">{color}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      color === c
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-5">
              <p className="m-0 text-sm font-semibold text-zinc-800">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      size === s
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-rose-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-zinc-200 bg-white">
              <button
                type="button"
                className="px-3 py-2 text-lg font-medium text-zinc-600"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm font-semibold">
                {qty}
              </span>
              <button
                type="button"
                className="px-3 py-2 text-lg font-medium text-zinc-600"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:flex-none sm:min-w-[200px]"
            >
              {product.inStock ? (
                added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" /> Add to cart
                  </>
                )
              ) : (
                'Sold out'
              )}
            </button>
            <Link
              to="/examples/ecommerce/cart"
              className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 no-underline hover:border-rose-200"
            >
              View cart
            </Link>
          </div>

          <ul className="mt-8 list-none space-y-2 border-t border-zinc-200 p-0 pt-6">
            {product.details.map((d) => (
              <li
                key={d}
                className="flex gap-2 text-sm text-zinc-600 before:text-rose-500 before:content-['✓']"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {productReviews.length > 0 && (
        <section className="mt-16">
          <h2
            className="reveal m-0 text-2xl font-bold text-zinc-900"
            data-reveal
            style={{ '--reveal-delay': '0ms' }}
          >
            Reviews
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {productReviews.map((r, i) => (
              <div
                key={r.id}
                className="reveal rounded-2xl border border-zinc-200 bg-white p-5"
                data-reveal
                style={{ '--reveal-delay': `${60 + i * 80}ms` }}
              >
                <p className="m-0 text-sm text-rose-600">
                  {'★'.repeat(r.rating)}
                </p>
                <p className="mt-1 mb-0 font-semibold text-zinc-900">{r.title}</p>
                <p className="mt-2 mb-0 text-sm text-zinc-600">{r.text}</p>
                <p className="mt-2 mb-0 text-xs text-zinc-400">
                  {r.name} · {r.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2
            className="reveal m-0 text-2xl font-bold text-zinc-900"
            data-reveal
            style={{ '--reveal-delay': '0ms' }}
          >
            You may also like
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={60 + i * 70} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

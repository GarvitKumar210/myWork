import { Link } from 'react-router-dom'

export default function ProductCard({ product, delay = 0 }) {
  return (
    <Link
      to={`/examples/ecommerce/product/${product.slug}`}
      className="reveal hover-lift group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-inherit no-underline shadow-sm"
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white">
            Sold out
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {product.category}
        </p>
        <h3 className="m-0 mt-1 text-base font-semibold text-zinc-900">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="m-0 flex items-baseline gap-2">
            <span className="text-base font-bold text-zinc-900">
              ${product.price}
            </span>
            {product.compareAt && (
              <span className="text-sm text-zinc-400 line-through">
                ${product.compareAt}
              </span>
            )}
          </p>
          <span className="text-xs text-zinc-500">★ {product.rating}</span>
        </div>
      </div>
    </Link>
  )
}

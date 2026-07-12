import { fetchBackend, fetchBackendMany } from '../shared/fetchBackend'

const SITE = 'ecommerce'

export function getShopSite() {
  return fetchBackend(SITE, 'site')
}

export function getProducts() {
  return fetchBackend(SITE, 'products')
}

export function getCategories() {
  return fetchBackend(SITE, 'categories')
}

export function getReviews() {
  return fetchBackend(SITE, 'reviews')
}

export function getShipping() {
  return fetchBackend(SITE, 'shipping')
}

export function getShopHomeData() {
  return fetchBackendMany(SITE, ['site', 'products', 'categories', 'reviews'])
}

export function getShopCatalogData() {
  return fetchBackendMany(SITE, ['products', 'categories'])
}

export async function getProductBySlug(slug) {
  const [products, reviews] = await Promise.all([
    getProducts(),
    getReviews(),
  ])
  const product = products.items.find(
    (p) => p.slug === slug || p.id === slug,
  )
  if (!product) return null
  const productReviews = reviews.items.filter(
    (r) => r.productId === product.id,
  )
  const related = products.items
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  return { product, productReviews, related, all: products.items }
}

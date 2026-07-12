import { fetchBackend, fetchBackendMany } from '../shared/fetchBackend'

const SITE = 'restaurant'

export function getRestaurantSite() {
  return fetchBackend(SITE, 'site')
}

export function getRestaurantMenu() {
  return fetchBackend(SITE, 'menu')
}

export function getRestaurantAbout() {
  return fetchBackend(SITE, 'about')
}

export function getRestaurantReviews() {
  return fetchBackend(SITE, 'reviews')
}

export function getRestaurantReservations() {
  return fetchBackend(SITE, 'reservations')
}

export function getRestaurantHomeData() {
  return fetchBackendMany(SITE, ['site', 'menu', 'reviews'])
}

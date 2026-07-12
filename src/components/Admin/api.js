import { fetchBackend, fetchBackendMany } from '../shared/fetchBackend'

const SITE = 'admin'

export function getAdminSite() {
  return fetchBackend(SITE, 'site')
}

export function getAdminStats() {
  return fetchBackend(SITE, 'stats')
}

export function getAdminUsers() {
  return fetchBackend(SITE, 'users')
}

export function getAdminOrders() {
  return fetchBackend(SITE, 'orders')
}

export function getAdminActivity() {
  return fetchBackend(SITE, 'activity')
}

export function getAdminSettings() {
  return fetchBackend(SITE, 'settings')
}

export function getAdminDashboard() {
  return fetchBackendMany(SITE, ['site', 'stats', 'activity', 'orders'])
}

import { fetchBackend, fetchBackendMany } from '../shared/fetchBackend'

const SITE = 'gym'

export function getGymSite() {
  return fetchBackend(SITE, 'site')
}

export function getGymClasses() {
  return fetchBackend(SITE, 'classes')
}

export function getGymTrainers() {
  return fetchBackend(SITE, 'trainers')
}

export function getGymMemberships() {
  return fetchBackend(SITE, 'memberships')
}

export function getGymSchedule() {
  return fetchBackend(SITE, 'schedule')
}

export function getGymReviews() {
  return fetchBackend(SITE, 'reviews')
}

export function getGymHomeData() {
  return fetchBackendMany(SITE, [
    'site',
    'classes',
    'trainers',
    'memberships',
    'reviews',
  ])
}

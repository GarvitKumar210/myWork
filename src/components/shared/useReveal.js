import { useEffect } from 'react'

/**
 * Scroll / mount entrance animations for any mini-site.
 * Mark elements with: className="reveal" data-reveal style={{ '--reveal-delay': '120ms' }}
 *
 * Re-run when `deps` change (e.g. after skeleton → content or route data loads).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (!nodes.length) return undefined

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      nodes.forEach((el) => el.classList.add('is-in'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls re-scan via deps
  }, deps)
}

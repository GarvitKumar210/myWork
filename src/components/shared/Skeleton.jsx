/**
 * Animated skeleton primitives for mini-site loading states.
 * Themes: light | indigo | warm | rose | dark
 */

const themes = {
  light: {
    page: 'bg-slate-50',
    base: '#e2e8f0',
    shine: '#f1f5f9',
  },
  indigo: {
    page: 'bg-slate-50',
    base: '#e0e7ff',
    shine: '#eef2ff',
  },
  warm: {
    page: 'bg-[#faf6f1]',
    base: '#e8d9cc',
    shine: '#f3ebe3',
  },
  rose: {
    page: 'bg-zinc-50',
    base: '#fecdd3',
    shine: '#ffe4e6',
  },
  dark: {
    page: 'bg-neutral-950',
    base: '#262626',
    shine: '#3f3f46',
  },
}

export function Bone({ className = '' }) {
  return <div className={`skeleton-bone ${className}`} aria-hidden="true" />
}

export function PageSkeleton({ theme = 'light', children }) {
  const t = themes[theme] ?? themes.light

  return (
    <div
      className={`min-h-screen ${t.page}`}
      style={{
        '--sk-base': t.base,
        '--sk-shine': t.shine,
      }}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading content"
    >
      {children}
    </div>
  )
}

/** Layout skeleton used by scaffold mini-sites */
export function ScaffoldSkeleton({ theme = 'light' }) {
  return (
    <PageSkeleton theme={theme}>
      <div className="mx-auto max-w-5xl px-6 py-5">
        <div className="flex items-center justify-between">
          <Bone className="h-8 w-28 rounded-lg" />
          <Bone className="h-5 w-32 rounded-md" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Bone className="mb-4 h-4 w-36 rounded-md" />
        <Bone className="mb-4 h-12 w-full max-w-md rounded-lg" />
        <Bone className="mb-3 h-4 w-full max-w-xl rounded-md" />
        <Bone className="h-4 w-full max-w-lg rounded-md" />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Bone className="h-36 rounded-2xl" />
          <Bone className="h-36 rounded-2xl" />
          <Bone className="h-36 rounded-2xl" />
        </div>
      </div>
    </PageSkeleton>
  )
}

/** Inline skeleton for nested pages (keeps outer nav/footer) */
export function SectionSkeleton({ theme = 'warm', hero = false }) {
  const t = themes[theme] ?? themes.light

  return (
    <div
      className="w-full"
      style={{
        '--sk-base': t.base,
        '--sk-shine': t.shine,
      }}
      role="status"
      aria-busy="true"
      aria-label="Loading content"
    >
      {hero && <Bone className="min-h-[50vh] w-full rounded-none" />}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Bone className="mb-4 h-4 w-28 rounded-md" />
        <Bone className="mb-6 h-10 w-64 max-w-full rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Bone className="h-40 rounded-2xl" />
          <Bone className="h-40 rounded-2xl" />
          <Bone className="h-40 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

/**
 * Compact in-route loader — use when the shell (nav/footer) stays mounted
 * so navigation does not feel like a full site refresh.
 */
export function SoftLoader({ label = 'Loading…', className = '' }) {
  return (
    <div
      className={`flex min-h-[40vh] flex-col items-center justify-center gap-3 px-6 py-16 ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50"
        aria-hidden="true"
      />
      <p className="m-0 text-sm font-medium opacity-60">{label}</p>
    </div>
  )
}

/** Matches NovaFlow landing layout while content loads */
export function LandingSkeleton() {
  return (
    <PageSkeleton theme="indigo">
      <div className="border-b border-indigo-100/60 bg-white/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Bone className="h-8 w-8 rounded-lg" />
            <Bone className="h-5 w-24 rounded-md" />
          </div>
          <div className="hidden gap-4 sm:flex">
            <Bone className="h-4 w-16 rounded-md" />
            <Bone className="h-4 w-16 rounded-md" />
          </div>
          <Bone className="h-9 w-28 rounded-full" />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 lg:grid-cols-2">
        <div>
          <Bone className="mb-4 h-6 w-32 rounded-full" />
          <Bone className="mb-3 h-10 w-full rounded-lg" />
          <Bone className="mb-3 h-10 w-4/5 max-w-sm rounded-lg" />
          <Bone className="mb-2 h-4 w-full max-w-md rounded-md" />
          <Bone className="mb-8 h-4 w-3/4 max-w-sm rounded-md" />
          <div className="flex gap-3">
            <Bone className="h-11 w-36 rounded-full" />
            <Bone className="h-11 w-32 rounded-full" />
          </div>
        </div>
        <Bone className="aspect-[4/3] w-full rounded-3xl" />
      </div>

      <div className="border-t border-indigo-50 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Bone className="mb-3 h-8 w-72 max-w-full rounded-lg" />
          <Bone className="mb-10 h-4 w-80 max-w-full rounded-md" />
          <div className="grid gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6"
              >
                <Bone className="mb-4 h-11 w-11 rounded-xl" />
                <Bone className="mb-3 h-5 w-28 rounded-md" />
                <Bone className="mb-2 h-3 w-full rounded-md" />
                <Bone className="h-3 w-4/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSkeleton>
  )
}

/** Admin panel skeleton */
export function AdminSkeleton() {
  return (
    <PageSkeleton theme="light">
      <div className="flex min-h-screen">
        <div className="hidden w-60 shrink-0 border-r border-slate-200 bg-slate-900 p-4 md:block">
          <Bone className="mb-8 h-7 w-28 rounded-md" />
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Bone key={i} className="h-9 w-full rounded-lg" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          <Bone className="mb-6 h-8 w-48 rounded-lg" />
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Bone key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Bone className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </PageSkeleton>
  )
}

/** Gym layout while site loads */
export function GymSkeleton() {
  return (
    <PageSkeleton theme="dark">
      <div className="border-b border-neutral-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Bone className="h-7 w-32 rounded-md" />
          <div className="flex gap-2">
            <Bone className="h-8 w-16 rounded-full" />
            <Bone className="h-8 w-16 rounded-full" />
            <Bone className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
      <Bone className="min-h-[55vh] w-full rounded-none" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Bone className="mb-6 h-8 w-48 rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Bone className="h-48 rounded-2xl" />
          <Bone className="h-48 rounded-2xl" />
          <Bone className="h-48 rounded-2xl" />
        </div>
      </div>
    </PageSkeleton>
  )
}

/** Ecommerce layout while site loads */
export function EcommerceSkeleton() {
  return (
    <PageSkeleton theme="rose">
      <div className="border-b border-rose-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Bone className="h-7 w-24 rounded-md" />
          <div className="flex gap-3">
            <Bone className="h-4 w-14 rounded-md" />
            <Bone className="h-4 w-14 rounded-md" />
            <Bone className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <Bone className="min-h-[48vh] w-full rounded-none" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Bone className="mb-6 h-8 w-48 rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-rose-100 bg-white p-3">
              <Bone className="mb-3 aspect-square w-full rounded-xl" />
              <Bone className="mb-2 h-4 w-3/4 rounded-md" />
              <Bone className="h-4 w-1/3 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </PageSkeleton>
  )
}

/** Restaurant layout while site.json loads */
export function RestaurantSkeleton() {
  return (
    <PageSkeleton theme="warm">
      <div className="border-b border-[#e8d9cc]/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Bone className="h-7 w-36 rounded-md" />
          <div className="flex gap-2">
            <Bone className="h-8 w-16 rounded-full" />
            <Bone className="h-8 w-16 rounded-full" />
            <Bone className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
      <Bone className="min-h-[55vh] w-full rounded-none" />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Bone className="mb-3 h-4 w-24 rounded-md" />
        <Bone className="mb-8 h-9 w-64 max-w-full rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Bone className="h-48 rounded-2xl" />
          <Bone className="h-48 rounded-2xl" />
          <Bone className="h-48 rounded-2xl" />
        </div>
      </div>
    </PageSkeleton>
  )
}

import { HeroIllustration } from './Illustrations'

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-2 lg:gap-12">
      <div
        className="reveal"
        data-reveal
        style={{ '--reveal-delay': '60ms' }}
      >
        <p className="mb-4 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Workflow software
        </p>
        <h1 className="m-0 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-tight text-slate-900">
          Ship work faster with one calm dashboard
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
          NovaFlow helps small teams plan, track, and finish projects without the
          clutter. Simple tools, clear progress.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#pricing"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white no-underline shadow-md shadow-indigo-200 transition hover:bg-indigo-500 hover:shadow-lg"
          >
            Start free trial
          </a>
          <a
            href="#features"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 no-underline transition hover:border-indigo-200 hover:text-indigo-600"
          >
            See features
          </a>
        </div>
      </div>

      <div
        className="reveal"
        data-reveal
        style={{ '--reveal-delay': '220ms' }}
      >
        <HeroIllustration className="h-auto w-full drop-shadow-sm transition duration-500 hover:scale-[1.02]" />
      </div>
    </section>
  )
}

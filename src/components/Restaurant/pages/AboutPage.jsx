import { SoftLoader } from '../../shared/Skeleton'
import { useBackend } from '../../shared/useBackend'
import { useReveal } from '../../shared/useReveal'

export default function AboutPage() {
  const { data: about, error, loading } = useBackend('restaurant', 'about')

  useReveal([about])

  if (error) {
    return (
      <p className="mx-auto max-w-5xl px-6 py-20 text-[#8b3a1a]">
        Could not load about: {error}
      </p>
    )
  }

  if (loading || !about) return <SoftLoader label="Loading…" />

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="reveal" data-reveal style={{ '--reveal-delay': '0ms' }}>
        <p className="m-0 text-xs font-semibold uppercase tracking-wider text-[#c2410c]">
          Our story
        </p>
        <h1 className="font-display m-0 mt-2 max-w-xl text-4xl font-semibold text-[#2c1810]">
          {about.headline}
        </h1>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="reveal space-y-4"
          data-reveal
          style={{ '--reveal-delay': '100ms' }}
        >
          {about.story.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="m-0 text-base leading-relaxed text-[#5c4033]"
            >
              {para}
            </p>
          ))}
        </div>
        <div
          className="reveal overflow-hidden rounded-2xl"
          data-reveal
          style={{ '--reveal-delay': '180ms' }}
        >
          <img
            src="/images/restaurant/interior.jpg"
            alt="Restaurant interior"
            className="h-full min-h-[260px] w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {about.values.map((v, i) => (
          <div
            key={v.title}
            className="reveal hover-lift rounded-2xl border border-[#e8d9cc] bg-white p-5"
            data-reveal
            style={{ '--reveal-delay': `${80 + i * 100}ms` }}
          >
            <h2 className="font-display m-0 text-lg font-semibold text-[#8b3a1a]">
              {v.title}
            </h2>
            <p className="mt-2 mb-0 text-sm leading-relaxed text-[#6b4f42]">
              {v.text}
            </p>
          </div>
        ))}
      </div>

      <h2
        className="reveal font-display m-0 mt-16 text-2xl font-semibold text-[#2c1810]"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        The team
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {about.team.map((person, i) => (
          <article
            key={person.id}
            className="reveal text-center"
            data-reveal
            style={{ '--reveal-delay': `${80 + i * 110}ms` }}
          >
            <div className="mx-auto aspect-square max-w-[220px] overflow-hidden rounded-2xl">
              <img
                src={person.image}
                alt={person.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="m-0 mt-4 text-base font-semibold text-[#2c1810]">
              {person.name}
            </h3>
            <p className="m-0 mt-1 text-sm font-medium text-[#c2410c]">
              {person.role}
            </p>
            <p className="mt-2 mb-0 text-sm leading-relaxed text-[#6b4f42]">
              {person.bio}
            </p>
          </article>
        ))}
      </div>

      <h2
        className="reveal font-display m-0 mt-16 text-2xl font-semibold text-[#2c1810]"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        Gallery
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {about.gallery.map((g, i) => (
          <div
            key={g.id}
            className="reveal aspect-square overflow-hidden rounded-xl"
            data-reveal
            style={{ '--reveal-delay': `${60 + i * 80}ms` }}
          >
            <img
              src={g.src}
              alt={g.alt}
              className="h-full w-full object-cover transition duration-500 hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

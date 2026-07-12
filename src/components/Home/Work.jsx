import { Link } from 'react-router-dom'
import novaflowPreview from '../../assets/images/home/novaflow-preview.png'
import restaurantPreview from '../../assets/images/home/restaurant-preview.png'
import shoplyPreview from '../../assets/images/home/shoply-preview.png'
import gymPreview from '../../assets/images/home/gym-preview.png'
import adminPreview from '../../assets/images/home/admin-preview.png'

const projects = [
  {
    title: 'NovaFlow',
    tag: 'SaaS Landing · Indigo',
    desc: 'Clean tech landing page — hero, features, pricing, and conversion-focused CTAs.',
    image: novaflowPreview,
    imageAlt: 'Screenshot of the NovaFlow SaaS landing page',
    to: '/examples/landing',
  },
  {
    title: 'Ember & Oak',
    tag: 'Restaurant · Terracotta',
    desc: 'Warm culinary site with menu, story, and reservation flow.',
    image: restaurantPreview,
    imageAlt: 'Screenshot of the Ember & Oak restaurant site',
    to: '/examples/restaurant',
  },
  {
    title: 'Shoply',
    tag: 'E-commerce · Rose',
    desc: 'Modern retail experience with product grid, detail pages, and cart UI.',
    image: shoplyPreview,
    imageAlt: 'Screenshot of the Shoply e-commerce store',
    to: '/examples/ecommerce',
  },
  {
    title: 'IronPulse',
    tag: 'Gym · Lime / Black',
    desc: 'High-energy fitness site — classes, trainers, and membership CTAs.',
    image: gymPreview,
    imageAlt: 'Screenshot of the IronPulse gym website',
    to: '/examples/gym',
  },
  {
    title: 'PulseAdmin',
    tag: 'Admin Panel · Slate / Sky',
    desc: 'Dashboard console with users, orders, analytics, and settings.',
    image: adminPreview,
    imageAlt: 'Screenshot of the PulseAdmin admin panel',
    to: '/examples/admin',
  },
]

export default function Work() {
  return (
    <section
      id="examples"
      className="mx-auto max-w-content px-6 py-[clamp(3.5rem,8vw,6rem)] max-[400px]:px-[1.1rem]"
    >
      <div
        className="reveal mb-10 text-left"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-green">
          Selected projects
        </p>
        <h2 className="m-0 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-navy">
          Examples
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="reveal"
            data-reveal
            style={{ '--reveal-delay': `${40 + i * 60}ms` }}
          >
            <Link
              to={project.to}
              className="example-card flex h-full flex-col rounded-[20px] border border-line bg-card p-5 text-inherit no-underline"
            >
              {project.image ? (
                <div className="mb-5 aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-white">
                  <img
                    src={project.image}
                    alt={project.imageAlt ?? ''}
                    className="example-card-img h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  className={`mb-5 aspect-[16/10] rounded-[14px] ${project.visual}`}
                  aria-hidden="true"
                />
              )}
              <p className="mb-1.5 text-[0.8rem] font-semibold uppercase tracking-wider text-muted">
                {project.tag}
              </p>
              <h3 className="mb-2 text-xl font-bold text-black">
                {project.title}
              </h3>
              <p className="m-0 text-[0.98rem] leading-relaxed text-muted">
                {project.desc}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

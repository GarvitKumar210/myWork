import { Link } from 'react-router-dom'

export default function Footer({ site }) {
  if (!site) return null

  const { name, address, phone, hours, social } = site

  return (
    <footer className="mt-auto border-t border-[#e8d9cc] bg-[#2c1810] text-[#f5ebe3]">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display m-0 text-xl font-semibold text-[#e8c4a8]">
            {name}
          </p>
          <p className="mt-2 mb-0 text-sm leading-relaxed text-[#c4a994]">
            {address.street}
            <br />
            {address.city}, {address.state} {address.zip}
          </p>
          <p className="mt-3 mb-0 text-sm text-[#c4a994]">{phone}</p>
        </div>

        <div>
          <p className="m-0 text-sm font-semibold uppercase tracking-wider text-[#e8c4a8]">
            Hours
          </p>
          <ul className="mt-3 mb-0 list-none space-y-1.5 p-0 text-sm text-[#c4a994]">
            {hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="m-0 text-sm font-semibold uppercase tracking-wider text-[#e8c4a8]">
            Visit
          </p>
          <p className="mt-3 mb-4 text-sm text-[#c4a994]">{social.instagram}</p>
          <p className="mb-4 text-sm text-[#c4a994]">{social.reservationsNote}</p>
          <Link
            to="/examples/restaurant/reserve"
            className="inline-block rounded-full bg-[#c2410c] px-5 py-2 text-sm font-semibold text-white no-underline hover:bg-[#a3360a]"
          >
            Book a table
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-[#9a7f70]">
        Demo mini-site · data from /backend/restaurant ·{' '}
        <Link to="/" className="text-[#e8c4a8] no-underline hover:underline">
          Back to home
        </Link>
      </div>
    </footer>
  )
}

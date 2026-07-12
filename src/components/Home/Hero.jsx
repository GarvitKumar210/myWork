import { Button } from './Button'

const skills = ['UX / UI Design', 'React', 'Node.js', 'Tailwind CSS']

const drifts = ['a', 'b', 'c', 'd']
const hideOnMobileIndexes = [1, 5, 10, 14, 17, 21, 27, 31, 35, 37, 41, 43, 47]

const heroDots = [
  [9, 6, 62, 0.42],
  [4, 11, 78, 0.28],
  [14, 3, 88, 0.5],
  [5, 18, 54, 0.32],
  [7, 8, 41, 0.38],
  [3, 22, 71, 0.24],
  [11, 15, 93, 0.46],
  [6, 28, 48, 0.35],
  [4, 4, 55, 0.3],
  [8, 33, 82, 0.4],
  [3, 39, 61, 0.26],
  [12, 42, 91, 0.48],
  [5, 47, 38, 0.33],
  [10, 19, 35, 0.44],
  [4, 52, 74, 0.27],
  [7, 58, 52, 0.36],
  [15, 9, 69, 0.4],
  [3, 63, 87, 0.25],
  [6, 25, 58, 0.34],
  [9, 55, 96, 0.42],
  [4, 68, 44, 0.28],
  [8, 36, 29, 0.37],
  [5, 71, 66, 0.31],
  [13, 48, 57, 0.46],
  [3, 14, 48, 0.24],
  [7, 76, 80, 0.35],
  [10, 62, 33, 0.41],
  [4, 31, 97, 0.29],
  [6, 79, 55, 0.33],
  [11, 21, 83, 0.45],
  [5, 44, 70, 0.3],
  [3, 84, 92, 0.22],
  [9, 66, 75, 0.39],
  [4, 37, 43, 0.27],
  [8, 82, 38, 0.36],
  [6, 51, 24, 0.34],
  [12, 73, 94, 0.47],
  [3, 57, 64, 0.25],
  [7, 87, 71, 0.38],
  [5, 40, 86, 0.31],
  [10, 29, 67, 0.43],
  [4, 90, 49, 0.26],
  [6, 17, 27, 0.34],
  [14, 60, 42, 0.4],
  [3, 45, 98, 0.23],
  [8, 93, 84, 0.35],
  [5, 70, 28, 0.3],
  [9, 85, 60, 0.4],
].map(([size, top, left, opacity], i) => ({
  size,
  top,
  left,
  opacity,
  drift: drifts[i % 4],
  duration: `${7 + (i % 9)}s`,
  delay: `${(i % 12) * 0.2}s`,
  hideOnMobile: hideOnMobileIndexes.includes(i),
}))

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-content flex-col justify-center overflow-hidden px-6 py-[clamp(3rem,10vw,7.5rem)] pb-[clamp(4rem,12vw,8rem)] max-[720px]:min-h-0 max-[720px]:pt-10">
      <div
        className="hero-dots reveal"
        data-reveal
        style={{ '--reveal-delay': '120ms' }}
        aria-hidden="true"
      >
        {heroDots.map((dot, i) => (
          <span
            key={i}
            className={`dot dot-drift-${dot.drift}${dot.hideOnMobile ? ' max-[720px]:hidden' : ''}`}
            style={{
              width: dot.size,
              height: dot.size,
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              opacity: dot.opacity,
              '--drift-duration': dot.duration,
              '--drift-delay': dot.delay,
            }}
          />
        ))}
      </div>

      <h1
        className="reveal relative z-[1] m-0 max-w-[18ch] text-[clamp(2rem,5.2vw,3.65rem)] font-bold leading-[1.15] tracking-[-0.03em] text-black max-[720px]:max-w-none max-[400px]:text-[1.75rem]"
        data-reveal
        style={{ '--reveal-delay': '80ms' }}
      >
        Hi, I am Garvit Kumar,
        <br />
        Designing Digital Experiences
        <br />
        That User Love
      </h1>

      <p
        className="reveal relative z-[1] mt-6 mb-0 max-w-xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-muted"
        data-reveal
        style={{ '--reveal-delay': '160ms' }}
      >
        UX/UI designer who builds with React, Tailwind CSS, and Node.js — from
        research and interface design to a working full-stack product.
      </p>

      <ul
        className="reveal relative z-[1] mt-5 mb-0 flex list-none flex-wrap gap-2.5 p-0"
        data-reveal
        style={{ '--reveal-delay': '220ms' }}
        aria-label="Skills"
      >
        {skills.map((skill, i) => (
          <li
            key={skill}
            className="reveal rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-sm font-semibold tracking-wide text-navy"
            data-reveal
            style={{ '--reveal-delay': `${260 + i * 60}ms` }}
          >
            {skill}
          </li>
        ))}
      </ul>

      <div
        className="reveal relative z-[1] mt-9 flex flex-wrap gap-3.5 max-[720px]:flex-col max-[720px]:items-stretch"
        data-reveal
        style={{ '--reveal-delay': '360ms' }}
      >
        <Button href="#examples" className="max-[720px]:w-full">
          View Examples
        </Button>
        <Button href="#hire" variant="ghost" className="max-[720px]:w-full">
          Get in touch
        </Button>
      </div>
    </section>
  )
}

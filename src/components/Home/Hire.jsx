import { Button } from './Button'

export default function Hire() {
  return (
    <section
      id="hire"
      className="mx-auto max-w-content px-6 pb-[clamp(4rem,10vw,7rem)] pt-[clamp(3.5rem,8vw,6rem)] max-[400px]:px-[1.1rem]"
    >
      <div
        className="hire-gradient reveal rounded-3xl p-[clamp(2.5rem,6vw,4rem)] text-white shadow-soft"
        data-reveal
        style={{ '--reveal-delay': '0ms' }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-hire-accent">
          Let&apos;s collaborate
        </p>
        <h2 className="m-0 max-w-[16ch] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-white">
          Ready to build something great?
        </h2>
        <p className="mb-8 mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/80">
          Need UX/UI design with React, Tailwind CSS, and Node.js? Tell me about
          your next idea — I&apos;d love to help build it.
        </p>
        <Button
          href="mailto:hello@garvitkumar.com"
          className="px-9 py-4 text-[1.05rem] shadow-[0_8px_28px_rgba(0,0,0,0.25)] max-[720px]:w-full"
        >
          Hire Me
        </Button>
      </div>
    </section>
  )
}

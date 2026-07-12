import reactIcon from '../../assets/images/home/react.svg'
import nodeIcon from '../../assets/images/home/nodejs.svg'
import figmaIcon from '../../assets/images/home/figma.svg'
import tailwindIcon from '../../assets/images/home/tailwindcss.svg'

const tools = [
  { name: 'React', icon: reactIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'Figma', icon: figmaIcon },
  { name: 'Tailwind CSS', icon: tailwindIcon },
]

export default function Tools() {
  return (
    <section
      id="tools"
      className="mx-auto max-w-content px-6 py-[clamp(2.5rem,6vw,4rem)] max-[400px]:px-[1.1rem]"
      aria-label="Tools"
    >
      <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-4 sm:gap-6">
        {tools.map((tool, i) => (
          <li
            key={tool.name}
            className="reveal flex items-center justify-center rounded-[20px] border border-line bg-card px-4 py-8 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            data-reveal
            style={{ '--reveal-delay': `${40 + i * 50}ms` }}
            title={tool.name}
          >
            <div className="flex h-16 w-16 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem]">
              <img
                src={tool.icon}
                alt={tool.name}
                width={72}
                height={72}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

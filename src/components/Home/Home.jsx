import Navbar from './Navbar'
import Hero from './Hero'
import Tools from './Tools'
import Work from './Work'
import Hire from './Hire'
import Footer from './Footer'
import { useReveal } from '../shared/useReveal'
import '../../styles/Home/Home.css'

export default function Home() {
  useReveal([])

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <main id="top">
        <Hero />
        <Tools />
        <Work />
        <Hire />
      </main>
      <Footer />
    </div>
  )
}

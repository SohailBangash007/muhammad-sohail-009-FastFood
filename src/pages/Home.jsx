import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import About from '../components/About.jsx'
import Menu from '../components/Menu.jsx'
import Signature from '../components/Signature.jsx'
import Features from '../components/Features.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Reservation from '../components/Reservation.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Menu />
      <Signature />
      <Features />
      <Testimonials />
      <Reservation />
    </>
  )
}

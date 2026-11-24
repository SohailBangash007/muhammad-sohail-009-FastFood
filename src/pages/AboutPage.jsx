import PageIntro from '../components/PageIntro.jsx'
import About from '../components/About.jsx'
import Timeline from '../components/about/Timeline.jsx'
import ValuesSection from '../components/about/ValuesSection.jsx'
import TeamSection from '../components/about/TeamSection.jsx'
import GallerySection from '../components/about/GallerySection.jsx'
import CTA from '../components/CTA.jsx'
import Marquee from '../components/Marquee.jsx'
import { images } from '../data/site.js'

export default function AboutPage() {
  return (
    <>
      <PageIntro
        crumb="About"
        eyebrow="Our story"
        title="The flavour"
        accent="behind it all."
        description="We are a family-run kitchen with a simple obsession: food that makes people happy. Pull up a chair and get to know us."
        image={images.kitchen}
      />
      <Marquee />
      <About />
      <Timeline />
      <ValuesSection />
      <TeamSection />
      <GallerySection />
      <CTA />
    </>
  )
}

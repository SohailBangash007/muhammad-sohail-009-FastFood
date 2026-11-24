import PageIntro from '../components/PageIntro.jsx'
import Menu from '../components/Menu.jsx'
import MenuHighlights from '../components/MenuHighlights.jsx'
import Signature from '../components/Signature.jsx'
import CTA from '../components/CTA.jsx'
import { images } from '../data/site.js'

export default function MenuPage() {
  return (
    <>
      <PageIntro
        crumb="Menu"
        eyebrow="Fresh off the grill"
        title="Our"
        accent="full menu."
        description="Burgers, wood-fired pizza, chicken rolls and sweet finishes — pick what you are craving and we will take it from there."
        image={images.hero}
      />
      <MenuHighlights />
      <Menu />
      <Signature />
      <CTA />
    </>
  )
}

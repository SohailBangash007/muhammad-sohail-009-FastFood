import PageIntro from '../components/PageIntro.jsx'
import Reservation from '../components/Reservation.jsx'
import CTA from '../components/CTA.jsx'
import { images } from '../data/site.js'

export default function ContactPage() {
  return (
    <>
      <PageIntro
        crumb="Contact"
        eyebrow="Come say hello"
        title="Book your"
        accent="table."
        description="Reservations, questions or a serious craving — we are only a call or a click away."
        image={images.team}
      />
      <Reservation />
      <CTA />
    </>
  )
}

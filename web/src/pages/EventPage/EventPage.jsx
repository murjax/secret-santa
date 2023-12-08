import { MetaTags } from '@redwoodjs/web'

import EventCell from 'src/components/EventCell'
import Footer from 'src/components/Footer/Footer'

const EventPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Event" description="Event page" />

      <main className="bg-interior bg-no-repeat bg-turquoiseGreen">
        <div className="flex pb-80">
          <img
            src="/images/logo__secret-santa.svg"
            alt="Secret Santa"
            className="mb-10 ml-4 mr-20 w-[360px] pt-16"
          />
          <EventCell id={id} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default EventPage

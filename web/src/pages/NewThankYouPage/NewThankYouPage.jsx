import { MetaTags } from '@redwoodjs/web'

import Footer from 'src/components/Footer/Footer'
import NewThankYouCell from 'src/components/NewThankYouCell'

const NewThankYouPage = () => {
  return (
    <>
      <MetaTags title="NewThankYou" description="NewThankYou page" />

      <main className="bg-interior bg-no-repeat bg-turquoiseGreen">
        <div className="flex pb-80">
          <img
            src="/images/logo__secret-santa.svg"
            alt="Secret Santa"
            className="mb-10 ml-4 mr-20 w-[360px] pt-16"
          />
          <NewThankYouCell />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default NewThankYouPage

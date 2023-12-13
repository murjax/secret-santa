import { MetaTags } from '@redwoodjs/web'

import DashboardCell from 'src/components/DashboardCell'
import Footer from 'src/components/Footer/Footer'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <main className="bg-interior bg-no-repeat bg-turquoiseGreen">
        <div className="flex pb-80">
          <img
            src="/images/logo__secret-santa.svg"
            alt="Secret Santa"
            className="mb-10 ml-4 mr-20 w-[360px] pt-16"
          />
          <DashboardCell />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default HomePage

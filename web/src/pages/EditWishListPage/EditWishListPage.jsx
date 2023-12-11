import { MetaTags } from '@redwoodjs/web'

import EditWishListCell from 'src/components/EditWishListCell'
import Footer from 'src/components/Footer/Footer'

const EditWishListPage = ({ id }) => {
  return (
    <>
      <MetaTags title="EditWishList" description="EditWishList page" />

      <main className="bg-interior bg-no-repeat bg-turquoiseGreen">
        <div className="flex pb-80">
          <img
            src="/images/logo__secret-santa.svg"
            alt="Secret Santa"
            className="mb-10 ml-4 mr-20 w-[360px] pt-16"
          />
          <EditWishListCell id={id} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default EditWishListPage

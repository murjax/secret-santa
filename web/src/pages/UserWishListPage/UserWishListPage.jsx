import { MetaTags } from '@redwoodjs/web'

import Footer from 'src/components/Footer/Footer'
import WishListsCell from 'src/components/WishListsCell'

const UserWishListPage = ({ id }) => {
  return (
    <>
      <MetaTags title="UserWishList" description="UserWishList page" />

      <main className="bg-interior bg-no-repeat bg-turquoiseGreen">
        <div className="flex pb-80">
          <img
            src="/images/logo__secret-santa.svg"
            alt="Secret Santa"
            className="mb-10 ml-4 mr-20 w-[360px] pt-16"
          />
          <WishListsCell id={id} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default UserWishListPage

import { MetaTags } from '@redwoodjs/web'

import Footer from 'src/components/Footer/Footer'
import InviteCell from 'src/components/InviteCell'

const InvitePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Invite" description="Invite page" />

      <main className="bg-auth bg-turquoiseGreen">
        <img
          src="/images/logo__secret-santa.svg"
          alt="Secret Santa"
          className="mx-auto mb-10 w-[460px] pt-16"
        />
        <InviteCell id={id} />
        <Footer />
      </main>
    </>
  )
}

export default InvitePage

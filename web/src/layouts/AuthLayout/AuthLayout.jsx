import Footer from 'src/components/Footer/Footer'

const AuthLayout = ({ children }) => {
  return (
    <>
      <main className="bg-auth bg-turquoiseGreen">
        <img
          src="/images/logo__secret-santa.svg"
          alt="Secret Santa"
          className="mx-auto mb-10 w-[460px] pt-16"
        />
        {children}
        <Footer />
      </main>
    </>
  )
}

export default AuthLayout

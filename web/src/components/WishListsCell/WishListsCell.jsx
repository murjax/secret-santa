export const QUERY = gql`
  query UserWishListsQuery($id: Int!) {
    wishLists: wishListsByUser(userId: $id) {
      id
      name
      url
      siteImage
      siteTitle
      siteDescription
      user {
        name
        email
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ wishLists }) => {
  const user = wishLists[0]?.user

  return (
    <article className="pt-20 p-4 w-full h-screen bg-spanishGreen">
      <h2 className="text-6xl text-white ml-10">WISH LIST</h2>
      <div className="flex items-center">
        <p className="text-3xl text-white font-bold font-handwriting">For</p>
        <div className="bg-white p-4 m-2 w-full">
          <p className="text-2xl font-bold">{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="ml-10 mt-5">
        {wishLists.map((wishList, index) => {
          return (
            <div key={wishList.id}>
              <div className="flex justify-between">
                <h2 className="text-3xl text-white">
                  {index + 1}. {wishList.name}
                </h2>
                <a
                  className="bg-countyGreen text-white text-sm rounded-full py-2 px-3 mr-1 mb-2"
                  href={wishList.url}
                >
                  DETAILS
                </a>
              </div>
              <div className="flex justify-between text-white border">
                <div className="p-2">
                  <p>{wishList.url}</p>
                  <p className="text-2xl">{wishList.siteTitle}</p>
                  <p className="text-sm">{wishList.siteDescription}</p>
                </div>
                <img src={wishList.siteImage} alt="" />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

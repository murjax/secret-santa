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
        id
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
      <div className="flex justify-between items-center">
        <h2 className="text-6xl text-white ml-10">WISH LIST</h2>
        <a
          className="flex items-center bg-supernova text-sm rounded-full py-2 px-3 mr-1 mb-2"
          href="wish-list/edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 font-bold cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          EDIT
        </a>
      </div>
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

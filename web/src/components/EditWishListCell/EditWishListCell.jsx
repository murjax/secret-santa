import { useRef, useState, useEffect } from 'react'

import { Form, TextField, Submit } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query UserWishListsQuery {
    wishListsByCurrentUser {
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

const CREATE_WISH_LIST = gql`
  mutation CreateWishListMutation($input: CreateWishListInput!) {
    createWishList(input: $input) {
      id
    }
  }
`

const DELETE_WISH_LIST = gql`
  mutation DeleteWishListMutation {
    deleteWishListsByCurrentUser {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ wishListsByCurrentUser }) => {
  const [completedItems, setCompletedItems] = useState([])
  const [createWishList, { loading }] = useMutation(CREATE_WISH_LIST)
  const [deleteWishLists] = useMutation(DELETE_WISH_LIST)
  const itemsRef = useRef([])

  const onSubmit = async () => {
    await deleteWishLists()
    const promises = completedItems.map((item) => {
      return createWishList({
        variables: {
          input: {
            name: item.name,
            url: item.url,
          },
        },
      })
    })
    const result = await Promise.all(promises)

    console.log(result)

    navigate(routes.home())
  }

  useEffect(() => {
    console.log(wishListsByCurrentUser)
    const newItems = wishListsByCurrentUser.map((item) => {
      return {
        name: item.name,
        url: item.url,
      }
    })
    setCompletedItems(newItems)
  }, [wishListsByCurrentUser])

  useEffect(() => {
    completedItems.forEach((item, index) => {
      const ref = itemsRef.current[index]
      ref.name.value = item.name
      ref.url.value = item.url
    })
  }, [completedItems])

  return (
    <article className="pt-20 p-4 w-full">
      <h2 className="text-6xl text-white">WISH LIST</h2>
      <p className="text-3xl text-white font-bold font-handwriting">
        MAKE YOUR LIST AND CHECK IT TWICE
      </p>
      <div>
        <Form onSubmit={onSubmit}>
          {completedItems.map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-end w-4/5">
                  <TextField
                    placeholder={index + 1}
                    name="name"
                    ref={(el) => {
                      if (!itemsRef.current[index]) {
                        itemsRef.current[index] = {}
                      }
                      itemsRef.current[index].name = el
                    }}
                    className="rw-input p-4 placeholder-black font-handwriting text-2xl"
                  />
                  <TextField
                    placeholder="URL"
                    name="url"
                    ref={(el) => {
                      if (!itemsRef.current[index]) {
                        itemsRef.current[index] = {}
                      }
                      itemsRef.current[index].url = el
                    }}
                    className="rw-input p-4 placeholder-black font-handwriting text-2xl w-[90%]"
                  />
                </div>
                <button
                  className="bg-orangeRed border-2 rounded-full text-2xl text-white font-bold m-3 py-2 px-4 h-[40%]"
                  onClick={(e) => {
                    e.preventDefault()
                    completedItems.splice(index, 1)
                    setCompletedItems([...completedItems])
                  }}
                >
                  -
                </button>
              </div>
            )
          })}
          <div key={completedItems.length} className="flex items-center">
            <div className="flex flex-col items-end w-4/5">
              <TextField
                placeholder={completedItems.length + 1}
                name="name"
                ref={(el) => {
                  if (!itemsRef.current[completedItems.length]) {
                    itemsRef.current[completedItems.length] = {}
                  }
                  itemsRef.current[completedItems.length].name = el
                }}
                className="rw-input p-4 placeholder-black font-handwriting text-2xl"
              />
              <TextField
                placeholder="URL"
                name="url"
                ref={(el) => {
                  if (!itemsRef.current[completedItems.length]) {
                    itemsRef.current[completedItems.length] = {}
                  }
                  itemsRef.current[completedItems.length].url = el
                }}
                className="rw-input p-4 placeholder-black font-handwriting text-2xl w-[90%]"
              />
            </div>
            <button
              className="bg-spanishGreen border-2 rounded-full text-2xl text-white font-bold m-3 py-2 px-4 h-[40%]"
              onClick={(e) => {
                e.preventDefault()
                const ref = itemsRef.current[completedItems.length]
                const completedItem = {
                  name: ref.name.value,
                  url: ref.url.value,
                }
                completedItems.push(completedItem)
                setCompletedItems([...completedItems])
              }}
            >
              +
            </button>
          </div>
          <Submit
            disabled={loading}
            className="bg-supernova w-full border-2 rounded-full text-2xl font-handwriting font-bold my-3 py-2 px-6 mr-3"
          >
            SUBMIT
          </Submit>
        </Form>
      </div>
    </article>
  )
}

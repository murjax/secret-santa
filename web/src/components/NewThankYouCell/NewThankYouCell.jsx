import { useRef, useEffect } from 'react'

import { Form, TextAreaField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
  query CurrentUserPairingsQuery {
    currentUserPairings {
      id
      eventId
      personId
      santaId
      santa {
        name
        email
      }
    }
  }
`

const CREATE_THANK_YOU = gql`
  mutation CreateThankYouMutation($input: CreateThankYouInput!) {
    createThankYou(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ currentUserPairings }) => {
  const messageRef = useRef(null)
  const [create, { loading }] = useMutation(CREATE_THANK_YOU, {
    onCompleted: () => {
      navigate(routes.home())
    },
  })

  const currentPairing = currentUserPairings[currentUserPairings.length - 1]

  useEffect(() => {
    messageRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const input = {
      message: data.message,
      eventId: currentPairing.eventId,
      userId: currentPairing.personId,
      toUserId: currentPairing.santaId,
    }

    create({ variables: { input } })
  }

  return (
    <article className="pt-20 p-4 w-full">
      <h2 className="text-6xl text-white">THANK YOU</h2>

      <div className="flex items-center">
        <p className="text-3xl text-white font-handwriting mr-2">FOR</p>
        <div className="bg-white p-4 m-2 w-1/2">
          <p className="text-2xl font-bold">{currentPairing.santa.name}</p>
          <p>{currentPairing.santa.email}</p>
        </div>
      </div>
      <Form
        className="w-1/2 ml-16"
        onSubmit={onSubmit}
      >
        <TextAreaField
          placeholder="MESSAGE"
          name="message"
          className="rw-input p-4 placeholder-black font-handwriting text-2xl"
          errorClassName="rw-input rw-input-error"
          ref={messageRef}
          validation={{
            required: {
              value: true,
              message: 'Message is required',
            },
          }}
        />
        <FieldError name="name" className="rw-field-error" />
        <div className="rw-button-group">
          <Submit
            disabled={loading}
            className="bg-supernova w-full rounded-full text-2xl font-handwriting font-bold py-4"
          >
            SEND
          </Submit>
        </div>
      </Form>
    </article>
  )
}

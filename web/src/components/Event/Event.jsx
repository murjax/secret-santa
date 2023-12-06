import { useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'

const CREATE_INVITE = gql`
  mutation CreateInviteMutation($input: CreateInviteInput!) {
    createInvite(input: $input) {
      id
    }
  }
`

export const USER_BY_EMAIL_QUERY = gql`
  query FindUserByEmailQuery($email: String!) {
    user: userByEmail(email: $email) {
      id
      email
    }
  }
`

export const INVITES_BY_EVENT_QUERY = gql`
  query GetInvitesByEventQuery($eventId: Int!) {
    invites: invitesByEvent(eventId: $eventId) {
      id
      user {
        id
        email
      }
    }
  }
`
const Event = ({ event }) => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const [invitedUsers, setInvitedUsers] = useState([])

  const [createInvite, { loading }] = useMutation(CREATE_INVITE)
  const [getUserByEmail] = useLazyQuery(USER_BY_EMAIL_QUERY)
  const invitesQuery = useQuery(INVITES_BY_EVENT_QUERY, {
    variables: { eventId: event.id },
    onCompleted: (data) => {
      setInvitedUsers(data.invites.map((invite) => invite.user))
    },
  })

  function calculateWeeksAndDays(startDate) {
    if (!startDate) {
      return
    }

    startDate = moment(startDate)
    const endDate = moment()
    const duration = moment.duration(startDate.diff(endDate))
    const weeks = duration.weeks()
    const days = duration.days()

    let result = ''

    if (weeks > 0) {
      result += `${weeks} WEEK${weeks > 1 ? 'S' : ''}`
    }

    if (days > 0) {
      if (result !== '') {
        result += ' & '
      }
      result += `${days} DAY${days > 1 ? 'S' : ''}`
    }

    if (result === '') {
      result = '0 DAYS'
    }

    return result
  }

  const timeDiff = calculateWeeksAndDays(event.date)

  const onInviteSubmit = async ({ email }) => {
    const userData = await getUserByEmail({ variables: { email } })
    createInvite({
      variables: {
        input: {
          userId: userData.data.user.id,
          eventId: event.id,
          status: 'INVITED',
        },
      },
    })
  }

  return (
    <article className="mt-20">
      <div className="text-3xl text-white font-handwriting">
        {timeDiff} UNTIL
      </div>
      <h2 className="text-6xl text-white">{event.name.toUpperCase()}</h2>
      <p className="font-handwriting text-white mt-6">
        INVITE A FRIEND OR FAMILLY MEMBER
      </p>
      <div className="bg-spanishGreen mt-4">
        <div className="rw-form-wrapper">
          <Form className="flex" onSubmit={onInviteSubmit}>
            <TextField
              placeholder="NAME"
              name="name"
              className="p-4 m-3 placeholder-black font-handwriting text-2xl"
              errorClassName="rw-input-error"
              ref={nameRef}
              validation={{
                required: {
                  value: true,
                  message: 'Name is required',
                },
              }}
            />
            <FieldError name="name" className="rw-field-error" />

            <TextField
              placeholder="EMAIL"
              name="email"
              className="p-4 m-3 placeholder-black font-handwriting text-2xl"
              errorClassName="rw-input-error"
              ref={emailRef}
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
            />
            <FieldError name="email" className="rw-field-error" />

            <Submit
              disabled={loading}
              className="bg-supernova w-full border-2 rounded-full text-2xl font-handwriting font-bold my-3 py-2 px-6 mr-3"
            >
              +
            </Submit>
          </Form>
        </div>
      </div>

      <div className="mt-6 mb-6">
        {invitedUsers.map((invitedUser) => {
          return (
            <div
              className="bg-white p-4 m-2 font-bold text-2xl"
              key={invitedUser.id}
            >
              {invitedUser.email}
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default Event

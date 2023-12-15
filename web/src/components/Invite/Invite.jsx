import { useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { Form, PasswordField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const UPDATE_INVITE = gql`
  mutation UpdateInviteMutation($id: Int!, $input: UpdateInviteInput!) {
    updateInvite(id: $id, input: $input) {
      id
      status
    }
  }
`
export const INVITES_BY_EVENT_QUERY = gql`
  query GetInvitesByEventQuery($eventId: Int!) {
    invites: invitesByEvent(eventId: $eventId) {
      id
      name
      email
      status
      user {
        id
      }
    }
  }
`

export const PAIRINGS_BY_EVENT_QUERY = gql`
  query GetPairingsByEventQuery($eventId: Int!) {
    pairings: pairingsByEvent(eventId: $eventId) {
      id
      santa {
        id
        name
        email
      }
      person {
        id
        name
        email
      }
    }
  }
`

const CREATE_PAIRING = gql`
  mutation CreatePairingMutation($input: CreatePairingInput!) {
    createPairing(input: $input) {
      id
    }
  }
`

const EMAIL_PAIRING_MUTATION = gql`
  mutation EmailPairingMutation($id: Int!) {
    emailPairing(id: $id) {
      id
    }
  }
`

const Invite = ({ invite }) => {
  const [inviteStatus, setInviteStatus] = useState(null)
  const [updateInvite] = useMutation(UPDATE_INVITE)
  const [createPairing] = useMutation(CREATE_PAIRING)
  const [emailPairing] = useMutation(EMAIL_PAIRING_MUTATION)
  const [invitesByEventQuery] = useLazyQuery(INVITES_BY_EVENT_QUERY)
  const [getPairingsByEventId] = useLazyQuery(PAIRINGS_BY_EVENT_QUERY)
  const declineInvite = () => {
    updateInvite({
      variables: {
        id: invite.id,
        input: { status: 'DECLINED' },
      },
    })
    setInviteStatus('DECLINED')
  }
  const acceptInvite = () => {
    updateInvite({
      variables: {
        id: invite.id,
        input: { status: 'ACCEPTED' },
      },
    })
    setInviteStatus('ACCEPTED')
  }
  const { signUp } = useAuth()
  const onSignUpSubmit = async (data) => {
    const response = await signUp({
      name: invite.name,
      username: invite.email,
      password: data.password,
    })
    await updateInvite({
      variables: {
        id: invite.id,
        input: { userId: response.id },
      },
    })

    await processPairings()

    navigate(routes.home())
  }

  const processPairings = async () => {
    const result = await invitesByEventQuery({
      variables: { eventId: invite.event.id },
    })
    const invites = result.data.invites
    const allResponded = invites.every((invite) => invite.status != 'INVITED')
    if (!allResponded) {
      return
    }

    const acceptedInvites = invites.filter(
      (invite) => invite.status == 'ACCEPTED'
    )
    const pairableInvites = acceptedInvites.slice(0)
    shuffleArray(pairableInvites)
    const pairedInvites = groupIntoSets(pairableInvites, 2)
    await createPairings(pairedInvites)
    const pairingData = await getPairingsByEventId({
      variables: { eventId: invite.event.id },
    })
    await sendSantaEmails(pairingData.data.pairings)
  }

  const sendSantaEmails = async (pairings) => {
    pairings.forEach((pairing) => {
      emailPairing({
        variables: {
          id: pairing.id,
        },
      })
    })
  }

  const createPairings = async (pairedInvites) => {
    const promises = pairedInvites.map((item) => {
      return createPairing({
        variables: {
          input: {
            eventId: invite.event.id,
            santaId: item[0].user.id,
            personId: item[1].user.id,
          },
        },
      })
    })

    return Promise.all(promises)
  }

  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  const groupIntoSets = (array, setSize) => {
    const result = []

    for (let i = 0; i < array.length; i += setSize) {
      result.push(array.slice(i, i + setSize))
    }

    return result
  }

  if (inviteStatus === 'ACCEPTED') {
    return (
      <div className="flex flex-col items-center mb-40">
        <p className="text-3xl text-white font-handwriting">AWESOME!</p>
        <p className="text-6xl text-white">- SIGN UP -</p>
        <div className="rw-form-wrapper mt-2">
          <Form onSubmit={onSignUpSubmit}>
            <PasswordField
              placeholder="PASSWORD"
              name="password"
              className="rw-input p-4 placeholder-black font-handwriting text-2xl"
              errorClassName="rw-input rw-input-error"
              autoComplete="current-password"
              validation={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
              }}
            />

            <FieldError name="password" className="rw-field-error" />

            <div className="rw-button-group">
              <Submit className="bg-supernova w-full rounded-full text-2xl font-handwriting font-bold py-4">
                SUBMIT
              </Submit>
            </div>
          </Form>
        </div>
      </div>
    )
  }

  if (inviteStatus === 'DECLINED') {
    return (
      <div className="flex flex-col items-center mb-40">
        <p className="text-6xl text-white mt-20">- THANKS -</p>
        <p className="text-5xl text-white">YOU&apos;LL BE MISSED</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center mb-40">
      <p className="text-6xl text-white mt-20">- YOU&apos;RE INVITED TO -</p>
      <p className="text-5xl text-white">{invite.event.name}</p>
      <p className="text-3xl text-white font-handwriting">
        {moment(invite.event.date).format('MMMM DD, YYYY')}
      </p>

      <div className="flex w-3/5 justify-between">
        <button onClick={declineInvite}>
          <div className="relative inline-block align-middle bg-orangeRed rounded-full border-4 border-white p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
              />
            </svg>
          </div>

          <p className="inline-block align-middle -ml-4 px-6 py-1 w-60 text-2xl font-bold bg-white">
            Regretfully Decline
          </p>
        </button>

        <button onClick={acceptInvite}>
          <div className="relative inline-block align-middle bg-spanishGreen rounded-full border-4 border-white p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
          </div>

          <p className="inline-block align-middle -ml-4 px-6 py-5 w-60 text-2xl font-bold bg-white">
            I&apos;ll Be There!
          </p>
        </button>
      </div>
    </div>
  )
}

export default Invite

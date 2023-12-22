import { useRef, useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

import {
  Label,
  Form,
  TextField,
  DateField,
  CheckboxField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

export const FIND_EVENT_QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      id
      name
      date
      sendReminder
    }
  }
`

export const FIND_CURRENT_USER_QUERY = gql`
  query FindCurrentUserQuery {
    currentUser {
      id
      name
      email
    }
  }
`

const UPDATE_EVENT = gql`
  mutation UpdateEventMutation($id: Int!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      date
      sendReminder
    }
  }
`

const CREATE_INVITE = gql`
  mutation CreateInviteMutation($input: CreateInviteInput!) {
    createInvite(input: $input) {
      id
    }
  }
`

const DELETE_INVITE = gql`
  mutation DeleteInviteMutation($id: Int!) {
    deleteInvite(id: $id) {
      id
    }
  }
`

export const INVITES_BY_EVENT_QUERY = gql`
  query GetInvitesByEventQuery($eventId: Int!) {
    invites: invitesByEvent(eventId: $eventId) {
      id
      name
      email
    }
  }
`

const EMAIL_INVITE_MUTATION = gql`
  mutation EmailInviteMutation($id: Int!) {
    emailInvite(id: $id) {
      id
    }
  }
`

const EditEventModal = ({ event, isOpen, onClose, reloadEvent }) => {
  const nameRef = useRef(null)
  const dateRef = useRef(null)
  const sendReminderRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = event.name
      dateRef.current.value = moment(event.date).format('YYYY-MM-DD')
      sendReminderRef.current.value = event.sendReminder
    }
  }, [event, isOpen])

  const onSubmit = (data) => {
    data.sendReminder = data.sendReminder === 'true' || data.sendReminder === true
    updateEvent({ variables: { id: event.id, input: data } })
  }

  const [updateEvent, { loading }] = useMutation(UPDATE_EVENT, {
    onCompleted: () => {
      toast.success('Event updated successfully')
      reloadEvent()
      onClose()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  if (!isOpen) {
    return
  }

  return (
    <div
      className="bg-spanishGreen"
      style={{
        position: 'absolute',
        width: '80%',
        height: '100%',
        top: 0,
        right: 0,
        margin: 0,
        paddingTop: '50px',
        paddingLeft: '50px',
        paddingRight: '50px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="absolute top-0 right-0 w-6 text-2xl cursor-pointer" onClick={onClose}>
        X
      </div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <h2 className="text-6xl text-white mt-6">EVENT DETAILS</h2>
      <p className="text-2xl font-handwriting text-white">
        EDIT THE CURRENT EVENT
      </p>
      <div className="mt-6">
        <div className="rw-form-wrapper">
          <Form onSubmit={onSubmit}>
            <TextField
              placeholder="GROUP NAME"
              name="name"
              className="rw-input p-4 placeholder-black font-handwriting text-2xl"
              errorClassName="rw-input rw-input-error"
              ref={nameRef}
              validation={{
                required: {
                  value: true,
                  message: 'Group name is required',
                },
              }}
            />
            <FieldError name="name" className="rw-field-error" />

            <DateField
              name="date"
              className="rw-input p-4 placeholder-black font-handwriting text-2xl"
              errorClassName="rw-input rw-input-error"
              ref={dateRef}
              validation={{
                required: {
                  value: true,
                  message: 'Event date is required',
                },
              }}
            />
            <FieldError name="date" className="rw-field-error" />

            <div className="flex items-center mb-4 mt-2">
              <CheckboxField
                name="sendReminder"
                defaultChecked={false}
                className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                errorClassName="rw-input rw-input-error"
                ref={sendReminderRef}
              />
              <Label
                name="sendReminder"
                className="ms-2 text-2xl font-handwriting"
                errorClassName="rw-label rw-label-error"
              >
                SEND OUT A REMINDER BEFORE EVENT
              </Label>
            </div>

            <div className="rw-button-group">
              <Submit
                disabled={loading}
                className="bg-supernova w-full rounded-full text-2xl font-handwriting font-bold py-4"
              >
                UPDATE
              </Submit>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

const Event = ({ event }) => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const [invites, setInvites] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [adminView, setAdminView] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(event)

  const [createInvite, { loading }] = useMutation(CREATE_INVITE)
  const [deleteInvite] = useMutation(DELETE_INVITE, {
    onCompleted: () => {
      reloadInvitesQuery({ variables: { eventId: currentEvent.id } })
    },
  })
  const [getEventById] = useLazyQuery(FIND_EVENT_QUERY)

  useQuery(FIND_CURRENT_USER_QUERY, {
    onCompleted: (data) => setCurrentUser(data.currentUser),
  })

  const invitesQuery = useQuery(INVITES_BY_EVENT_QUERY, {
    variables: { eventId: currentEvent.id },
    onCompleted: (data) => {
      setInvites(data.invites)
    },
  })
  const [reloadInvitesQuery] = useLazyQuery(INVITES_BY_EVENT_QUERY, {
    onCompleted: (data) => {
      setInvites(data.invites)
    },
  })
  const [emailInvite] = useMutation(EMAIL_INVITE_MUTATION, {
    onCompleted: () => {
      toast.success('Email sent')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    const startDate = moment(event.date)
    const endDate = moment()
    const duration = moment.duration(startDate.diff(endDate))
    const days = duration.days()

    if (days < 0) {
      navigate(routes.newEvent({ eventPassed: true }))
    }
  }, [event])

  useEffect(() => {
    if (currentUser?.id == event.ownerId) {
      setAdminView(true)
    }
  }, [event, currentUser])

  const calculateWeeksAndDays = (startDate) => {
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

  const timeDiff = calculateWeeksAndDays(currentEvent.date)

  const onInviteSubmit = async ({ name, email }) => {
    const inviteData = await createInvite({
      variables: {
        input: {
          name,
          email,
          eventId: currentEvent.id,
          status: 'INVITED',
        },
      },
    })
    emailInvite({
      variables: {
        id: inviteData.data.createInvite.id,
      },
    })
    invitesQuery.refetch()
  }

  const reloadEvent = async () => {
    const result = await getEventById({ variables: { id: currentEvent.id } })
    setCurrentEvent(result.data.event)
  }

  return (
    <article className="mt-20">
      <div className="text-3xl text-white font-handwriting">
        {timeDiff} UNTIL
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-6xl text-white">
          {currentEvent.name.toUpperCase()}
        </h2>

        {adminView && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 font-bold cursor-pointer"
            onClick={() => setShowEditModal(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        )}
      </div>
      <p className="font-handwriting text-white mt-6">
        INVITE A FRIEND OR FAMILLY MEMBER
      </p>
      <div className="bg-spanishGreen mt-4 max-w-[50rem]">
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

      <div className="flex flex-wrap mt-6 mb-6 max-w-[50rem]">
        {invites.map((invite) => {
          return (
            <div className="bg-white p-4 m-2 w-2/5" key={invite.id}>
              <button
                className="text-right w-full"
                onClick={() => deleteInvite({ variables: { id: invite.id } })}
              >
                X
              </button>
              <p className="text-2xl font-bold">{invite.name}</p>
              <p>{invite.email}</p>
            </div>
          )
        })}
      </div>
      <EditEventModal
        event={currentEvent}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        reloadEvent={reloadEvent}
      />
    </article>
  )
}

export default Event

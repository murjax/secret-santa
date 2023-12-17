import { useRef, useEffect } from 'react'

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
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Footer from 'src/components/Footer/Footer'

const CREATE_EVENT = gql`
  mutation CreateEventMutation($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`

const NewEventPage = ({ eventPassed }) => {
  const nameRef = useRef(null)
  const dateRef = useRef(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const [create, { loading }] = useMutation(CREATE_EVENT, {
    onCompleted: (data) => {
      navigate(routes.event({ id: data.createEvent.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (data) => {
    create({ variables: { input: data } })
  }

  const formTitle = () => {
    if (eventPassed) {
      return (
        <>
          <p className="text-3xl text-white">
            YOUR EVENT HAS PAST, BUT YOU CAN
          </p>
          <p className="text-5xl text-white">SET UP A NEW EVENT</p>
        </>
      )
    }

    return (
      <p className="text-4xl text-white">- SET UP YOUR GROUP -</p>
    )
  }

  return (
    <>
      <MetaTags title="NewEvent" description="NewEvent page" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <main className="bg-auth bg-turquoiseGreen">
        <img
          src="/images/logo__secret-santa.svg"
          alt="Secret Santa"
          className="mx-auto mb-10 w-[460px] pt-16"
        />
        <div className="rw-login-container w-1/2">
          <div className="rw-form-wrapper">
            {formTitle()}
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
                  SUBMIT
                </Submit>
              </div>
            </Form>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default NewEventPage

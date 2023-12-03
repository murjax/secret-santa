import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <AuthLayout>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-login-container w-2/5">
          <div className="rw-form-wrapper">
            <p className="text-5xl text-white">- LOGIN -</p>
            <Form onSubmit={onSubmit}>
              <TextField
                placeholder="EMAIL"
                name="email"
                className="rw-input p-4 placeholder-black font-handwriting text-2xl"
                errorClassName="rw-input rw-input-error"
                ref={emailRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                }}
              />

              <FieldError name="email" className="rw-field-error" />

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
          <div className="rw-login-link">
            <Link to={routes.signup()} className="rw-link text-black">
              Need an account?
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default LoginPage

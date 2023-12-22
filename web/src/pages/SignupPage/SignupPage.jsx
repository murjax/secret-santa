import { useRef, useEffect, useState } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const SignupPage = () => {
  const [file, setFile] = useState()
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on name box on page load
  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const onSubmit = async (data) => {
    const base64Avatar = await getBase64(file)

    const response = await signUp({
      name: data.name,
      username: data.email,
      password: data.password,
      avatar: base64Avatar,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <>
      <MetaTags title="Signup" />

      <AuthLayout>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-login-container w-2/5">
          <div className="rw-form-wrapper">
            <Form onSubmit={onSubmit}>
              <TextField
                placeholder="NAME"
                name="name"
                className="rw-input p-4 placeholder-black font-handwriting text-2xl"
                errorClassName="rw-input rw-input-error"
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

              <div className="max-w-xl mt-4">
                <label
                  className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline">browse</span>
                    </span>
                    <div>{file?.name}</div>
                  </span>
                  <input
                    className="hidden"
                    type="file"
                    name="file_upload"
                    onChange={handleFileChange}
                    ref={fileRef}
                  />
                </label>
              </div>

              <div className="rw-button-group">
                <Submit className="bg-supernova w-full rounded-full text-2xl font-handwriting font-bold py-4">
                  SUBMIT
                </Submit>
              </div>
            </Form>
          </div>
          <div className="rw-login-link">
            <Link to={routes.login()} className="rw-link text-black">
              Ready to Login?
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default SignupPage

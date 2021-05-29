import { Formik, Form, Field } from 'formik'
import { useFirebase } from 'react-redux-firebase'
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator'
import { useAppDispatch } from '../state/hooks'
import { signup } from '../state/auth/auth'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'

import './SignupForm.css'
import { useState } from 'react'


const showError = (errorText: string) => {
  return (
    <div color='danger' className='ion-padding-start'>
      <small>{errorText}</small>
    </div>
  )
}

interface FormComponentProps {
  schema: object
}

interface SignupProps {
  firstName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignupForm: React.FC<FormComponentProps> = ({ schema }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const firebase = useFirebase()

  const [signupError, setSignupError] = useState()
  
  const signUp = async (props: SignupProps) => {
    await dispatch(signup({
      firstName: props.firstName,
      username: props.username,
      email: props.email,
      password: props.password,
      confirmPassword: props.confirmPassword
    }))
  }

  const handleBackNavigation = () => {
    history.goBack()
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        const sanitizedData = {
          firstName: validator.escape(data.firstName).trim(),
          username: validator.escape(data.username).trim(),
          email: validator.escape(data.email).trim(),
          password: validator.escape(data.password).trim(),
          confirmPassword: validator.escape(data.confirmPassword).trim()
        }
        setSubmitting(true)
        try {
          await signUp({
            firstName: sanitizedData.firstName,
            username: sanitizedData.username,
            email: sanitizedData.email,
            password: sanitizedData.password,
            confirmPassword: sanitizedData.confirmPassword
          })
          setSubmitting(false)
          resetForm()
        } catch (error) {
            setSignupError(error)
            console.log(signupError)
            setSubmitting(false)
        }

        if (!signupError) {
          history.push('/dashboard')
        }
      }}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form className='ion-padding'>
          <Field
              id='firstName'
              placeholder='First name'
              name='firstName'
              type='input'
              value={values.firstName}
              as={FormInput}
            />
            {errors.firstName && touched.firstName ? (
              showError(errors.firstName)
            ) : null}
          <Field
              id='username'
              placeholder='Choose a username'
              name='username'
              type='input'
              value={values.username}
              as={FormInput}
            />
            {errors.username && touched.username ? (
              showError(errors.username)
            ) : null}
          <Field
              id='email'
              placeholder='Enter email'
              name='email'
              type='email'
              value={values.email}
              as={FormInput}
            />
            {errors.email && touched.email ? (
              showError(errors.email)
            ) : null}
            <Field
              id='password'
              placeholder='Password'
              name='password'
              type='password'
              value={values.password}
              as={FormInput}
            />
            {errors.password && touched.password ? (
              showError(errors.password)
            ) : null}
            <Field
              id='confirm-password'
              placeholder='Confirm password'
              name='confirmPassword'
              type='password'
              value={values.confirmPassword}
              as={FormInput}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              showError(errors.confirmPassword)
            ) : null}
            <FormSubmit submitButtonText="Sign Up" conditional={isSubmitting} cancelButtonText='Cancel' cancelNav={handleBackNavigation}/>
            <div className="login-link-control">
              <div>
                <p>
                  Already registered? 
                  <Link 
                    to='/login' 
                    className="nav-link-custom"
                  > Login
                  </Link>
                </p>
              </div>
            </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm


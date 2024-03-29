import { Formik, Form, Field } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import validator from 'validator'
import { useAppDispatch } from '../state/hooks'
import { login } from '../state/auth/auth'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'
import LoadingSpinner from '../shared/LoadingSpinner'

import './LoginForm.css'



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

interface SignInProps {
  email: string
  password: string
}

const LoginForm: React.FC<FormComponentProps> = ({ schema }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const firebase = useFirebase()
  

  const signIn = async (props: SignInProps) => {
    const response: any = await dispatch(
      login({
        email: props.email,
        password: props.password
      })
    )
    if (!response.error) {
      history.replace('/dashboard')
    }
  }


  const handleBackNavigation = () => {
    history.goBack()
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        const sanitizedData = {
          email: validator.escape(data.email).trim(),
          password: validator.escape(data.password).trim(),
        }
        setSubmitting(true)
        await signIn({
          email: sanitizedData.email, 
          password: sanitizedData.password
        })
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ values, isSubmitting, errors, touched }) => (
        !isSubmitting ? (
          <Form>
              <Field
                id='email'
                placeholder='Email'
                name='email'
                type='input'
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
              <FormSubmit submitButtonText='Sign In' conditional={isSubmitting} cancelButtonText='Cancel' cancelNav={handleBackNavigation}/>
                <div className='signup-link-container'>
                  <p>
                    No account yet? 
                    <Link 
                      to='/signup' 
                      className="nav-link"
                    > Sign Up
                    </Link>
                  </p>
                </div>
          </Form>
          ) : (
            <div className='login-spinner-container'>
              <LoadingSpinner />
            </div>
          )
      )}
    </Formik>
  )
}

export default LoginForm


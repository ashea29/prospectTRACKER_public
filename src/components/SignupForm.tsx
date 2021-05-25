import { Formik, Form, Field } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'

import './SignupForm.css'


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

const SignupForm: React.FC<FormComponentProps> = ({ schema }) => {
  const history = useHistory()

  const handleBackNavigation = () => {
    history.goBack()
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        // console.log(data);
        const sanitizedData = {
          firstName: validator.escape(data.firstName).trim(),
          username: validator.escape(data.username).trim(),
          password: validator.escape(data.password).trim(),
          confirmPassword: validator.escape(data.confirmPassword).trim()
        }
        setSubmitting(true)
        await new Promise(() =>
          setTimeout(() => {
            console.log(sanitizedData)
            setSubmitting(false)
            resetForm()
          }, 2000)
        )
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
            {/* <IonRow>
              <IonCol>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </IonCol>
            </IonRow> */}
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm


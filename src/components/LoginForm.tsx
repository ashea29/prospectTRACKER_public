import { Formik, Form, Field } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'



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

const LoginForm: React.FC<FormComponentProps> = ({ schema }) => {
  const history = useHistory()

  const handleBackNavigation = () => {
    history.goBack()
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        // console.log(data);
        const sanitizedData = {
          username: validator.escape(data.username).trim(),
          password: validator.escape(data.password).trim(),
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
              id='username'
              placeholder='Username'
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
            <FormSubmit submitButtonText='Sign In' conditional={isSubmitting} cancelButtonText='Cancel' cancelNav={handleBackNavigation}/>
            <div className="ion-text-center ion-padding-top">
              <div>
                <p>
                  No account yet? 
                  <Link 
                    to='/signup-custom' 
                    className="nav-link-custom"
                  > Sign Up
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

export default LoginForm


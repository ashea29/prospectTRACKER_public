import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
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

const NewProspectForm: React.FC<FormComponentProps> = ({ schema }) => {
  const history = useHistory()

  const handleBackNavigation = () => {
    history.goBack()
  }

  return (
    <Formik
      initialValues={{
        companyName: '',
        address: '',
        website: '',
        jobTitle: '',
        contactPerson: '',
        email: '',
      }}
      validationSchema={schema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        // console.log(data);
        const sanitizedData = {
          firstName: validator.escape(data.companyName).trim(),
          address: validator.escape(data.address).trim(),
          website: validator.escape(data.website).trim(),
          jobTitle: validator.escape(data.jobTitle).trim(),
          contactPerson: validator.escape(data.contactPerson).trim(),
          email: validator.escape(data.email).trim()
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
              id='companyName'
              placeholder='Enter company name'
              name='companyName'
              type='input'
              value={values.companyName}
              as={FormInput}
            />
            {errors.companyName && touched.companyName ? (
              showError(errors.companyName)
            ) : null}
          <Field
              id='address'
              placeholder='Enter company address'
              name='address'
              type='input'
              value={values.address}
              as={FormInput}
            />
            {errors.address && touched.address ? (
              showError(errors.address)
            ) : null}
            <Field
              id='website'
              placeholder='Enter company website'
              name='website'
              type='input'
              value={values.website}
              as={FormInput}
            />
            {errors.website && touched.website ? (
              showError(errors.website)
            ) : null}
            <Field
              id='jobTitle'
              placeholder='Enter job title'
              name='jobTitle'
              type='input'
              value={values.jobTitle}
              as={FormInput}
            />
            {errors.jobTitle && touched.jobTitle ? (
              showError(errors.jobTitle)
            ) : null}
            <Field
              id='contactPerson'
              placeholder='Enter name of contact'
              name='contactPerson'
              type='input'
              value={values.contactPerson}
              as={FormInput}
            />
            {errors.contactPerson && touched.contactPerson ? (
              showError(errors.contactPerson)
            ) : null}
            <Field
              id='email'
              placeholder='Enter contact email'
              name='email'
              type='email'
              value={values.email}
              as={FormInput}
            />
            {errors.email && touched.email ? (
              showError(errors.email)
            ) : null}
            <FormSubmit submitButtonText="Add Prospect" conditional={isSubmitting} cancelButtonText='Cancel' cancelNav={handleBackNavigation}/>

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

export default NewProspectForm

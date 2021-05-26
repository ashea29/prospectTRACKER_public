import React, { useEffect } from 'react'
import * as yup from 'yup'
import SignupForm from '../components/SignupForm'
import { RootState } from '../state/configureStore'
import { useAppSelector } from '../state/hooks'

import './Signup.css'



const SignupSchema = yup.object().shape({
  firstName: yup.string()
    .required('Name is required'),
  username: yup.string()
    .required('Username is required'),
  email: yup.string()
    .required('Email is required'),
  password: yup.string()
    .min(7, 'Password must be at least 7 characters long')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm password is required'),
})

const Signup: React.FC = () => {
  const auth = useAppSelector((state) => state.firebase.auth)

  useEffect(() => {
    console.log('Auth: ', auth)
  }, [])
  
  return (
    <div className='signup-container'>
      <div className="signup-card">
        <SignupForm schema={SignupSchema}/>
      </div>
    </div>
  )
}

export default Signup

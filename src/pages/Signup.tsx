import React, { useEffect } from 'react'
import * as yup from 'yup'
import SignupForm from '../components/SignupForm'
import { selectAuthError, SET_AUTH_ERROR } from '../state/auth/auth'
import { useAppDispatch, useAppSelector } from '../state/hooks'

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

const Signup: React.FC = (props: any) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.firebase.auth)
  // const { state = {} } = props.location
  // const { from , message } = state

  const message = useAppSelector(selectAuthError)
  // useEffect(() => {
  //   dispatch(SET_AUTH_ERROR(null))
  // }, [])
  
  return (
    <div className='signup-container'>
      <div className="signup-card">
        {message &&
          <div className='redirect-message'>{message}</div>
        }
        <SignupForm schema={SignupSchema} authError={message}/>
      </div>
    </div>
  )
}

export default Signup

import React, { useEffect } from 'react'
import * as yup from 'yup'
import LoginForm from '../components/LoginForm'
import { useAppSelector } from '../state/hooks'

import './Login.css'


const LoginSchema = yup.object().shape({
  email: yup.string()
    .required('Email is required'),
  password: yup.string()
    .required('Password is required'),
})

const Login: React.FC = (props: any) => {
  const { state = {} } = props.location
  const { message } = state
  
  return (
    <div className='login-container'>
      <div className='login-card'>
        {message &&
          <div className='redirect-message'>{message}</div>
        }
        <LoginForm schema={LoginSchema}/>
      </div>
    </div>
  )
}

export default Login

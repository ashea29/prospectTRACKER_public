import React from 'react'
import * as yup from 'yup'
import LoginForm from '../components/LoginForm'

import './Login.css'


const LoginSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required'),
})

const Login: React.FC = () => {
  return (
    <div className='login-container'>
      <div className="login-card">
        <LoginForm schema={LoginSchema}/>
      </div>
    </div>
  )
}

export default Login

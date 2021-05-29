import { useState } from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'
import { selectIsAuthenticated } from '../state/auth/auth'
import { useAppDispatch, useAppSelector } from '../state/hooks'


const ProtectedRoute = ({ children, ...remainingProps }) => {
  const auth = useAppSelector((state) => state.firebase.auth)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  // const dispatch = useAppDispatch()
  const firebase = useFirebase()

  const currentUser = localStorage.getItem('session')

  return (
    <Route 
      {...remainingProps}
      render={({ location }) => 
        !auth.isEmpty || currentUser ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/login',
              state: { from: location, message: 'Login required'}
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute

import React from 'react'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'
import { useAppSelector } from '../state/hooks'


const ProtectedRoute = ({ children, ...remainingProps }) => {
  const auth = useAppSelector((state) => state.firebase.auth)

  return (
    <Route 
      {...remainingProps}
      render={({ location }) => 
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/login',
              state: { from: location}
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute

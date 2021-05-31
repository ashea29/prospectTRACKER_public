import { useState } from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'
import { selectIsAuthenticated } from '../state/auth/auth'
import { useAppSelector } from '../state/hooks'



const ProtectedRoute = ({ children, ...remainingProps  }) => {
  const auth = useAppSelector((state) => state.firebase.auth)

  return (
    <Route 
      {...remainingProps}
      render={({ location }) => 
        auth.isLoaded && !auth.isEmpty ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/login',
              state: {
                from: location,
                message: 'Login required'
              }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute

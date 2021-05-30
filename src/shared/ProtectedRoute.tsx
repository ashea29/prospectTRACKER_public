import { useState } from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'
import { selectIsAuthenticated } from '../state/auth/auth'
import { useAppDispatch, useAppSelector } from '../state/hooks'


// const Redirect = 


const ProtectedRoute = ({ children, ...remainingProps  }) => {
  const auth = useAppSelector((state) => state.firebase.auth)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  // const dispatch = useAppDispatch()
  const firebase = useFirebase()
  const instanceAuth = firebase.auth()

  const persistedState = JSON.parse(localStorage.getItem('persist:root'))
  const persistedFirebase = JSON.parse(persistedState.firebase)
  const authIsEmpty = persistedFirebase.auth.isEmpty
  // const authNotEmpty = instanceAuth.app.auth().currentUser
  // console.log(authIsEmpty)

  return (
    <Route 
      {...remainingProps}
      render={({ location }) => 
        !authIsEmpty /*|| currentUser*/ ? (
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

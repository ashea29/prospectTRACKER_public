import React, { useState } from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { selectIsAuthenticated, SET_AUTHENTICATED, SET_AUTH_ERROR } from '../state/auth/auth'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import './Header.css'



const Header = () => {
  const auth = useAppSelector((state) => state.firebase.auth)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const history = useHistory()
  const firebase = useFirebase()
  const dispatch = useAppDispatch()
  const instanceAuth = firebase.auth()

  // const currentUser = localStorage.getItem('session')
  const persistedState = JSON.parse(localStorage.getItem('persist:root'))
  const persistedFirebase = JSON.parse(persistedState.firebase)
  const authIsEmpty = persistedFirebase.auth.isEmpty
  // const authNotEmpty = instanceAuth.app.auth().currentUser
  // console.log(authIsEmpty)

  const logoutHandler = async () => {
    await Promise.resolve(dispatch(SET_AUTHENTICATED(false)))
    await Promise.resolve(dispatch(SET_AUTH_ERROR(null)))
    await Promise.resolve(localStorage.clear())
    await Promise.resolve(indexedDB.deleteDatabase('firebaseLocalStorageDb'))
    await firebase.logout()
    history.replace('/')
  }

  return (
    <React.Fragment>
      <header id='header'>
        <h1 id="title">prospect<span className='title-span'>TRACKER</span></h1>
        <nav id="menu" className="navbar">
          <ul>              
            {!authIsEmpty /*|| currentUser*/ ? (
                <React.Fragment>
                  <li id="dashboard"><Link to='/dashboard'>Dashboard</Link></li>
                  <li id="createProspect"><Link to='/new-prospect'>Add New Prospect</Link></li>
                  <li id='logout' onClick={logoutHandler}>Logout</li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li id="home"><Link to='/'>Home</Link></li>
                  <li id="login"><Link to='/login'>Login</Link></li>
                  <li id="sign_up"><Link to='/signup'>Sign Up</Link></li>
                </React.Fragment>
              )
            }
          </ul>
        </nav>
      </header>
    </React.Fragment>
  )
}

export default Header

import React from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { Link, useHistory } from 'react-router-dom'
import { logout, selectIsAuthenticated, SET_AUTHENTICATED, SET_AUTH_ERROR } from '../state/auth/auth'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import './Header.css'



const Header: React.FC = () => {
  const auth = useAppSelector((state) => state.firebase.auth)
  const history = useHistory()
  const dispatch = useAppDispatch()


  const logoutHandler = async () => {
    await Promise.resolve(dispatch(logout()))
    history.replace('/')
  }

  return (
    <React.Fragment>
      <header id='header'>
        <h1 id="title">prospect<span className='title-span'>TRACKER</span></h1>
        <nav id="menu" className="navbar">
          <ul>              
            {auth.isLoaded && !auth.isEmpty /*|| currentUser*/ ? (
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

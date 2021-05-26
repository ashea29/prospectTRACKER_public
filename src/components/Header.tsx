import React from 'react'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { Link, useHistory } from 'react-router-dom'
import { useAppSelector } from '../state/hooks'
import './Header.css'

const Header = () => {
  const auth = useAppSelector((state) => state.firebase.auth)
  const history = useHistory()
  const firebase = useFirebase()

  const logoutHandler = async () => {
    await firebase.logout()
    history.replace('/')
  }

  return (
    <React.Fragment>
      <header id='header'>
        <h1 id="title">prospect<span className='title-span'>TRACKER</span></h1>
        <nav id="menu" className="navbar">
          <ul>              
            {isLoaded(auth) && !isEmpty(auth) ? (
                <React.Fragment>
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

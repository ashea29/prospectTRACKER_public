import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <React.Fragment>
      <header id='header'>
        <h1 id="title">prospect<span className='title-span'>TRACKER</span></h1>
        <nav id="menu" className="navbar">
            <ul>
              {/* <span className="open-slide">
                <a id="btn-open" href="#" >
                  <svg width="30" height="24.5">
                    <path d="M0,5 27,5" stroke="#fff" stroke-width="3"/>
                    <path d="M0,14 27,14" stroke="#fff" stroke-width="3"/>
                    <path d="M0,23 27,23" stroke="#fff" stroke-width="3"/>
                  </svg>
                </a>
              </span> */}
                <li id="home"><Link to='/'>Home</Link></li>
                <li id="my_account"><Link to='/login'>Login</Link></li>
                <li id="sign_up"><Link to='/signup'>Sign Up</Link></li>
            </ul>
        </nav>
      </header>
    </React.Fragment>
  )
}

export default Header

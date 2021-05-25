import React from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'

import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'


const App: React.FC = () => {

  return (
    <React.Fragment>
      <Header />
      <main>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
      </main>
    </React.Fragment>
  )
}

export default App

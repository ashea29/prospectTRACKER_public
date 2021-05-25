import React from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Signup'
import NewProspect from './pages/NewProspect'

import './App.css'
import Login from './pages/Login'



const App: React.FC = () => {

  return (
    <React.Fragment>
      <Header />
     
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/new-prospect' component={NewProspect}/>
      
    </React.Fragment>
  )
}

export default App

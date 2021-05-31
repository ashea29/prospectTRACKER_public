import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
// import Home from './pages/Home'
const Home = React.lazy(() => import('./pages/Home'))
// import Login from './pages/Login'
const Login = React.lazy(() => import('./pages/Login'))
// import Signup from './pages/Signup'
const Signup = React.lazy(() => import('./pages/Signup'))
// import NewProspect from './pages/NewProspect'
const NewProspect = React.lazy(() => import('./pages/NewProspect'))
// import Dashboard from './pages/Dashboard'
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
// import ProspectDetails from './pages/ProspectDetails'
const ProspectDetails = React.lazy(() => import('./pages/ProspectDetails'))

import ProtectedRoute from './shared/ProtectedRoute'
import LoadingSpinner from './shared/LoadingSpinner'
import './App.css'



const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <ProtectedRoute exact path='/new-prospect'>
            <NewProspect />
          </ProtectedRoute>
          <ProtectedRoute exact path='/dashboard'>
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute exact path='/prospects/:companyName'>
            <ProspectDetails />
          </ProtectedRoute>
        </Switch>
      </Suspense>
    </React.Fragment>
  )
}

export default App

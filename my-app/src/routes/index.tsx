import * as React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import App from '../App'
import LoginPage from '../components/Login'

import { PrivateRoute } from './utils'

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Redirect from="/" to="/home" />
      <PrivateRoute path="/home" component={App} />
      <Route path="/login" component={LoginPage} />
    </Router>
  )
}
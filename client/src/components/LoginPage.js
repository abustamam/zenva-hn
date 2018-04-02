import React from 'react'
import LoginForm from './../containers/LoginForm'
import SignupForm from './../containers/SignupForm'
import { Div, H3 } from 'glamorous'

const Login = ({ history }) => (
  <Div>
    <H3>Login</H3>
    <LoginForm redirect={() => history.push('/')} />
    <H3>Sign Up</H3>
    <SignupForm redirect={() => history.push('/')} />
  </Div>
)

export default Login
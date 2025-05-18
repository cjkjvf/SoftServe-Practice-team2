import React from 'react'
import './Login.scss'
import FormLogin from './FormLogin'
import BackgroundImg from './BackgroundImg'

const Login = () => {
  return (
    <div className="login-cont">
      <BackgroundImg />
      <FormLogin />
    </div>
  )
}

export default Login

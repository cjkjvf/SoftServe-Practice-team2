import React, { useState } from 'react'
import './FormLogin.scss'

const FormLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      newErrors.email = 'Невірний формат email'
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
      newErrors.password =
        'Пароль мінімум 6 символів, з великою, малою буквою та цифрою'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = e => {
    e.preventDefault()
    if (validate()) {
      console.log('Форма валідна, можна відправляти дані')
      // TODO: Додати відправку на бекенд
    }
  }

  return (
    <div className="form-login-cont">
      <div className="form-login">
        <h1 className="title">Вхід до особистого кабінету</h1>

        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="text"
            placeholder="example123@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <div className="btn">
            <button
              className={`${Object.keys(errors).length === 0 && email && password ? 'active' : ''}`}
            >
              Продовжити
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormLogin

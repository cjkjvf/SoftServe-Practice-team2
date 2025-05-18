import React, { useState } from 'react'
import './FormRegister.scss'

const FormRegister = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!/^[a-zA-Z0-9]{3,}$/.test(userName)) {
      newErrors.userName =
        'Імʼя повинно містити мінімум 3 символи (букви або цифри)'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      newErrors.email = 'Невірний формат email'
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
      newErrors.password =
        'Пароль мінімум 6 символів, з великою, малою буквою та цифрою'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Паролі не співпадають'
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
    <div className="form-register-cont">
      <div className="form-register">
        <h1 className="title">Зареєструватися</h1>

        <form onSubmit={submit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          {errors.userName && <p className="error">{errors.userName}</p>}

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

          <label>Confirm password</label>
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <div className="btn">
            <button
              className={`${Object.keys(errors).length === 0 && userName && email && password && confirmPassword ? 'active' : ''}`}
            >
              Зареєструватись
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormRegister
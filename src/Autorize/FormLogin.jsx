import React, { useState } from 'react'
import './FormLogin.scss'
import { Link } from 'react-router-dom'

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
        <div className="additional">
          <div className="register-link">
            <Link to="/register">Зареєструватися </Link>
          </div>
          <button>або увійти за допомогою</button>
          <div className="list-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32ZM31.9539 23.4951C34.554 23.4951 36.3079 24.6199 37.3079 25.5597L41.2157 21.7387C38.8156 19.5047 35.6925 18.1333 31.9539 18.1333C26.5383 18.1333 21.8612 21.2456 19.5841 25.7755C18.6456 27.6551 18.1072 29.766 18.1072 32C18.1072 34.2341 18.6457 36.3449 19.5843 38.2245L24.0557 34.7587L19.5995 38.2247C21.8765 42.7544 26.5383 45.8667 31.9537 45.8667C35.6924 45.8667 38.8309 44.6341 41.1233 42.5079L36.754 39.1183C35.5847 39.9348 34.0155 40.5049 31.9537 40.5049C28.2921 40.5049 25.1844 38.086 24.0767 34.7425C23.7844 33.8797 23.6152 32.9552 23.6152 32C23.6152 31.0448 23.7844 30.1203 24.0613 29.2575C25.1844 25.9141 28.2923 23.4951 31.9539 23.4951ZM44.9544 29.4732C45.1544 30.336 45.2467 31.168 45.2467 32.3081C45.2467 36.5297 43.7388 40.0889 41.1233 42.5079L36.754 39.1183C38.6001 37.824 39.4311 35.8981 39.5849 34.6193H31.9539V29.4732H44.9544Z"
                fill="#E8590C"
              />
            </svg>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32ZM37.2096 18.882C38.4315 17.3047 39.3576 15.0755 39.0227 12.8C37.0257 12.9388 34.6916 14.2164 33.3296 15.8817C32.0881 17.3907 31.0677 19.6353 31.4663 21.8139C33.6493 21.8821 35.9024 20.5737 37.2096 18.882ZM46.9161 25.3692C40.6276 28.8364 41.6457 37.8701 48 40.2867C47.1264 42.2339 46.7059 43.104 45.5805 44.8288C44.0105 47.2365 41.7968 50.2345 39.0511 50.2565C37.9223 50.2688 37.1816 49.9271 36.3828 49.5587C35.4569 49.1317 34.4532 48.6687 32.6771 48.6793C30.9112 48.6888 29.8915 49.1461 28.9531 49.5669C28.1333 49.9347 27.3757 50.2744 26.2373 50.2632C23.4937 50.2389 21.3961 47.5339 19.8261 45.1263C15.4337 38.3988 14.9717 30.5017 17.6803 26.3011C19.6072 23.3184 22.6464 21.5737 25.5016 21.5737C27.0229 21.5737 28.2488 22.0133 29.4171 22.4323C30.4801 22.8133 31.4955 23.1775 32.642 23.1775C33.7029 23.1775 34.5753 22.8452 35.5269 22.4828C36.6688 22.0479 37.9249 21.5693 39.7583 21.5693C42.3027 21.5693 44.998 22.9637 46.9161 25.3692Z"
                fill="#E8590C"
              />
            </svg>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="32" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0ZM35.3355 33.4056V50.8153H28.1321V33.4063H24.5333V27.4068H28.1321V23.8048C28.1321 18.9104 30.1643 16 35.9376 16H40.7441V22.0001H37.7397C35.4923 22.0001 35.3436 22.8385 35.3436 24.4033L35.3355 27.4061H40.7781L40.1413 33.4056H35.3355Z"
                fill="#E8590C"
              />
            </svg>
          </div>
          <div className="beck-to-site">
            <Link to="/">Повернутись на сайт</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
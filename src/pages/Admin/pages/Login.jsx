import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Введіть ім\'я користувача';
    }

    // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
    //   newErrors.password =
    //     'Пароль мінімум 6 символів, з великою, малою буквою та цифрою';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/api/admin/login', {
          username,
          password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
      } catch (err) {
        setErrors({ ...errors, general: 'Неправильний логін або пароль' });
      }
    }
  };

  return (
    <div className='loginWrapper'>
      <div className="background-img"></div>
      <div className="form-login-cont">
        <div className="form-login">
          <form onSubmit={submit}>
            <h1 className="title">Вхід до особистого кабінету</h1>
            <div className='formMainElement'>
              <label>Логін</label>
              <input
                type="text"
                placeholder="Введіть логін"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className='formMainElement'>
              <label>Пароль</label>
              <input
                type="password"
                placeholder="Введіть пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className='formMainElement'>{errors.general && <p className="error">{errors.general}</p>}</div>
            <div className="btn">
              <button
                className={`${Object.keys(errors).length === 0 && username && password ? 'active' : ''}`}
              >
                Продовжити
              </button>
            </div>
            <div className='additional'>
              <div className="beck-to-site">
                <Link to="/">Повернутись на сайт</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

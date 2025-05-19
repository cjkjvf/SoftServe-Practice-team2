import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Неправильний логін або пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Вхід для адміністратора</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Ім'я користувача</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Увійти</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
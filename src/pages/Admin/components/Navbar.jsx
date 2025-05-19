import { useNavigate, Outlet } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1>Адмін-панель Кінотеатру</h1>
          {token && (
            <div className="navbar-links">
              <a href="/admin/movies">Фільми</a>
              <a href="/admin/casts">Актори</a>
              <a href="/admin/halls">Зали</a>
              <a href="/admin/screenings">Сеанси</a>
              <button onClick={handleLogout}>Вийти</button>
            </div>
          )}
        </div>
      </nav>

      {/* 🔽 Ось сюди виводиться Dashboard або інші сторінки */}
      <Outlet />
    </>
  );
}

export default Navbar;

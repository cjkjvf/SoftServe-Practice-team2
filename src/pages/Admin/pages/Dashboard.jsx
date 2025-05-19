import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Ласкаво просимо до адмін-панелі</h2>
      <p>
        Використовуйте меню для управління фільмами, акторами, залами та сеансами.
      </p>
      <div className="dashboard-grid">
        <Link to="/admin/movies" className="dashboard-card">
          <h3>Фільми</h3>
          <p>Керувати списком фільмів</p>
        </Link>
        <Link to="/admin/casts" className="dashboard-card">
          <h3>Актори</h3>
          <p>Керувати акторським складом</p>
        </Link>
        <Link to="/admin/halls" className="dashboard-card">
          <h3>Зали</h3>
          <p>Керувати залами кінотеатру</p>
        </Link>
        <Link to="/admin/screenings" className="dashboard-card">
          <h3>Сеанси</h3>
          <p>Керувати розкладом сеансів</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

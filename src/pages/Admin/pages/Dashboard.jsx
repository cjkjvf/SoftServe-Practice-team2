import { Link } from 'react-router-dom';
import './UnifiedStyles.css';

function Dashboard() {
  return (
    <div className="container">
      <h2>Ласкаво просимо до адмін-панелі</h2>
      <div className="grid">
        <Link to="/admin/movies" className="card">
          <h3>Фільми</h3>
          <p>Керувати списком фільмів</p>
        </Link>
        <Link to="/admin/casts" className="card">
          <h3>Актори</h3>
          <p>Керувати акторським складом</p>
        </Link>
        <Link to="/admin/halls" className="card">
          <h3>Зали</h3>
          <p>Керувати залами кінотеатру</p>
        </Link>
        <Link to="/admin/screenings" className="card">
          <h3>Сеанси</h3>
          <p>Керувати розкладом сеансів</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
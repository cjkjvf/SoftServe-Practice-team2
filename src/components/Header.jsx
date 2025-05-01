import "../styles/Header.css";
import poster from "../assets/mission-impossible.png";

export default function Header() {
  return (
    <header className="hero">
      <img className="hero-bg" src={poster} alt="Mission Impossible" />

      <div className="hero-overlay">
        <div className="hero-nav">
          <div className="logo">🎬</div>
          <nav className="nav-icons">
            <span>🔍</span>
            <span>👤</span>
            <span>☰</span>
          </nav>
        </div>

        <div className="hero-content">
          <div className="indicator">
            <span>↑</span>
            <span className="active">01</span>
            <span>15</span>
            <span>↓</span>
          </div>

          <div className="hero-info">
            <h1>
              МІСІЯ НЕМОЖЛИВА: РОЗПЛАТА.
              <br />
              ЧАСТИНА ПЕРША
            </h1>
            <p>
              Ітан Хант на чолі групи оперативників, береться за справу. Цього
              разу їм знову доведеться, ризикуючи життям, рятувати світ від
              халепи.
            </p>
            <button>Обрати сеанс</button>
          </div>

          <div className="hero-details">
            <p>7.6 IMDB • 2023 • Динамічний екшн</p>
            <p>163 хв. • Від 16 років • 2D</p>
          </div>
        </div>
      </div>
    </header>
  );
}

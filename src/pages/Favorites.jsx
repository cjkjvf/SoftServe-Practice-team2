import { Search, User, Menu, Home } from "lucide-react"
import { Link } from "react-router-dom"
import "../styles/favorites.css";


export default function Favorites() {
    return (
        <div className="favorites-container">
            
            <div className="circle-yellow"></div>
            <div className="circle-blue"></div>

            {/* Бокова навігація */}
            <div className="sidebar-nav">
                <Link to="/favorites" className="nav-link">
                    <Home size={16} />
                    <span>Мої обрані</span>
                </Link>
            </div>

            {/* Основний контент */}
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="image-container">
                        <img src="src/assets/watchlist-no-items.png" alt="Порожня колекція фільмів" className="empty-state-image" />
                    </div>

                    <p className="message">Схоже ти ще не маєш жодного фільму. Перейди в</p>
                    <p className="mb-4">
                        <Link to="/catalog" className="catalog-link">
                            каталог фільмів
                        </Link>
                        <span className="message"> та додай фільми в обрані</span>
                    </p>
                </div>
            </main>
        </div>
    )
}

import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom"; // 🟡 додано useNavigate
import { Search, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import FullscreenMenu from "../components/FullscreenMenu";

export default function Header({ onSearchClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const navigate = useNavigate(); // 🟡 ініціалізуємо навігацію

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsMenuOpen(false);
          setIsClosing(false);
        }, 400);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="hero section">
        <div className="hero-nav">
          <Link to="/" className="logo">MIRAGE</Link>
          <nav className="nav-icons">
            {/* <span className="icon-circle"><Search size={20} /></span> */}

            <span
              className="icon-circle"
              onClick={onSearchClick}
              style={{ cursor: 'pointer' }}
            >
              <Search size={20} />
            </span>
            <span
              className="icon-circle"
              onClick={() => navigate("/login")}
              style={{ cursor: 'pointer' }}
            >
              <User size={20} />
            </span>

            <span className="icon-circle" onClick={() => setIsMenuOpen(true)}>
              <Menu size={20} />
            </span>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <FullscreenMenu onClose={handleClose} isClosing={isClosing} />
      )}
    </>
  );
}
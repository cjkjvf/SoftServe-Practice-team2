import { User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FullscreenMenu from "../../components/FullscreenMenu";
import "../../styles/Header.css";

export default function HeaderBooking() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
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
      if (e.key === "Escape" && isMenuOpen) handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="booking-header">
        <div className="booking-logo-wrapper">
          <Link to="/" className="logo">MIRAGE</Link>
        </div>
        <nav className="nav-icons">
          <span className="icon-circle"><User size={20} /></span>
          <span className="icon-circle" onClick={() => setIsMenuOpen(true)}>
            <Menu size={20} />
          </span>
        </nav>
      </header>

      {isMenuOpen && (
        <FullscreenMenu onClose={handleClose} isClosing={isClosing} />
      )}
    </>
  );
}

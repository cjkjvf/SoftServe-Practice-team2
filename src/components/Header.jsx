import "../styles/Header.css";
import { Search, User, Menu } from "lucide-react";

export default function Header() {
  return (
    
    <header className="hero section">

      <div className="hero-nav">
        <div className="logo">MIRAGE</div> 
        <nav className="nav-icons">
          <span className="icon-circle"><Search size={20} /></span>
          <span className="icon-circle"><User size={20} /></span>
          <span className="icon-circle"><Menu size={20} /></span>
        </nav>
      </div>
    </header>
  );
}


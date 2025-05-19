import "../styles/Footer.css"
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="footer section">
      <div className="container">
        <nav className="footer-nav">
          <Link to="/">MAIN PAGE</Link>
          <a href="#">SESSIONS PAGE</a>
          <a href="#">CONTACT US</a>
          <a href="#">COOKIES</a>
          <a href="#">PRIVACY</a>
        </nav>
        <p className="footer-copy">© 2025 MAXON COMPUTER GMBH.</p>
      </div>
    </footer>
  );
}


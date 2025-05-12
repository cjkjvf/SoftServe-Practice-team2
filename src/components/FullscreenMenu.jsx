import "../components/FullscreenMenu.css";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaTelegram,
} from "react-icons/fa";

export default function FullscreenMenu({ onClose, isClosing }) {
  // Масив колонок
  const menuColumns = [
    {
      title: "Дивись кіно",
      links: [
        { title: "Зараз у кіно", to: "/now" },
        { title: "Продаж відкрито", to: "/sale" },
        { title: "Скоро у кіно", to: "/soon" },
        { title: "Зараз онлайн", to: "/online" },
      ],
    },
    {
      title: "Інформація",
      links: [
        { title: "Кінотеатри", to: "/cinemas" },
        { title: "Знижки", to: "/discounts" },
        { title: "Політика", to: "/policy" },
      ],
    },
    // додати ще колонки тут 
  ];

  return (
    <div className={`fullscreen-menu ${isClosing ? "closing" : ""}`}>
      <button className="close-btn btn-circle" onClick={onClose}>
        <X size={28} />
      </button>

      <div className="menu-content">
        {menuColumns.map((column, columnIndex) => (
          <div className="menu-column" key={columnIndex}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      isActive ? "menu-link active" : "menu-link"
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="socials-section">
        <h3>Наші соцмережі</h3>
        <div className="social-icons">
          <a href="https://www.youtube.com/@kino-stalker674" target="_blank" rel="noopener noreferrer"><FaYoutube size={26} /></a>
          <a href="https://x.com/AUGDreamer" target="_blank" rel="noopener noreferrer"><FaTwitter size={26} /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={26} /></a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={26} /></a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok size={26} /></a>
          <a href="https://t.me/MIRAGE2351" target="_blank" rel="noopener noreferrer"><FaTelegram size={26} /></a>
        </div>
      </div>
    </div>
  );
}






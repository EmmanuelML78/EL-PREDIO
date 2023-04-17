import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import icon from "../../assets/icon.png";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={icon} alt="cancha" style={{ height: "5rem" }} />
        </Link>
        <h1 className="nav-title">El Predio</h1>
        <div className="user">
          <Link style={{color: 'white'}} to="/dashboard">
            <FaUser />
          </Link>
        </div>
      </div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/reservas" className="nav-link">
              Reservas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className="nav-link">
              Contacto
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-link">
              Nosotros
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-link">
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

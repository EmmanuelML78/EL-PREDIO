<<<<<<<<< Temporary merge branch 1
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
          <img
            src={icon}
            alt="cancha"
            style={{ height: "5rem", width: "5rem" }}
          />
        </Link>
        <Link to="/home">
          <h1 className="nav-title">El Predio</h1>
        </Link>
        <div className="user">
          <Link style={{ color: "white" }} to="/dashboard">
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
=========
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.contenedor}>
        <div className={styles.barra}>
          <div className={styles.logo}>
            <h1 className={styles.nombresitio}>
              ElPredio<span>Fútbol</span>
            </h1>
          </div>
          <div className={styles.contacto}>
            <a className={styles.telefono} href="">
              01-800-0000-000
            </a>

            <nav className={styles.navegacion}>
              {/* <a href="#">Inicio</a> */}
              <a href="#">Nosotros</a>
              <a href="#">Mis reservas</a>
              <a href="#">Promociones</a>
              <a href="#">Contacto</a>
              <a href="#">Dashboard</a>
            </nav>
          </div>
        </div>
      </div>
      <form className={styles.formulario}>
        <div className={styles.campo}>
          <label className={styles.label} for="N°dejugadores">
            N° de jugadores
          </label>
          <input
            type="number"
            className={styles.input}
            id="N°dejugadores"
            placeholder="¿Cuántos juegan?"
          />
        </div>

        <div className={styles.campo}>
          <label className={styles.label} for="fecha">
            Fecha
          </label>
          <input type="date" className={styles.input} id="fecha" />
        </div>

        <div className={styles.campo}>
          <label className={styles.label} for="hora">
            Horario
          </label>
          <input type="time" className={styles.input} id="hora" />
        </div>

        <div className={styles.campo}>
          <input
            type="submit"
            className={styles.submit}
            value="Buscar cancha"
          />
        </div>
      </form>
    </header>
    );
>>>>>>>>> Temporary merge branch 2
}

export default Header;

import React from "react";

import styles from "./Navbar.module.css";
// import styled from "styled-components";
import {Link} from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.contenedor}>
          <div className={styles.barra}>
            <div className={styles.logo}>
              <Link to="/home">
                <h1 className={styles.nombresitio}>
                  ElPredio<span>Fútbol</span>
                </h1>
              </Link>
            </div>
            <div className={styles.contacto}>
              <span className={styles.telefono} href="">
                01-800-0000-000
              </span>

              <nav className={styles.navegacion}>
                {/* <a href="#">Inicio</a> */}
                <Link to="/nosotros">Nosotros</Link>
                <a href="#">Mis reservas</a>
                <a href="#">Promociones</a>
                <Link to="/contactos">Contacto</Link>
                <Link to="/dashboard">Dashboard</Link>
                <a onClick="">Cerrar sesion</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;

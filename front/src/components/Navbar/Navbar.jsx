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
                <a href="#">Canchas</a>
                <a href="/nosotros">Nosotros</a>
                <a href="#">Contacto</a>
                <a href="#">Perfil</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;

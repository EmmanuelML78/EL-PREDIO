import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { setUser, logoutUser } from "../../redux/actions/authActions";
import { connect, useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setUser());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutUser();
    window.location.href = "/"
    toast.success("¡Has cerrado sesión correctamente!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
      <Carousel />
      <header className={styles.header}>
        <div className={styles.contenedor}>
          <div className={styles.barra}>
            <div className={styles.logo}>
              <Link to="/home" style={{color: "white"}}>
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
                <Link to="/misreservas">Mis reservas</Link>
                <a href="#">Promociones</a>
                <Link to="/contactos">Contacto</Link>
                <Link to="/dashboard">{user && user.isAdmin ? "Administración" : "Perfil"}</Link>
                <a style={{cursor: "pointer"}} onClick={handleLogout}>Salir</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default connect(null, { logoutUser })(Header);

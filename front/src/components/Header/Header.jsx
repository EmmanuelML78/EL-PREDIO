import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { setUser, logoutUser } from "../../redux/actions/authActions";
import { connect, useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSignInAlt } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setUser());
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    // localStorage.removeItem("token");
    await dispatch(logoutUser());
    // window.location.href = "/";
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
              <Link to="/home" style={{ color: "white" }}>
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
                {user ? <Link to="/misreservas">Mis reservas</Link> : null}
                <a href="#">Promociones</a>
                <Link to="/contactos">Contacto</Link>
                {user ? (
                  <Link to="/dashboard">
                    {user && user.isAdmin ? "Administración" : "Perfil"}
                  </Link>
                ) : null}
                {user ? (
                  <a
                    href="#"
                    onClick={handleLogout}
                    style={{ display: "flex", placeItems: "center" }}
                  >
                    <FaSignInAlt style={{ marginRight: "1rem" }} />
                    Salir
                  </a>
                ) : (
                  <Link to="/login">
                    <p style={{ display: "flex", placeItems: "center" }}>
                      <FaSignInAlt style={{ marginRight: "1rem" }} />
                      Ingresar
                    </p>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default connect(null, { logoutUser })(Header);

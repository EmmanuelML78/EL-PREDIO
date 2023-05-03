import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../../redux/actions/authActions";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setUser());
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
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
                +54 1123934043
              </span>

              <nav className={styles.navegacion}>
                {/* <Link to="/nosotros">Nosotros</Link> */}
                <Link to="/misreservas">Mis reservas</Link>
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
};
export default Navbar;

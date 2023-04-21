import styles from "./Header.module.css";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Header() {
  return (
    <>  
    <Carousel/>
      <header className={styles.header}>
        <div className={styles.contenedor}>
          <div className={styles.barra}>
            <div className={styles.logo}>
              <h1 className={styles.nombresitio}>
                ElPredio<span>Fútbol</span>
              </h1>
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
              </nav>
            </div>
          </div>
        </div>
        
      </header>
    </>
  );
}

export default Header;

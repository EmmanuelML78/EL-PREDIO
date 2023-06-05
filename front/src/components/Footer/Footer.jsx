import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenedorfootergrid}>
        <div className={styles.footerwidget}>
          <h1>
            ElPredio<span>Fútbol</span>
          </h1>
        </div>

        <div className={styles.footerwidget}>
          <h3>Dirección</h3>
          <p>José Leon Suarez 1815, Los Polvorines</p>
        </div>

        <div className={styles.footerwidget}>
          <h3>Teléfono</h3>
          <p>+54 1123934043</p>
        </div>

        <div className={styles.footerwidget}>
          <h3>Redes</h3>
          <div className={styles.redsocial}>
            <a
              href="https://instagram.com/canchaselpredio?igshid=YmMyMTA2M2Y="
              className="fa fa-instagram"
            ></a>
            <a href="" className="fa fa-twitter"></a>
            <a href="" className="fa fa-facebook"></a>
          </div>
        </div>

        <div style={{display:"flex", placeItems:"center"}}>
          <Link to="/nosotros">
            <a className={styles.devs}>Desarrolladores</a>
          </Link>
        </div>
      </div>

      <div className={styles.divsmall}>
        <small>
          &copy; 2023 El Predio Fútbol - Todos los derechos Reservados
        </small>
      </div>
    </footer>
  );
};

export default Footer;

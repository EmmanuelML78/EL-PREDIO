import styles from './Footer.module.css'

const Footer = () => {
return (
    <footer className={styles.footer}>
    <div className={styles.contenedorfootergrid}>
        <div className={styles.footerwidget}>
        <h1>ElPredio<span>Fútbol</span></h1>
        </div>

        <div className={styles.footerwidget}>
        <h3>Dirección</h3>
        <p>Las Heras 1500</p>
        </div>

        <div className={styles.footerwidget}>
        <h3>Teléfono</h3>
        <p>0-800-0000-000</p>
        </div>

        <div className={styles.footerwidget}>
        <h3>Redes</h3>
        <div className={styles.redsocial}>
            <a href="" class="fa fa-instagram"></a>
            <a href="" class="fa fa-twitter"></a>
            <a href="" class="fa fa-facebook"></a>
        </div>
        </div>

        <div className={styles.footerwidget}>
        <h3>Desarrolladores</h3>
        <p>anonimous@gmail.com</p>
        </div>
    </div>

    <div className={styles.divsmall}>
        <small>&copy; 2023 El Predio Fútbol - Todos los derechos Reservados</small>
    </div>
    </footer>
);
};

export default Footer;
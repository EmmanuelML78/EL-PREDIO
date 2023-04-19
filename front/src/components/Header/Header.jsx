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
            <a className={styles.telefono} href="">01-800-0000-000</a>

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
            <label className={styles.label} for="N°dejugadores">N° de jugadores</label>
            <input type="number" className={styles.input} id="N°dejugadores" placeholder="¿Cuántos juegan?"/>
        </div>

        <div className={styles.campo}>
            <label className={styles.label} for="fecha">Fecha</label>
            <input type="date" className={styles.input} id="fecha"/>
        </div>

        <div className={styles.campo}>
            <label className={styles.label} for="hora">Horario</label>
            <input type="time" className={styles.input} id="hora"/>
        </div>

        <div className={styles.campo}>
            <input type="submit" className={styles.submit} value="Buscar cancha"/>
        </div>

        </form>
    </header>
    );
}

export default Header;

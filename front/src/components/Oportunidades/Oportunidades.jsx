import styles from "./Oportunidades.module.css";

export const Oportunidades = () => {
  return (
    <main className={styles.contenedormodelos}>
      <h1>Servicios</h1>
      <p>Descubre lo mejor que tenemos para tí.</p>

      <div className={styles.listadopromociones}>
        <div className={styles.filauno}>
          <div className={styles.vestuarios}>
            <h3>Vestuarios y Duchas</h3>
          </div>

          <div className={styles.buffet}>
            <h3>Buffet</h3>
          </div>
        </div>

        <div className={styles.filados}>
          <div className={styles.parrillas}>
            <h3>Parrillas</h3>
          </div>
          <div className={styles.social}>
            <h3>Eventos Sociales</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

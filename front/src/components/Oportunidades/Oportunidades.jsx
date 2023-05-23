import styles from "./Oportunidades.module.css";

export const Oportunidades = () => {
  return (
    <main className={styles.contenedormodelos}>
      <h1>Servicios</h1>
      <p>Descubre lo mejor que tenemos para tí.</p>

      <div className={styles.listadopromociones}>
        <div className={styles.promouno}>
          <div className={styles.conte}>
            <h3>Vestuarios y Duchas</h3>
          </div>
        </div>

        <div className={styles.promodos}>
          <div className={styles.conte}>
            <h3>Buffet</h3>
          </div>
        </div>

        <div className={styles.promotres}>
          <div className={styles.conte}>
            <h3>Parrillas</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

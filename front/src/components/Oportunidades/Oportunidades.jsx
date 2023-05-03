import styles from "./Oportunidades.module.css";

export const Oportunidades = () => {
  return (
    <main className={styles.contenedormodelos}>
      <h1>Oportunidades</h1>
      <p>Descubrí las promociones de la semana.</p>

      <div className={styles.listadopromociones}>
        <div className={styles.promouno}>
          <h3>bebidas energeticas para que no te deshidrates</h3>
        </div>

        <div className={styles.promodos}>
          <h3>servicio de cantina para los que siguen en el tercertiempo </h3>
        </div>

        <div className={styles.promotres}>
          <h3>se venden accesorios y equipos para que brille tu equipo</h3>
        </div>
      </div>
    </main>
  );
};

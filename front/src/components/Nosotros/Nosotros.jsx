import styles from "./Nosotros.module.css";

export const Nosotros = () => {
  return (
    <section className={styles.sobrepredio}>
      <div className={styles.contenedorgrid}>
        <div className={styles.texto}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <h2>Sobre nosotros</h2>
              <p>
                Disfruta de un predio extraordinario, ubicado en pleno Palermo.
              </p>

              <p>
                Te ofrecemos las mejores canchas de futbol 5, 7, 9 y 11 con
                césped sintético de última generación, además de exclusivos
                servicios adicionales como el uso sin cargo de nuestras
                instalaciones para que tu experiencia sea única. Para tu
                seguridad, contamos con personal médico presente en el complejo
                durante todos los turnos.
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d520.1804708184757!2d-58.70031747528377!3d-34.52025983695062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbd250a408b9d%3A0xc17ee090b5fa387b!2sJos%C3%A9%20Le%C3%B3n%20Su%C3%A1rez%201815%2C%20Los%20Polvorines%2C%20Provincia%20de%20Buenos%20Aires!5e1!3m2!1ses-419!2sar!4v1683044793712!5m2!1ses-419!2sar"
              style={{
                border: "0",
                minWidth: "600px",
                height: "300px",
                marginLeft: "8rem",
                marginTop: "3rem",
                marginBottom: "3rem",
                borderRadius: "1rem"
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

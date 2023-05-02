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
              src="https://www.google.com/maps/dir/Canchas+El+Predio,+Jos%C3%A9+Le%C3%B3n+Su%C3%A1rez+1815,+Los+Polvorines,+Provincia+de+Buenos+Aires,+Argentina/-34.5202626,-58.7001918/@-34.5201212,-58.7825893,12z/data=!4m8!4m7!1m5!1m1!1s0x95bcbd25a08f5d15:0x9058655f36dbc4e9!2m2!1d-58.7001869!2d-34.5202903!1m0?hl=es-ES"
              style={{
                border: "0",
                minWidth: "600px",
                height: "300px",
                marginLeft: "8rem",
                marginTop: "3rem",
              }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

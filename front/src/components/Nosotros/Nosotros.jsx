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
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2083.2717413714836!2d-58.365951241429855!3d-34.635502965949534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334b6925e5473%3A0x1ca5b2748858b40d!2sEstadio%20Alberto%20J.%20Armando!5e1!3m2!1ses!2sar!4v1682613507957!5m2!1ses!2sar"
              src="https://www.google.com/maps/place/Canchas+El+Predio/@-34.5203742,-59.2772865,10z/data=!4m10!1m2!2m1!1scanchas+el+predio!3m6!1s0x95bcbdf126a79637:0xeed195e4523270d8!8m2!3d-34.5203742!4d-58.7005043!15sChFjYW5jaGFzIGVsIHByZWRpb-ABAA!16s%2Fg%2F11scpxytbr?hl=es-ES"
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

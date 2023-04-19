import styles from './Nosotros.module.css';

export const Nosotros = () => {
    return (
        <section className={styles.sobrepredio}>
            <div className={styles.contenedorgrid}>
                <div className={styles.texto}>
                    <h2>Sobre nosotros</h2>
                    <p>
                    Disfruta de un predio extraordinario, ubicado en pleno Palermo.
                    </p>

                    <p>
                    Te ofrecemos las mejores canchas de futbol 5, 7, 9 y 11 con césped sintético de última generación, 
                    además de exclusivos servicios adicionales como el uso sin cargo de nuestras instalaciones para que tu experiencia sea única.

                    Para tu seguridad, contamos con personal médico presente en el complejo durante todos los turnos.
                    </p>
                </div>
            </div>
        </section>
    )
}
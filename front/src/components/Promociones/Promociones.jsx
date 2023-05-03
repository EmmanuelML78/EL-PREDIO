import styles from './Promociones.module.css'


export const Promociones = () => {
    return (
        <main className={styles.contenedormodelos}>
            <h1>Oportunidades</h1>
            <p>Descubrí las promociones de la semana.</p>

            <div className={styles.listadopromociones}>

                <div className={styles.promouno}>
                    <h3>Jueves y Viernes 15% OFF en todas las canchas a partir de las 22hs</h3>
                </div>

                <div className={styles.promodos}>
                    <h3>Miercoles 20% OFF en la cantina del predio</h3>
                </div>

                <div className={styles.promotres}>
                    <h3>Lunes 50% OFF en todas las canchas</h3>
                </div>

            </div>
        </main>
    )
}
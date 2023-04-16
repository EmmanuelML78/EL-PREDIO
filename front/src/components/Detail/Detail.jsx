import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import canchas from "./data.json";

import styles from "./Detail.module.css";
// import styled from "styled-components";

const Detail = (props) => {
  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  const canchaRandom = Math.round(randomNumber(0, 2));

  const canchaData = canchas.canchas[canchaRandom];
  console.log("id: ", canchaRandom);
  return (
    <>
      <Header />
      <div className={styles.father}>
        <div className={styles.container}>
          <h1 className="text-white">Cancha {canchaData.id}</h1>
          <h2 className="text-white">{canchaData.cesped}</h2>
          <h2 className="text-white">Jugadores: {canchaData.jugadores}</h2>
          <h4 className="text-white">{canchaData.descripcion}</h4>
          <h4 className="text-white">Apertura: {canchaData.open}</h4>
          <h4 className="text-white">Cierre: {canchaData.close}</h4>
          <h4 className="text-white">{canchaData.available}</h4>
          <input className={styles.date} type="date" />
          <div className="flex-row">
            {canchaData.turnos.map((turno, index) => (
              <button
                key={index}
                className={turno.taken ? styles.ocupado : styles.libre}
                disabled={turno.taken}
              >
                {turno.time}
              </button>
            ))}
          </div>
          <button>Agendar turno</button>
        </div>
        <img src={canchaData.image} alt="" />
      </div>
      <Footer />
    </>
  );
};

export default Detail;

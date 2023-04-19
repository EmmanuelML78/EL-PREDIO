import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getCanchaById } from "../../redux/actions/canchaActions";
import s from "./Detail.module.css";
import moment from "moment";

const Detail = ({ cancha, getCanchaById, match }) => {
  const [selectedDate, setselectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHorario, setSelectedHorario] = useState(null);
  console.log("horario:", selectedHorario)
  console.log(selectedDate);

  useEffect(() => {
    const fetchData = async () => {
      const id = parseInt(match.params.id);
      await getCanchaById(id);
      setIsLoading(false);
    };

    fetchData();
  }, [getCanchaById, match.params.id]);

  const c = cancha;

  const handleDate = (e) => {
    const fecha = e.target.value;
    setselectedDate(fecha);
    console.log("date: " + selectedDate);
  };

  const handleHorario = (e) => {
    e.preventDefault();
    const hora = e.target.value;
    setSelectedHorario(hora);
  };
  // Verificación de isLoading antes de ejecutar la lógica que usa cancha
  const openTime = !isLoading ? moment(c.open, "HH:mm:ss") : null;
  const closeTime = !isLoading ? moment(c.close, "HH:mm:ss") : null;

  const intervaloHoras = [];
  let actualTime = !isLoading ? moment(openTime) : null; // Si isLoading es true, no hay moment() para openTime
  while (!isLoading && actualTime.isBefore(closeTime)) {
    // Verificación de isLoading antes de ejecutar el while loop
    intervaloHoras.push(moment(actualTime));
    actualTime.add(1, "hour");
  }

  const reservas = !isLoading
    ? c.reservas.filter((reserva) => reserva.date === selectedDate)
    : [];

  console.log("reservas: " + JSON.stringify(reservas));

  const horariosDisponibles = !isLoading
    ? intervaloHoras.map((hora) => {
        const horaReserva = reservas.find((reserva) => {
          return moment(reserva.start, "HH:mm:ss").isSame(hora, "hour");
        });

        return {
          hora: hora.format("HH:mm"),
          disponible: !horaReserva,
        };
      })
    : [];

  const botonesHorarios = !isLoading
    ? horariosDisponibles.map((horario) => {
        if (horario.disponible) {
          const isSelected = horario.hora === selectedHorario
          const clase = isSelected ? s.seleccionado : s.libre;
          return (
            <button
              onClick={handleHorario}
              className={clase}
              value={horario.hora}
              key={horario.hora}
            >
              {horario.hora}
            </button>
          );
        } else {
          return (
            <button className={s.ocupado} key={horario.hora} disabled>
              {horario.hora}
            </button>
          );
        }
      })
    : [];

  return (
    <>
      <Header />
      <div className={s.father}>
        <div className={s.container}>
          <h1>Cancha {c.id}</h1>
          <p>Césped: {c.grass}</p>
          <p>Jugadores: {c.players}</p>
          <p>Descripción: {c.description}</p>
          <p>{c.availability ? "Disponible" : "No disponible"}</p>
          <form>
            <p style={{ fontSize: "16pt", fontWeight: "600" }}>
              Reservar un turno:
            </p>
            <div className={s.dateContainer}>
              <p style={{ marginRight: "0.5rem", fontSize: "larger" }}>
                Fecha:
              </p>
              <input
                className={s.date}
                type="date"
                value={selectedDate}
                onChange={handleDate}
              />
            </div>
            <div>{botonesHorarios}</div>
            <button>Reservar turno</button>
          </form>
        </div>
        <img src={c.image} alt="Imagen de cancha" />
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("State in Detail component: ", state.canchas);
  return {
    cancha: state.canchas,
  };
};
// export default Detail;
export default connect(mapStateToProps, { getCanchaById })(Detail);

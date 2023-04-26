import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import Footer from "../Footer/Footer";
import { getCanchaById } from "../../redux/actions/canchaActions";
import s from "./Detail.module.css";
import moment from "moment";
import { setUser } from "../../redux/actions/authActions";
import Error401 from "../Error401/Error401";
import { postReserva } from "../../redux/actions/reservaActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const Detail = ({ cancha, getCanchaById, match }) => {
  // console.log("esto es cancha", cancha);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedDate, setselectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [selectedHorario, setSelectedHorario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsUserLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

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
  };

  const handleHorario = (e) => {
    e.preventDefault();
    const hora = e.target.value;
    setSelectedHorario(hora);
  };
  // Verificación de isLoading antes de ejecutar la lógica que usa cancha
  const openTime = !isLoading ? moment(c.open, "HH:mm:ss") : null;
  const closeTime = !isLoading ? moment(c.close, "HH:mm:ss") : null;

  const createReservation = (selectedDate, selectedHorario) => {
    const start = selectedHorario;
    const end = moment(selectedHorario, "HH:mm:ss")
      .add(1, "hour")
      .format("HH:mm:ss");
    const reservation = {
      date: selectedDate,
      start,
      end,
      status: "pending",
      hasPromo: false,
      userId: user.id,
      canchaId: c.id,
    };
    return reservation;
  };

  const handlePago = async (e) => {
    e.preventDefault();
    const reservation = createReservation(selectedDate, selectedHorario);
    try {
      await dispatch(postReserva(reservation));
      toast.info("Redireccionando a MercadoPago");
    } catch (error) {
      toast.error("Error al crear la reserva");
      console.log("error:", error);
    }
  };

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

  const horariosDisponibles = !isLoading
    ? intervaloHoras.map((hora) => {
        const horaReserva = reservas.find((reserva) => {
          return moment(reserva.start, "HH:mm:ss").isSame(hora, "hour");
        });

        const esHoy = moment().isSame(selectedDate, "day");
        const horaActual = moment().format("HH:mm");
        const horaDisponible =
          !horaReserva && (!esHoy || hora.format("HH:mm") >= horaActual);

        return {
          hora: hora.format("HH:mm"),
          disponible: horaDisponible,
        };
      })
    : [];

  const botonesHorarios = !isLoading
    ? horariosDisponibles.map((horario) => {
        if (horario.disponible) {
          const isSelected = horario.hora === selectedHorario;
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
      <ToastContainer />
      {!isUserLoading && !user ? (
        <>
          <Error401 />
        </>
      ) : !isUserLoading && !user ? (
        <>
          <Error401 />
        </>
      ) : !c.availability ? (
        <>La cancha no esta disponible</>
      ) : (
        <>
          <Navbar />
          <div className={s.father}>
            <div className={s.container}>
              <h1>Cancha {c.id}</h1>
              <p>Césped: {c.grass}</p>
              <p>Jugadores: {c.players}</p>
              <p>Descripción: {c.description}</p>
              <p>{c.availability ? "Disponible" : "No disponible"}</p>
              <form onSubmit={handlePago}>
                <p style={{ fontSize: "16pt", fontWeight: "600" }}>
                  Reservar un turno:
                </p>
                <div className={s.dateContainer}>
                  <p style={{ marginRight: "0.5rem", fontSize: "larger" }}>
                    Fecha:
                  </p>
                  <input
                    min={moment().format("YYYY-MM-DD")}
                    max={moment().add(7, "days").format("YYYY-MM-DD")}
                    className={s.date}
                    type="date"
                    value={selectedDate}
                    onChange={handleDate}
                  />
                </div>
                <div>{botonesHorarios}</div>
                <button className={s.submit} type="submit">
                  Reservar turno
                </button>
              </form>
            </div>
            <img src={c.image} alt="Imagen de cancha" />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cancha: state.canchas.canchas,
  };
};
export default connect(mapStateToProps, { getCanchaById })(Detail);

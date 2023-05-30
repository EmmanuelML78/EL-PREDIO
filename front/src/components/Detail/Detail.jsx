import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import { getCanchaById } from "../../redux/actions/canchaActions";
import s from "./Detail.module.css";
import moment from "moment";
import { setUser } from "../../redux/actions/authActions";
import Error401 from "../Error401/Error401";
import {
  getAllReservas,
  postReserva,
} from "../../redux/actions/reservaActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const reservas = useSelector((state) => state.reservas.reservas);
  const [selectedDate, setselectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedCancha, setSelectedCancha] = useState(undefined)
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const [selectedHorario, setSelectedHorario] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsUserLoading(false);
    };
    fetchUser();
  }, [dispatch, user]);

  useEffect(() => {
    const fetchReservas = async () => {
      await dispatch(getAllReservas());
      setIsloading(false);
    };
    fetchReservas();
  }, [dispatch]);

  const c = {
    precio: 3000,
    open: "15:00:00",
    close: "22:00:00",
  };

  const handleDate = (e) => {
    const fecha = e.target.value;
    setselectedDate(fecha);
  };

  const handleHorario1 = (e) => {
    e.preventDefault();
    const hora = e.target.value;
    setSelectedHorario(hora);
    setSelectedCancha(1)
  };
  const handleHorario2 = (e) => {
    e.preventDefault();
    const hora = e.target.value;
    setSelectedHorario(hora);
    setSelectedCancha(2)
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
      canchaId: 1,
    };
    return reservation;
  };

  const handlePago = async (e) => {
    e.preventDefault();
    const reservation = createReservation(selectedDate, selectedHorario);
    try {
      await dispatch(postReserva(reservation));
      toast.info("Redireccionando a MercadoPago", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error al crear la reserva", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
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
  const reservasDelDia = !isLoading
    ? reservas.filter((reserva) => {
        return reserva.status !== "canceled" && reserva.date === selectedDate;
      })
    : [];

  const horariosDisponiblesC1 = !isLoading
    ? intervaloHoras.map((hora) => {
        const horaReserva = reservasDelDia.find((reserva) => {
          return (
            reserva.cancha === 1 &&
            moment(reserva.start, "HH:mm:ss").isSame(hora, "hour")
          );
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

  const horariosDisponiblesC2 = !isLoading
    ? intervaloHoras.map((hora) => {
        const horaReserva = reservasDelDia.find((reserva) => {
          return (
            reserva.cancha === 2 &&
            moment(reserva.start, "HH:mm:ss").isSame(hora, "hour")
          );
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

  const botonesHorariosC1 = !isLoading
    ? horariosDisponiblesC1.map((horario) => {
        if (horario.disponible) {
          const isSelected = horario.hora === selectedHorario && selectedCancha === 1;
          const clase = isSelected ? s.seleccionado : s.libre;
          return (
            <button
              onClick={handleHorario1}
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

  const botonesHorariosC2 = !isLoading
    ? horariosDisponiblesC2.map((horario) => {
        if (horario.disponible) {
          const isSelected = horario.hora === selectedHorario && selectedCancha === 2;
          const clase = isSelected ? s.seleccionado : s.libre;
          return (
            <button
              onClick={handleHorario2}
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
      <>
        <Navbar />
        <div className={s.father}>
          <div className={s.container}>
            <div className={s.canchas}>
              <div className={s.cancha}>
                <h1>Cancha 1</h1>
                <span className={s.horarios}>
                  {botonesHorariosC1}
                </span>
              </div>
              <div className={s.cancha}>
                <h1>Cancha 2</h1>
                <span className={s.horarios}>
                  {botonesHorariosC2}
                </span>
              </div>
            </div>
            <form onSubmit={handlePago}>
              <div className={s.dateContainer}>
                <p style={{ marginRight: "0.5rem", fontSize: "larger" }}>
                  Fecha:
                </p>
                <input
                  min={moment().format("YYYY-MM-DD")}
                  max={moment().add(30, "days").format("YYYY-MM-DD")}
                  className={s.date}
                  type="date"
                  value={selectedDate}
                  onChange={handleDate}
                />
              </div>
              {/* <div>{botonesHorarios}</div> */}
              <button className={s.submit} type="submit">
                Pagar reserva
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cancha: state.canchas.canchas,
  };
};
export default connect(mapStateToProps, { getCanchaById })(Detail);

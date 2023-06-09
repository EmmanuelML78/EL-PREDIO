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
import mp from "../../assets/Mercado-Pago-Logo.png";

const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const reservas = useSelector((state) => state.reservas.reservas);
  const [selectedDate, setselectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedCancha, setSelectedCancha] = useState(undefined);
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
    setSelectedCancha(1);
  };
  const handleHorario2 = (e) => {
    e.preventDefault();
    const hora = e.target.value;
    setSelectedHorario(hora);
    setSelectedCancha(2);
  };

  const fechaFormatted = (fecha) => {
    const diaIngles = moment(fecha).format("dddd");
    const mesIngles = moment(fecha).format("MMMM");
    const diaFecha = moment(fecha).format("DD");
    const month = mesIngles.includes("January")
      ? "Enero"
      : mesIngles.includes("February")
      ? "Febrero"
      : mesIngles.includes("March")
      ? "Marzo"
      : mesIngles.includes("April")
      ? "Abril"
      : mesIngles.includes("May")
      ? "Mayo"
      : mesIngles.includes("June")
      ? "Junio"
      : mesIngles.includes("July")
      ? "Julio"
      : mesIngles.includes("August")
      ? "Agosto"
      : mesIngles.includes("September")
      ? "Septiembre"
      : mesIngles.includes("October")
      ? "Octubre"
      : mesIngles.includes("November")
      ? "Noviembre"
      : "Diciembre";
    const day = diaIngles.includes("Monday")
      ? "Lunes"
      : diaIngles.includes("Tuesday")
      ? "Martes"
      : diaIngles.includes("Wednesday")
      ? "Miercoles"
      : diaIngles.includes("Thursday")
      ? "Jueves"
      : diaIngles.includes("Friday")
      ? "Viernes"
      : diaIngles.includes("Saturday")
      ? "Sábado"
      : "Domingo";
    return `Seleccionaste ${day} ${diaFecha} de ${month} a las ${selectedHorario} hs en la Cancha ${selectedCancha}`;
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
      canchaId: selectedCancha,
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
          const isSelected =
            horario.hora === selectedHorario && selectedCancha === 1;
          const clase = isSelected ? s.seleccionado : s.libre;
          const color = isSelected ? "rgb(39, 83, 204)" : "var(--verde-medio";
          return (
            <button
              onClick={handleHorario1}
              className={clase}
              value={horario.hora}
              key={horario.hora}
              style={{
                backgroundColor: { color },
                transition: "background-color, 0.2s ease",
              }}
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
          const isSelected =
            horario.hora === selectedHorario && selectedCancha === 2;
          const clase = isSelected ? s.seleccionado : s.libre;
          const color = isSelected ? "rgb(39, 83, 204)" : "var(--verde-medio";
          return (
            <button
              onClick={handleHorario2}
              className={clase}
              value={horario.hora}
              key={horario.hora}
              style={{
                backgroundColor: { color },
                transition: "background-color, 0.2s ease",
              }}
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
      {user ? (
        <>
          <Navbar />
          <div className={s.father}>
            <div className={s.container}>
              <form onSubmit={handlePago}>
                <input
                  min={moment().format("YYYY-MM-DD")}
                  max={moment().add(30, "days").format("YYYY-MM-DD")}
                  className={s.date}
                  type="date"
                  value={selectedDate}
                  onChange={handleDate}
                />
                <div className={s.canchas}>
                  <div className={s.cancha}>
                    <h3 style={{ fontWeight: "600" }}>Cancha 1</h3>
                    <div className={s.horarios}>{botonesHorariosC1}</div>
                  </div>
                  <div className={s.cancha}>
                    <h3 style={{ fontWeight: "600" }}>Cancha 2</h3>
                    <div className={s.horarios}>{botonesHorariosC2}</div>
                  </div>
                </div>
                <p style={{ fontWeight: "600" }}>
                  {selectedHorario
                    ? fechaFormatted(selectedDate)
                    : "No se seleccionó ningun horario"}
                </p>
                <button className={s.submit} type="submit">
                  <img style={{ marginLeft: "0" }} src={mp} alt="MercadoPago" />
                  <p>Pagar reserva</p>
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        history.push("/login")
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

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReserva,
  getAllReservas,
  putReserva,
} from "../../redux/actions/reservaActions";
import s from "./ReservasTable.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import Loading from "../Loading/Loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getCanchas } from "../../redux/actions/canchaActions";

const ReservasTable = () => {
  const dispatch = useDispatch();
  const [isReservasLoading, setIsReservasLoading] = useState(true);
  const [isCanchasLoading, setIsCanchasLoading] = useState(true);
  const reservas = useSelector((state) => state.reservas.reservas);
  const canchas = useSelector((state) => state.canchas.canchas);
  const [sortBy, setSortBy] = useState("asc");
  const [filterState, setFilterState] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCancha, setSelectedCancha] = useState("all");

  useEffect(() => {
    const fetchReservas = async () => {
      await dispatch(getAllReservas());
      setIsReservasLoading(false);
    };
    fetchReservas();
  }, [dispatch]);

  useEffect(() => {
    const fetchCanchas = async () => {
      await dispatch(getCanchas());
      setIsCanchasLoading(false);
    };
    fetchCanchas();
  }, [dispatch]);

  const handleEliminarReserva = (id) => {
    confirmAlert({
      title: "Eliminar reserva",
      message: "¿Está seguro que desea eliminar la reserva?",
      buttons: [
        {
          label: "Eliminar",
          onClick: async () => {
            await dispatch(deleteReserva(id));
            await dispatch(getAllReservas());
            toast.info("Se eliminó la reseva", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          },
        },
        {
          label: "Cancelar",
          onClick: () => {},
        },
      ],
    });
  };

  const filteredByStateReservas =
    !isReservasLoading &&
    reservas.filter((reserva) => {
      if (filterState === "all") {
        return reserva;
      } else if (filterState === "confirmadas") {
        return reserva.state === "confirmed";
      } else if (filterState === "canceladas") {
        return reserva.deletedAt;
      }
    });

  var sortedReservas = !isReservasLoading && filteredByStateReservas;
  if (!isReservasLoading && sortBy === "asc") {
    sortedReservas = filteredByStateReservas.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
  } else if (sortBy === "des") {
    sortedReservas = filteredByStateReservas.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  }

  var filteredByDateReservas = !isReservasLoading && sortedReservas;
  if (!isReservasLoading && selectedDate === null || selectedDate === "") {
    filteredByDateReservas = sortedReservas;
  } else if (!isReservasLoading && selectedDate !== null) {
    filteredByDateReservas = sortedReservas.filter((reserva) => {
      const fechaReserva = moment(reserva.date).format("DD/MM/YYYY");
      const fechaFiltro = moment(selectedDate).format("DD/MM/YYYY")
      console.log(fechaReserva, " ", fechaFiltro);
      if (fechaReserva === fechaFiltro) {
        return reserva.date;
      }
    });
  }

  var filteredByCanchaReservas =
    !isReservasLoading &&
    !isCanchasLoading &&
    filteredByDateReservas.filter((reserva) => {
      if (selectedCancha == "all") {
        return reserva;
      } else {
        return reserva.cancha.name === selectedCancha;
      }
    });

  return (
    <div className={s.reservasTableContainer}>
      {isReservasLoading || isCanchasLoading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              placeItems: "center",
              color: "white",
              fontWeight: "500",
              backgroundColor: "#3a3a3a",
            }}
          >
            <h4
              style={{
                padding: "0.5rem 2rem 0.5rem 2rem",
                // borderLeft: "10px solid #2a2a2a",
              }}
            >
              Filtros
            </h4>
            <label className={s.label}>Fecha:</label>
            <input
              className={s.input}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <label className={s.label}>Ordernar por fecha:</label>
            <select
              className={s.select}
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
            </select>
            <label className={s.label}>Estado:</label>
            <select
              className={s.select}
              name="estado"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="pendientes">Pendientes</option>
              <option value="confirmadas">Confirmadas</option>
              <option value="canceladas">Canceladas</option>
            </select>
            <label className={s.label}>Cancha:</label>
            <select
              className={s.select}
              name="cancha"
              value={selectedCancha}
              onChange={(e) => setSelectedCancha(e.target.value)}
            >
              <option value="all">Todos</option>
              {canchas.map((cancha) => {
                return (
                  <option key={cancha.id} value={cancha.name}>
                    {cancha.name}
                  </option>
                );
              })}
            </select>
          </div>
          <table className={s.reservasTable}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Usuario</th>
                <th scope="col">UserID</th>
                <th scope="col">Cancha</th>
                <th scope="col">Estado</th>
                <th scope="col">Promo</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredByCanchaReservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva?.id}</td>
                  <td>{moment(reserva?.date).format("DD/MM/YYYY")}</td>
                  <td>{reserva?.start.slice(0, -3)}</td>
                  <td>{reserva?.user?.name + " " + reserva.user?.lastName}</td>
                  <td>{reserva?.user?.id}</td>
                  <td>{reserva?.cancha?.name}</td>
                  <td>
                    {reserva.deletedAt
                      ? "Cancelada"
                      : reserva.status === "pending"
                      ? "Pendiente de pago"
                      : "Confirmada"}
                  </td>
                  <td>{reserva.hasPromo ? "Si" : "No"}</td>
                  <td>
                    <button>
                      <AiFillEdit />
                    </button>
                    <button onClick={() => handleEliminarReserva(reserva.id)}>
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Link to="/home">
              <button>Ir a reservar</button>
            </Link>
          </table>
        </>
      )}
    </div>
  );
};

export default ReservasTable;

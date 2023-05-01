import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservas } from "../../redux/actions/reservaActions";
import s from "./ReservasTable.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ReservasTable = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const reservas = useSelector((state) => state.reservas.reservas);

  useEffect(() => {
    const fetchReservas = async () => {
      await dispatch(getAllReservas());
      setIsLoading(false);
    };
    fetchReservas();
  }, [dispatch]);

  return (
    <div className={s.reservasTableContainer}>
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
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva?.id}</td>
              <td>{reserva?.date}</td>
              <td>{reserva?.start.slice(0, -3)}</td>
              <td>{reserva?.user?.name + " " + reserva.user?.lastName}</td>
              <td>{reserva?.user?.id}</td>
              <td>{reserva?.cancha?.name}</td>
              <td>
                {reserva.status === "success"
                  ? "pago confirmnado "
                  : "Aprovado"}
              </td>
              <td>{reserva.hasPromo ? <>Si</> : <>No</>}</td>
              <td>
                <button>
                  <AiFillEdit />
                </button>
                <button>
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
    </div>
  );
};

export default ReservasTable;

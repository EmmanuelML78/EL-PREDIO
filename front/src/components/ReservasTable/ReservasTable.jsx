import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReservas } from "../../redux/actions/reservaActions";
import "./ReservasTable.css";

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
    <div className="reservas-table-container">
    <table className="reservas-table">
        <thead >
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Usuario</th>
                <th scope="col">UserID</th>
                <th scope="col">Cancha</th>
                <th scope="col">Estado</th>
                <th scope="col">Promo</th>

            </tr>
        </thead>
        <tbody className="body-tabla">
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.date}</td>
                    <td>{reserva.start.slice(0, -3)}</td>
                    <td>{reserva.user.name + " " + reserva.user.lastName}</td>
                    <td>{reserva.user.id}</td>
                    <td>{reserva.cancha?.name}</td>
                    <td>{reserva.status === "pending" ? "Pendiente de pago" : "Confirmada"}</td>
                    <td>{reserva.hasPromo ? (<>Si</>) : (<>No</>)}</td>
                </tr>
            ))}
        </tbody>
    </table>
            </div>
  );
};

export default ReservasTable;

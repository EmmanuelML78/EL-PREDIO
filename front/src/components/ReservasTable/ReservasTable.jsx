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
    // <></>
    <table className="tabla">
        <thead className="head-tabla">
            <tr>
                <th style={{padding: "5px"}} scope="col">ID</th>
                <th style={{padding: "5px"}} scope="col">Fecha</th>
                <th style={{padding: "5px"}} scope="col">Hora</th>
                <th style={{padding: "5px"}} scope="col">Usuario</th>
                <th style={{padding: "5px"}} scope="col">Cancha</th>
                <th style={{padding: "5px"}} scope="col">Estado</th>
                <th style={{padding: "5px"}} scope="col">Promo</th>
            </tr>
        </thead>
        <tbody className="body-tabla">
            {reservas.map((reserva) => (
                <tr key={reserva.id}>
                    <td className="celda">{reserva.id}</td>
                    <td className="celda">{reserva.date}</td>
                    <td className="celda">{reserva.start.slice(0, -3)}</td>
                    <td className="celda">{reserva.user.name + " " + reserva.user.lastName}</td>
                    <td className="celda">{reserva.cancha.name}</td>
                    <td className="celda">{reserva.status}</td>
                    <td className="celda">{reserva.hasPromo ? (<>Si</>) : (<>No</>)}</td>
                </tr>
            ))}
        </tbody>
    </table>
  );
};

export default ReservasTable;

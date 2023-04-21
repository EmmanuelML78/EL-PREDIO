import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import s from "./DashBoard.module.css";
import reservasData from "./reservasData.json";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header/Header";
import Tabla from "../CanchasTable/CanchasTable";
function DashBoard() {
  const [users, setUsers] = useState([]);
  // const [canchas, setCanchas] = useState([]);
  // const [reservas, setReservas] = useState([]);

  const canchas = canchasData;
  const reservas = reservasData;

  useEffect(() => {
    const getData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:3001/users");
        setUsers(usersResponse.data);
        // const canchasResponse = await axios.get(
        //   "http://localhost:3001/canchas"
        // );
        // setCanchas(canchasResponse.data);
        // const reservasResponse = await axios.get(
        //   "http://localhost:3001/reserva"
        // );
        // setReservas(reservasResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Link to="/creador">
        <button>Creador</button>
      </Link>
      <div className={s.dashboardContainer}>
        <h1 className={s.panel}>Panel de control</h1>
        <div>
          <select className={s.input}>
            <option value="">Ordenar por</option>
            <option value="asc">Nombre ascendente</option>
            <option value="desc">Nombre descendente</option>
            <option value="menor">Menor precio</option>
            <option value="mayor">Mayor precio</option>
          </select>
          <input className={s.input} type="text" placeholder="Buscar..." />
          <button>Buscar</button>
        </div>
        <div>
          <div>
            <div className={s.titles}>Usuarios</div>
            <div className={s.list}>
              <ul>
                <p className={s.heads}>ID</p>
                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.id}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Nombre</p>

                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.name}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Apellido</p>

                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.lastName}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Correo</p>

                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.email}
                  </li>
                ))}
              </ul>
            </div>
            <CanchasTable/>
            <div className={s.titles}>Reservas</div>
            <div className={s.list}>
              <ul>
                <p className={s.heads}>Fecha</p>
                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.date}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Desde</p>

                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.start}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Hasta</p>

                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.end}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Cancha</p>

                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.cancha}
                  </li>
                ))}
              </ul>
              <ul>
                <p className={s.heads}>Correo del usuario</p>

                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.userEmail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

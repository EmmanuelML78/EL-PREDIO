import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import s from "./DashBoard.module.css";
import canchasData from "./canchas.json";
import reservasData from "./reservasData.json";

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
      <div className={s.dashboardContainer}>
        <h1>Panel de control</h1>
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
                <p>ID</p>
                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.id}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Nombre</p>
                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.name}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Apellido</p>
                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.lastName}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Correo</p>
                {users.map((user) => (
                  <li className={s.item} key={user.id}>
                    {user.email}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.titles}>Canchas</div>
            <div className={s.list}>
              <ul>
                <p>ID</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.id}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Jugadores</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.jugadores}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Superficie</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.cesped}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Apertura</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.open}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Cierre</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.close}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Estado</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.availability}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Precio/Hora</p>
                {canchas.map((cancha) => (
                  <li className={s.item} key={cancha.id}>
                    {cancha.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.titles}>Reservas</div>
            <div className={s.list}>
              <ul>
                <p>Fecha</p>
                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.date}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Desde</p>
                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.start}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Hasta</p>
                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.end}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Cancha</p>
                {reservas.map((reserva) => (
                  <li className={s.item} key={reserva.id}>
                    {reserva.cancha}
                  </li>
                ))}
              </ul>
              <ul>
                <p>Correo del usuario</p>
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

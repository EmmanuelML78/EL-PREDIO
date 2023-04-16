import React from "react";
import axios from "axios";
import { useState } from "react";
import s from "./DashBoard.module.css";

function DashBoard() {
  const [selectOption, setSelectOption] = useState("canchas");
  const [users, setUsers] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);

  const handleSelectOption = async (option) => {
    try {
      setSelectOption(option);
      switch (option) {
        case "usuarios":
          const response = await axios.get("http://localhost:3001/users");
          setUsers(response.data);
          break;
        case "canchas":
          const res = await axios.get("http://localhost:3001/canchas");
          setCanchas(res.data);
          break;
        case "reservas":
          const json = await axios.get("http://localhost:3001/reserva");
          setReservas(json.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderUserCards = () => {
    return users.map((user) => (
      <div className="user-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    ));
  };

  const renderCanchaCards = () => {
    return canchas.map((cancha) => (
      <div>
        <h2>{cancha.name}</h2>
        <p>{cancha.price}</p>
      </div>
    ));
  };

  const renderReservaCards = () => {
    return reservas.map((reserva) => (
      <div>
        <h2>{reserva.date}</h2>
        <p>{reserva.start}</p>
        <p>{reserva.end}</p>
      </div>
    ));
  };

  const renderCards = () => {
    switch (selectOption) {
      case "usuarios":
        return renderUserCards();
      case "canchas":
        return renderCanchaCards();
      case "reservas":
        return renderReservaCards();
    }
  };

  return (
    <div className={s.dashboardContainer}>
      <h1>Panel de control</h1>
      <div>
        <select>
          <option value="">Ordenar por</option>
          <option value="asc">Nombre ascendente</option>
          <option value="desc">Nombre descendente</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
        </select>
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
      <div>
        <div>
          <ul>
            <li onClick={() => handleSelectOption("usuarios")}>Usuarios</li>
            <li onClick={() => handleSelectOption("canchas")}>Canchas</li>
            <li onClick={() => handleSelectOption("reservas")}>Reservas</li>
          </ul>
        </div>
        <div>
          <h2>{renderCards()}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

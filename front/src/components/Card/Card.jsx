import React, { useState, useEffect } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ image, title, description, availability, players }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable(availability);
  }, [availability]);

  const handleClick = () => {
    if (isAvailable) {
      onclick();
    }
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        padding: "1rem",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ maxWidth: "100%", height: "15rem", display:"flex", alignItems: "center", justifyContent: "center"}}
      />
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <p>Capacidad: {players} Jugadores</p>
      {isAvailable ? (
        <p>Disponibilidad: Disponible</p>
      ) : (
        <p style={{ color: "red" }}>Disponibilidad: No Disponible</p>
      )}
      <Link to="/canchas/detail">
        <button onClick={handleClick} disabled={!isAvailable}>
          Reservar
        </button>
      </Link>
    </div>
  );
}

export default Card;

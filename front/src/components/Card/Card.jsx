import React, { useState, useEffect } from "react";
import "./Card.css";

function Card({ image, title, description, available }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable(available);
  }, [available]);

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
        style={{ maxWidth: "100%", height: "15rem" }}
      />
      <h2>{title}</h2>
      <p>{description}</p>
      {isAvailable ? (
        <p>Disponibilidad: Disponible</p>
      ) : (
        <p style={{ color: "red" }}>Disponibilidad: No Disponible</p>
      )}
      <button onClick={handleClick} disabled={!isAvailable}>
        Reservar
      </button>
    </div>
  );
}

export default Card;

import React, { useState, useEffect } from "react";
import "./Card.css";
import { Link } from "react-router-dom";


function Card({ image, title, description, availability, players, id }) {

  const [isAvailable, setIsAvailable] = useState(false);
  
  useEffect(() => {
    setIsAvailable(availability);
  }, [availability]);

  

  return (
    <>
    
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
        style={{ maxWidth: "100%",width: "50rem", height: "25rem", display:"flex", alignItems: "center", justifyContent: "center"}}
      />
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <p>Capacidad: {players} Jugadores</p>
      {isAvailable ? (
        <p >Disponibilidad: <span style={{color: "lightgreen", fontWeight: "800"}}>Disponible</span></p>
      ) : (
        <p >Disponibilidad: <span style={{color: "red", fontWeight: "800"}}>No Disponible</span></p>
      )}
      <Link to={`/canchas/${id}`}>
        <button  disabled={!isAvailable}>
          Reservar
        </button>
      </Link>
    </div>
    </>
  );
}

export default Card;

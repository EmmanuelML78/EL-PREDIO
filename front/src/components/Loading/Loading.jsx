import React from "react";
import spinner from "../../assets/Spinner-1.1s-200px.gif";

const Loading = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ color: "white" }}>Cargando...</h2>
      <img
        style={{ background: "none", height: "5rem", width: "5rem" }}
        src={spinner}
        alt="Cargando..."
      />
    </div>
  );
};

export default Loading;

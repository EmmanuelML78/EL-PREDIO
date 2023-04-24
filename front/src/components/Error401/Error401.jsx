import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Error401 = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "36pt", fontWeight: "500", color: "white", marginBottom: "2rem", lineHeight: "40pt" }}>
          Debes iniciar sesión <br></br> para continuar
        </p>
        <Link to="/">
          <button>Ir a iniciar sesión</button>
        </Link>
      </div>
    </>
  );
};

export default Error401;

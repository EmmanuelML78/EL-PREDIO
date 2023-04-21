import React, { useState } from "react";
import "./Contactos.css";

const Contactos = () => {
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí es donde enviarías los datos del formulario a la empresa.
    console.log({ email, asunto, descripcion });

    // Limpia los campos después de enviar
    setEmail("");
    setAsunto("");
    setDescripcion("");
  };

  return (
    <div className="contacto-container">
      <h1>Contacta con nosotros</h1>
      <div className="card">

      <form onSubmit={handleSubmit} className="form-container">
        <label style={{color: "white"}}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{backgroundColor: "white"}}
          required
        />

        <label>Asunto:</label>
        <input
          type="text"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          style={{backgroundColor: "white"}}
          required
        />

        <label>Descripción:</label>
        <textarea
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{backgroundColor: "white", marginBottom: "20px", width: "30rem", height: "10rem"}}
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
      </div>
    </div>
  );
};

export default Contactos;

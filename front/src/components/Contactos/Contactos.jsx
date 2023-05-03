import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Contactos.css";
import { setUser } from "../../redux/actions/authActions";
import emailjs from "@emailjs/browser";

const Contactos = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(() => user?.email || "");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
    };
    fetchData();
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí es donde enviarías los datos del formulario a la empresa.
    console.log({ email, asunto, descripcion });
    const serviceId = "service_ifcr53q";
    const templateId = "template_g8j6qb1";
    const user_id = "OY0grKnkGqVhhGv6D";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          userEmail: user?.email,
          asunto: asunto,
          descripcion: descripcion,
          phoneNumber: user.phone,
          userName: user.name,
          userLastName: user.lastName,
        },
        user_id
      );
      console.log("Correo enviado exitosamente");
      setEmail("");
      setAsunto("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
    // Limpia los campos después de enviar
  };

  return (
    <div className="contacto-container">
      <h1>Contacta con nosotros</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="form-container-contacto">
          <label style={{ color: "white" }}>Email:</label>
          <input
            type="email"
            value={user?.email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: "white", color: "black",  width: "25rem" }}
            required
          />

          <label style={{ color: "white" }}>Asunto:</label>
          <input
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            style={{ backgroundColor: "white", color: "black", width: "25rem" }}
            required
          />

          <label style={{ color: "white" }} >Descripción:</label>
          <textarea
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{
              backgroundColor: "white",
              marginBottom: "20px",
              width: "30rem",
              height: "10rem",
              color: "black",
            }}
            required
          ></textarea>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contactos;

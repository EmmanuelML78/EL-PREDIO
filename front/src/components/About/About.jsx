import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./About.css";

const MiembroCard = ({
  nombre,
  apellido,
  rol,
  githubUrl,
  linkedinUrl,
  image,
}) => (
  <div className="miembro-card">
    <div className="imagen-container">
      <img src={image} alth={nombre} className="miembro-img" />
    </div>
    <h3 style={{ marginTop: "50px", fontWeight: "600", fontSize: "30px" }}>
      {nombre} {apellido}
    </h3>

    <p style={{ color: "black", fontWeight: "600" }}>{rol}</p>
    <div className="iconos">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
    </div>
  </div>
);

const About = () => {
  const miembros = [
    {
      nombre: "Agustin ",
      apellido: "Figueredo",
      rol: "Programador Front-end",
      githubUrl: "https://github.com/agustinfiguered",
      linkedinUrl: "https://www.linkedin.com/in/agustinfigueredo/",
      image:
        "https://res.cloudinary.com/ddyk63iig/image/upload/v1682084308/Screenshot_1_yupp85.png",
    },
    {
      nombre: "Franco",
      apellido: "Mindurry ",
      rol: "Programador Front-end",
      githubUrl: "https://github.com/Frann131",
      linkedinUrl: "https://www.linkedin.com/in/fmin131",
      image:
        "https://res.cloudinary.com/ddyk63iig/image/upload/v1682084456/Screenshot_4_ivfqjf.png",
    },
    {
      nombre: "Lucas ",
      apellido: "Ruiz ",
      rol: "Programador Front-end",
      githubUrl: "https://github.com/spawn22",
      linkedinUrl: "https://www.linkedin.com/in/lucas-ruiz-68249224b/",
      image:
        "https://res.cloudinary.com/ddyk63iig/image/upload/v1682085129/1666222593480_ek9rqu.jpg",
    },
    {
      nombre: "Franco",
      apellido: "Mansilla ",
      rol: "Programador Backend",
      githubUrl: "https://github.com/frangabriel13",
      linkedinUrl: "https://www.linkedin.com/in/frangabriel13",
      image:
        "https://res.cloudinary.com/ddyk63iig/image/upload/v1682084456/Screenshot_3_lgeqk0.png",
    },
    {
      nombre: "Harold",
      apellido: "Cadenas",
      rol: "Programador Backend",
      githubUrl: "https://github.com/Seijuro6",
      linkedinUrl:
        "https://www.linkedin.com/in/harold-eduardo-cadena-carreno-122355269/",
      image:
        "https://res.cloudinary.com/ddyk63iig/image/upload/v1682084456/Screenshot_5_xmyxr3.png",
    },
    {
      nombre: "Emmanuel",
      apellido: "Cadena",
      rol: "Programador Backend",
      githubUrl: "https://github.com/EmmanuelML78",
      linkedinUrl: "https://www.linkedin.com/in/emmanuel-medina88",
      image:
        "https://res.cloudinary.com/ddyk63iig/image/upload/v1682084455/Screenshot_2_kfyohy.png",
    },
  ];

  return (
    <div className="nosotros-container">
      {miembros.map((miembro) => (
        <MiembroCard
          key={`${miembro.nombre}-${miembro.apellido}`}
          {...miembro}
        />
      ))}
    </div>
  );
};

export default About;

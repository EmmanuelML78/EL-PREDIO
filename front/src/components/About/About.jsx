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
      nombre: "Franco",
      apellido: "Mindurry ",
      rol: "Programador Front-end",
      githubUrl: "https://github.com/Frann131",
      linkedinUrl: "https://www.linkedin.com/in/fmin131",
      image:
        "https://res.cloudinary.com/dd5jlib2e/image/upload/v1682607548/fotor-ai-2023042795838_bzo56n.png",
    },
    {
      nombre: "Lucas ",
      apellido: "Ruiz ",
      rol: "Programador Front-end",
      githubUrl: "https://github.com/spawn22",
      linkedinUrl: "https://www.linkedin.com/in/lucas-ruiz-68249224b/",
      image:
        "https://res.cloudinary.com/dd5jlib2e/image/upload/v1682607335/fotor-ai-2023042795515_biy942.png",
    },
    {
      nombre: "Franco",
      apellido: "Mansilla ",
      rol: "Programador Backend",
      githubUrl: "https://github.com/frangabriel13",
      linkedinUrl: "https://www.linkedin.com/in/frangabriel13",
      image:
        "https://res.cloudinary.com/dd5jlib2e/image/upload/v1682607069/fotor-ai-2023042795040_n2gf6z.jpg",
    },
    {
      nombre: "Harold",
      apellido: "Cadena",
      rol: "Programador Backend",
      githubUrl: "https://github.com/Seijuro6",
      linkedinUrl:
        "https://www.linkedin.com/in/harold-eduardo-cadena-carreno-122355269/",
      image:
        "https://res.cloudinary.com/dd5jlib2e/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1682607333/fotor-ai-2023042791825_2-removebg-preview_ddzk6k.jpg",
    },
    {
      nombre: "Emmanuel",
      apellido: "Medina",
      rol: "Programador Backend",
      githubUrl: "https://github.com/EmmanuelML78",
      linkedinUrl: "https://www.linkedin.com/in/emmanuel-medina88",
      image:
        "https://res.cloudinary.com/dd5jlib2e/image/upload/v1682603109/1682602841922_dwbdnx.jpg",
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

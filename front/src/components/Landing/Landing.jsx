import React, { useState } from "react";
import pelota from "../../assets/pelota.jpg";
import styles from "./Landing.module.css";
import G from "../../assets/google logo.svg";
import { Link } from "react-router-dom";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // logica del registro
    } else {
      // logica del login
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);
    setPasswordMatch(password === confirmPwd);
  };

  return (
    
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${pelota})` }}
    >
      <div className={styles.loginContainer}>
        <h1>El Predio</h1>
        {isRegistering ? <h2>Regístrate</h2> : <h2>Inicia sesión</h2>}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre y apellido"
              />
            </div>
          )}
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          {isRegistering && (
            <div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirmar contraseña"
              />
            </div>
          )}
          <button type="submit">
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>
        <div>
          <p>{isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}</p>
          <Link onClick={() => setIsRegistering(!isRegistering)}>
            <p>{isRegistering ? "Iniciar sesión" : "Registrarse"}</p>
          </Link>
        </div>
        <div className={styles.socialButtons}>
          <button
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <img style={{ width: "20px" }} src={G} alt="" />
            <p>Ingresar con Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

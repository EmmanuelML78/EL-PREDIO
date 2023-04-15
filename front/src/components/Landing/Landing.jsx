import React, { useState } from "react";
import pelota from "../../assets/pelota.jpg";
import styles from "./Landing.module.css";
import G from "../../assets/google logo.svg";
import { Link } from "react-router-dom";
import validator from "validator";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [validateForm, setValidateForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // logica del registro
    } else {
      // logica del login
    }
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(validator.isEmail(emailValue));
  };

  const handleFullName = (e) => {
    const fullNameValue = e.target.value;
    setFullName(fullNameValue);
    setNameValid(
      !validator.isEmpty(fullNameValue) && validator.isAlpha(fullNameValue)
    );
  };

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    if (isRegistering) {
      const isLengthValid = validator.isLength(passwordValue, {
        min: 8,
        max: 20,
      });
      const containsLetter = /[a-zA-Z]/.test(passwordValue);
      const containsNumber = /[0-9]/.test(passwordValue);
      const isAlphanumeric = validator.isAlphanumeric(passwordValue);
      const isPasswordValid =
        containsLetter && containsNumber && isAlphanumeric && isLengthValid;
      setPasswordValid(isPasswordValid);
      if (passwordValid) {
        setPassword(passwordValue);
      }
    } else setPassword(passwordValue);
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
                onChange={handleFullName}
                placeholder="Nombre y apellido"
              />
            </div>
          )}
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
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
          {isRegistering ? (
            !passwordMatch ? (
              <p style={{ color: "red", fontWeight: "900" }}>
                Las contraseñas no coinciden
              </p>
            ) : (
              <p style={{ color: "green", fontWeight: "900" }}>
                Las contraseñas coinciden
              </p>
            )
          ) : null}

          <button type="submit" disabled={validateForm}>
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
          <Link to="/home">
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
          </Link>
        </div>
      </div>
    </div>
  );
}

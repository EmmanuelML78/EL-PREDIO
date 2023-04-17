import React, { useState } from "react";
import pelota from "../../assets/pelota.jpg";
import styles from "./Landing.module.css";
import G from "../../assets/google logo.svg";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions/userActions";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (
        emailValid &&
        nameValid &&
        lastNameValid &&
        passwordValid &&
        passwordMatch 
      )
        console.log("mail:", emailValid)
        console.log("name:", nameValid)
        console.log("lastName:",lastNameValid)
        console.log("password:", passwordValid)
        console.log("passMatch:", passwordMatch)
      {
      try {
        dispatch(
          postUser({
            name,
            lastName,
            email,
            password,
          })
        );
        history.push('/home')
      } catch (error) {
        console.log('error:', error);
      }
      }
    } else {
      // logica del login
    }
  };

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(validator.isEmail(emailValue));
  };

  const handleName = (e) => {
    const name = e.target.value;
    setName(name);
    setNameValid(!validator.isEmpty(name) && validator.isAlpha(name));
  };
  const handleLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
    setLastNameValid(
      !validator.isEmpty(lastName) && validator.isAlpha(lastName)
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
      setPasswordValid(() => isPasswordValid); 
      setPassword(() => passwordValue); 
    } else {
      setPassword(() => passwordValue); 
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
                id="name"
                value={name}
                onChange={handleName}
                placeholder="Nombre"
                style={{border: nameValid ? "none" : "2px solid #660a00"}}
              />
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastName}
                placeholder="Apellido"
                style={{border: lastNameValid ? "none" : "2px solid #660a00"}}
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
              style={{border: isRegistering && emailValid ? "none" : isRegistering && "2px solid #660a00"}}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder="Contraseña"
              style={{border: isRegistering && passwordValid ? "none" : isRegistering && "2px solid #660a00"}}
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
                style={{border: (password.length>1) && passwordMatch ? "none" : (password.length>0) && "2px solid #660a00"}}
              />
            </div>
          )}
          <button type="submit">
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>
        <div>
          <p>{isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}</p>
          <p
            onClick={() => setIsRegistering(!isRegistering)}
            className={styles.switch}
          >
            {isRegistering ? "Iniciar sesión" : "Registrarse"}
          </p>
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
              <img style={{ width: "20px", margin: "0" }} src={G} alt="" />
              <p>Ingresar con Google</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

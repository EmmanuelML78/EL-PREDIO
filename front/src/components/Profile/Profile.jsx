import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, editUser, logoutUser } from "../../redux/actions/authActions";
import Loading from "../Loading/Loading.jsx";
import { ToastContainer, toast } from "react-toastify";
import DashBoard from "../DashBoard/DashBoard";
import "./Profile.css";
import moment from "moment";
// import styled from "styled-components";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [editName, setEditName] = useState(user.name);
  const [editLastName, setEditLastName] = useState(user.lastName);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPassword, setEditPassword] = useState(user.password);
  const [editPhone, setEditPhone] = useState(user.phone);

  const [showNameInput, setShowNameInput] = useState(false);
  const [showLastNameInput, setShowLastNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

  const handleNameChangeClick = async () => {
    await dispatch(editUser({ name: editName }));
  };

  const handleLastNameChangeClick = async () => {
    await dispatch(editUser({ lastName: editLastName }));
  };

  const handleEmailChangeClick = async () => {
    if (window.confirm("Si cambias tu email tendrás que iniciar sesión nuevamente. ¿Deseas continuar?")) {
      await dispatch(editUser({ email: editEmail }));
      localStorage.removeItem("token");
      logoutUser();
      window.location.href = "/";
      toast.success("¡Se cerrado sesión correctamente, ingresa con tu nuevo email!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      
      console.log("Cambio de correo electrónico confirmado.");
    } else {
      console.log("Cambio de correo electrónico cancelado.");
    }

  };

  const handlePasswordChangeClick = async () => {
    if (window.confirm("Si cambias tu contraseña tendrás que iniciar sesión nuevamente. ¿Deseas continuar?")) {
      await dispatch(editUser({ password: editPassword }));
      localStorage.removeItem("token");
      logoutUser();
      window.location.href = "/";
      toast.success("¡Se cerrado sesión correctamente, ingresa con tu nueva contraseña!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      
      console.log("Cambio de contraseña confirmado.");
    } else {
      console.log("Cambio de contraseña cancelado.");
    }
    
    
  };

  const handlePhoneChangeClick = async () => {
    await dispatch(editUser({ phone: editPhone }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : user.isAdmin ? (
        <DashBoard />
      ) : (
        <div style={{ marginTop: "25rem", marginBottom: "20rem" }}>
          <h1
            style={{ color: "white", fontWeight: "600", marginBottom: "10rem" }}
            >
            Panel de perfil
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
            <div className="profile-container">
              <ToastContainer/>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "1rem", fontWeight: "900" }}>
                  Nombre:
                </p>
                {showNameInput ? (
                  <>
                    <input
                      style={{ width: "20rem" }}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </>
                ) : (
                  <span>{user.name}</span>
                )}
                <button
                  onClick={() => {
                    if (showNameInput) {
                      handleNameChangeClick();
                    }
                    setShowNameInput(!showNameInput);
                  }}
                  style={{
                    height: "4rem",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cambiar
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "1rem", fontWeight: "900" }}>
                  Apellido:
                </p>
                {showLastNameInput ? (
                  <>
                    <input
                      style={{ width: "20rem" }}
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                    />
                  </>
                ) : (
                  <span>{user.lastName}</span>
                )}
                <button
                  onClick={() => {
                    if (showLastNameInput) {
                      handleLastNameChangeClick();
                    }
                    setShowLastNameInput(!showLastNameInput);
                  }}
                  style={{
                    height: "4rem",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cambiar
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "1rem", fontWeight: "900" }}>Email:</p>
                {showEmailInput ? (
                  <>
                    <input
                      style={{ width: "20rem" }}
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </>
                ) : (
                  <span>{user.email}</span>
                )}
                <button
                  onClick={() => {
                    if (showEmailInput) {
                      handleEmailChangeClick();
                    }
                    setShowEmailInput(!showEmailInput);
                  }}
                  style={{
                    height: "4rem",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cambiar
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "1rem", fontWeight: "900" }}>
                  Contraseña:
                </p>
                {showPasswordInput ? (
                  <>
                    <input
                      style={{ width: "20rem" }}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  </>
                ) : (
                  <span>{"******"}</span>
                )}
                <button
                  onClick={() => {
                    if (showPasswordInput) {
                      handlePasswordChangeClick();
                    }
                    setShowPasswordInput(!showPasswordInput);
                  }}
                  style={{
                    height: "4rem",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cambiar
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ marginRight: "1rem", fontWeight: "900" }}>
                  Telefono:
                </p>
                {showPhoneInput ? (
                  <>
                    <input
                      style={{ width: "20rem" }}
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </>
                ) : (
                  <span>{user.phone}</span>
                )}
                <button
                  onClick={() => {
                    if (showPhoneInput) {
                      handlePhoneChangeClick();
                    }
                    setShowPhoneInput(!showPhoneInput);
                  }}
                  style={{
                    height: "4rem",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cambiar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

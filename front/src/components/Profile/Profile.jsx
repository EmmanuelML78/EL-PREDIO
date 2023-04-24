import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import Loading from "../Loading/Loading.jsx";
import DashBoard from "../DashBoard/DashBoard";
import "./Profile.css";
import moment from "moment";
// import styled from "styled-components";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : user.isAdmin ? (
        <DashBoard />
      ) : (
        <>
          <h1 style={{ color: "white", fontWeight: "600" }}>Panel de perfil</h1>
          <div className="profile-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                placeItems: "flex-start",
                width: "40rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom:"1rem" }}>
                <p style={{ marginRight: "1rem" }}>Nombre:</p>
                <p>{user.name}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom:"1rem" }}>
                <p style={{ marginRight: "1rem" }}>Apellido:</p>
                <p>{user.lastName}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom:"1rem" }}>
                <p style={{ marginRight: "1rem" }}>Email:</p>
                <p>{user.email}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom:"1rem" }}>
                <p style={{ marginRight: "1rem" }}>Miembro desde:</p>
                <p>{moment(user.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                placeItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ height: "4rem", marginBottom:"1rem" }}>Cambiar</button>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ height: "4rem", marginBottom:"1rem" }}>Cambiar</button>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ height: "4rem", marginBottom:"1rem" }}>Cambiar</button>
              </div>
              <button style={{ marginTop: "1rem", height: "4rem" }}>
                Cambiar contraseña
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import Loading from "../Loading/Loading.jsx";
import DashBoard from "../DashBoard/DashBoard";
import "./Profile.css";
// import styled from "styled-components";

const Profile = (props) => {
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
        <div className="profile-container">
          <h1 style={{ color: "white", fontWeight: "600" }}>Panel de perfil</h1>
          <p>
            Nombre: {user.name} <button style={{marginLeft: "1rem", height: "4rem"}}>Editar</button>
          </p>
          <p>
            Apellido: {user.lastName}
            <button style={{marginLeft: "1rem", height: "4rem"}}>Editar</button>
          </p>
          <p>
            Email: {user.email}
            <button style={{marginLeft: "1rem", height: "4rem"}}>Cambiar</button>
          </p>

          <button>Cambiar contraseña</button>
        </div>
      )}
    </>
  );
};

export default Profile;

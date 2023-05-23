import React, { useEffect } from "react";
import { useState } from "react";
import s from "./DashBoard.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import Profile from "../Profile/Profile.jsx";
import UsersTable from "../UsersTable/UsersTable";
import CanchasTable from "../CanchasTable/CanchasTable";
import ReservasTable from "../ReservasTable/ReservasTable";
import Error401 from "../Error401/Error401";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function DashBoard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState("reservas");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

  const handleReservas = () => {
    setSelectedTable("reservas");
  };
  const handleUsuarios = () => {
    setSelectedTable("usuarios");
  };
  // const handleCanchas = () => {
  //   setSelectedTable("canchas");
  // };

  return (
    <>
      {!isLoading && !user ? (
        history.push("/login")
      ) : !isLoading && user.isAdmin ? (
        <>
          <Navbar />
          <div className={s.dashboardContainer}>
            <h1 style={{ color: "white", fontWeight: "600", margin: "2rem" }}>
              Panel de Administrador
            </h1>
            <div style={{ display: "flex" }}>
              <div className={s.tabContainer}>
                <button className={s.tab} onClick={handleReservas}>
                  Reservas
                </button>
                <button className={s.tab} onClick={handleUsuarios}>
                  Usuarios
                </button>
                {/* <button className={s.tab} onClick={handleCanchas}>Canchas</button> */}
              </div>
              <div>
                {selectedTable === "reservas" ? (
                  <ReservasTable />
                ) : selectedTable === "canchas" ? (
                  <CanchasTable />
                ) : selectedTable === "usuarios" ? (
                  <UsersTable />
                ) : null}
              </div>
              {/* <div style={{ margin: "1rem" }}>
                <CanchasTable />
              </div>
              <div>
                <UsersTable />
              </div>
              <div>
                <ReservasTable />
              </div> */}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        user &&
        !user.isAdmin && (
          <>
            <Navbar />
            <div style={{ marginBottom: "5rem", marginTop: "-10rem" }}>
              <Profile />
            </div>
            <Footer />
          </>
        )
      )}
    </>
  );
}

export default DashBoard;

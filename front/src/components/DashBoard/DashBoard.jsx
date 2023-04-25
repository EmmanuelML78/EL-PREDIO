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
function DashBoard() {
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
      {!isLoading && !user ? (
        <Error401 />
      ) : !isLoading && user.isAdmin ? (
        <>
          <Navbar />
          <div className={s.dashboardContainer}>
            <h1 style={{color: "white", fontWeight: "600", margin: "2rem"}}>Panel de control</h1>
            {/* <div>
              <select className={s.input}>
              <option value="">Ordenar por</option>
              <option value="asc">Nombre ascendente</option>
              <option value="desc">Nombre descendente</option>
              <option value="menor">Menor precio</option>
              <option value="mayor">Mayor precio</option>
              </select>
              <input className={s.input} type="text" placeholder="Buscar..." />
            <button>Buscar</button> */}
            {/* </div> */}
            <div>
              <div style={{ margin: "1rem" }}>
                <CanchasTable />
              </div>
              <div>
                <UsersTable />
              </div>
              <div>
                <ReservasTable />
              </div>
            </div>
            <Link to="/creador">
              <button>Creador</button>
            </Link>
          </div>
          <Footer />
        </>
      ) : (
        user &&
        !user.isAdmin && (
          <>
            <Navbar />
            <div style={{marginBottom: "5rem", marginTop: "-10rem"}}>
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

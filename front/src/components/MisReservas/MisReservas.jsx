import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import Loading from "../Loading/Loading";
import moment from "moment";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import s from "./MisReservas.module.css";
import { AiFillEdit } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MisReservas = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);
  console.log("user: ", user);

  return (
    <>
      <Navbar />
      <div className={s.container}>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : user ? (
          <>
            <h1 className={s.title}>Mis reservas</h1>
            <div className={s.reservasTableContainer}>
              <table className={s.reservasTable}>
                <thead>
                  <tr>
                    <th>Cancha</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Creacion</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {user.reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.cancha?.name}</td>
                      <td>{moment(reserva.date).format("DD-MM-YYYY")}</td>
                      <td>
                        {moment(reserva.start, "HH:mm:ss").format("HH:mm")}
                      </td>
                      <td>{reserva.deletedAt ? "Cancelada" : reserva.status === 'pending' ? 'Pendiente de pago' : "Confirmada"}</td>
                      <td>{moment(reserva.createdAt).format("DD-MM-YYYY")}</td>
                      <td>
                        <button>
                          <AiFillEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          history.push("/login")
        )}
      </div>
      <Footer />
    </>
  );
};

export default MisReservas;

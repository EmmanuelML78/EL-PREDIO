import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import Loading from "../Loading/Loading";
import moment from "moment";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MisReservas = () => {
  const dispatch = useDispatch();
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
      <Header />
      <h1>Mis reservas</h1>
      <div>
        {isLoading ? (
          <h1>
            <Loading />
          </h1>
        ) : (
          <table className="tabla">
            <thead className="head-tabla">
              <tr>
                <th style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  Cancha
                </th>
                <th style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  Fecha
                </th>
                <th style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  Hora
                </th>
                <th style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  Estado
                </th>
                <th style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  Creacion
                </th>
              </tr>
            </thead>
            <tbody className="body-tabla">
              {user.reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                    {reserva.cancha.name}
                  </td>
                  <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                    {reserva.date}
                  </td>
                  <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                    {moment(reserva.start, "HH:mm:ss").format("HH:mm")}
                  </td>
                  <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                    {reserva.status}
                  </td>
                  <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MisReservas;

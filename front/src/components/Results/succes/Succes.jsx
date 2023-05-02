import { Link } from "react-router-dom";
import style from "./Succes.module.css";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   putReserva,
//   getReservaById,
// } from "../../../redux/actions/reservaActions";
// import { connect } from "react-redux";

const Succes = () => {
  // const dispatch = useDispatch();{ match, reserva }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const id = parseInt(match.params.id);
  //     await getReservaById(id);
  //   };
  //   fetchData();
  // }, [getReservaById, match.params.id]);

  // const reservaPago = {
  //   id: reserva.id,
  //   date: reserva.date,
  //   start: reserva.start,
  //   end: reserva.end,
  //   status: "success",
  //   hasPromo: reserva.hasPromo,
  // };

  // useEffect(() => {
  //   dispatch(putReserva(reservaPago));
  // }, []);
  return (
    <>
      <div className={style.succes}>
        <h1>EL PAGO EXITOSO</h1>
        <Link to={"/misreservas"}>
          <button>volver al establecimiento</button>
        </Link>
      </div>
    </>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     reserva: state.reservas.reservas,
//   };
// };

// export default connect(mapStateToProps, { getReservaById })(Succes);
export default Succes;

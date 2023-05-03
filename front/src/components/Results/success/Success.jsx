import { Link } from "react-router-dom";
import style from "./Succes.module.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Success = () => {
  toast.success("Se agendo la reserva correctamente!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
  return (
    <>
      <ToastContainer />
      <div className={style.succes}>
        <h1 style={{ fontWeight: "700", color: "white", margin: "2rem" }}>
          Reserva pagada con éxito
        </h1>
        <Link to={"/misreservas"}>
          <button>Ver mis reservas</button>
        </Link>
      </div>
    </>
  );
};

export default Success;

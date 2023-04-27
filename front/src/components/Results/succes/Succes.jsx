import { Link } from "react-router-dom";
import style from "./Succes.module.css";

const Succes = () => {
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

export default Succes;

import { Link } from "react-router-dom";
import style from "./Pending.module.css";

const Pending = () => {
  return (
    <>
      <div className={style.pending}>
        <h1>EL PAGO ESTA EN PROCESO</h1>
        <Link to={"/misreservas"}>
          <button>volver al establecimiento</button>
        </Link>
      </div>
    </>
  );
};

export default Pending;

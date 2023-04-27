import { Link } from "react-router-dom";
import style from "./Failure.module.css";

const Failure = () => {
  return (
    <>
      <div className={style.failure}>
        <h1>EL PAGO NO FUE APROVADO</h1>
        <Link to={"/home"}>
          <button>volver al establecimiento</button>
        </Link>
      </div>
    </>
  );
};

export default Failure;

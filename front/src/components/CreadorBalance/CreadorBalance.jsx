import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBalance, getBalance } from "../../redux/actions/balanceActions";
import { setUser } from "../../redux/actions/authActions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreadorBalance = () => {
  const [cierreCaja, setCierreCaja] = useState(0);
  const [descripcion, setDescripcion] = useState("Normal");
  const [otroDescripcionVisible, setOtroDescripcionVisible] = useState(false);
  const [otroDescripcion, setOtroDescripcion] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await dispatch(setUser());
      }
      await dispatch(getBalance());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, user]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setDescripcion(value);
    if (value === "Otro") {
      setOtroDescripcionVisible(true);
    } else {
      setOtroDescripcionVisible(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Agregar cierre de Caja",
      message:
        "¿Está seguro que desea subir este cierre de caja con los valores dados?",
      buttons: [
        {
          label: "Agregar",
          onClick: async () => {
            let descripcionFinal = descripcion;
            if (descripcion === "Otro") {
              descripcionFinal = otroDescripcion;
            }
            const postData = { cierreCaja, descripcion: descripcionFinal };
            await dispatch(postBalance(postData));
            toast.success("Cierre de caja hecho correctamente", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          },
        },
        {
          label: "Cancelar",
          onClick: () => {
            toast.error("Cancelado el cierre de caja", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          },
        },
      ],
    });
    setCierreCaja(0);
    setDescripcion("Normal");
    setOtroDescripcion("");
    setOtroDescripcionVisible(false);
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={cierreCaja}
          onChange={(e) => setCierreCaja(e.target.value)}
        />
        <label>
          Descripción:
          <select
            name="Descripción"
            value={descripcion}
            onChange={handleOptionChange}
          >
            <option value="Normal">Normal</option>
            <option value="Pocos Clientes">Pocos Clientes</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
        {otroDescripcionVisible && (
          <input
            type="text"
            value={otroDescripcion}
            onChange={(e) => setOtroDescripcion(e.target.value)}
          />
        )}
        <button
          type="submit"
          style={{ color: "white", backgroundColor: "#166816" }}
        >
          Cierre Caja
        </button>
        <button
          style={{ backgroundColor: "red", color: "white", margin: "10px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CreadorBalance;

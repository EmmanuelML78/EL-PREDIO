import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import {
  getCanchas,
  deleteCancha,
  putCancha,
} from "../../redux/actions/canchaActions";
import "./CanchasTable.css";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
function CanchasTable() {
  const canchas = useSelector((state) => state.canchas.canchas);
  console.log(canchas)
  const [editingCancha, setEditingCancha] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    const fetchCanchas = async () => {
      await dispatch(getCanchas());
      setIsLoading(false);
    };

    fetchCanchas();
  }, [dispatch, reloadTable]);

  const handleEditClick = (canchas) => {
    setEditingCancha(canchas);
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    setEditingCancha({ ...editingCancha, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(formErrors).length === 0 &&
      formErrors.constructor === Object
    ) {
      dispatch(putCancha(editingCancha));

      setIsEditing(false);
      setReloadTable((prevState) => !prevState);
    } else {
      console.log("Error: El formulario tiene errores");
    }
  };

  
  
  const handleValidationAndChangeInput = (field, value) => {
    validateField(field, value);
    handleInputChange(field, value);
  };

  //VALIDATOR-----------------------------
  const validateField = (field, value) => {
    let errors = { ...formErrors };

    switch (field) {
      case "name":
        if (!value || value.trim() === "") {
          errors.name = "El nombre es obligatorio";
        } else {
          delete errors.name;
        }
        break;

      case "description":
        if (!value || value.trim() === "") {
          errors.description = "Llenar la descripcion es obligatorio";
        } else {
          delete errors.description;
        }
        break;

      case "grass":
        if (!value || value.trim() === "") {
          errors.grass = "El tipo de cesped es obligatorio de llenar";
        } else {
          delete errors.grass;
        }
        break;

      case "image":
        if (!value || !validator.isURL(value)) {
          errors.image = "La URL de la imagen no es válida";
        } else {
          delete errors.image;
        }
        break;

      case "price":
        if (!value || value < 0) {
          errors.price = "El precio es obligatorio ";
        } else {
          delete errors.price;
        }
        break;

      case "players":
        const acceptedPlayersValues = ["5", "7", "11"];
        if (!acceptedPlayersValues.includes(value)) {
          errors.players = "La cantidad de jugadores debe ser 5, 7 u 11";
        } else {
          delete errors.players;
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
  };

  return (
    <div className="canchas-table-container">
      {!isEditing && !isLoading && (
        <table className="canchas-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Descripcion</th>
              <th>Horario</th>
              <th>Cesped</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {isLoading ? (
            <span>CARGANDO....</span>
          ) : (
            <tbody>
              {canchas.map((cancha) => (
                <tr key={cancha.id}>
                  <td>{cancha.name}</td>
                  <td>{cancha.players}</td>
                  <td>
                    {cancha.availability ? "Disponible" : "No disponible"}
                  </td>
                  <td>
                    {cancha.open} {cancha.close}
                  </td>
                  <td>{cancha.grass}</td>
                  <td>
                    <button
                      className="delete-icon"
                      onClick={() =>
                        window.confirm("Estas seguro de querer borrar esto?") &&
                        dispatch(deleteCancha(cancha.id))
                      }
                    >
                      <MdDeleteOutline />
                    </button>
                    <button
                      className="edit-icon"
                      onClick={() => handleEditClick(cancha)}
                    >
                      <AiFillEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} className="form-container">
          {/* Nombre */}
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editingCancha.name}
            onChange={(e) =>
              handleValidationAndChangeInput("name", e.target.value)
            }
            required
          />
          {formErrors.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
          {/* Imagen */}
          <label htmlFor="image">Imagen URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={editingCancha.image}
            onChange={(e) =>
              handleValidationAndChangeInput("image", e.target.value)
            }
          />
          {formErrors.image && (
            <p className="error-message">{formErrors.image}</p>
          )}
          {/* Precio */}
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={editingCancha.price}
            onChange={(e) =>
              handleValidationAndChangeInput("price", e.target.value)
            }
            required
          />
          {formErrors.price && (
            <p className="error-message">{formErrors.price}</p>
          )}
          {/* Hora apertura
          <label htmlFor="open">Hora de apertura:</label>
          <input
            type="time"
            id="open"
            name="open"
            value={editingCanch.open}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          /> */}
          {/* Hora cierre */}
          {/* <label htmlFor="close">Hora de cierre:</label>
          <input
            type="time"
            id="close"
            name="close"
            value={editingCanch.close}
            onChange={(e) =>
              seteditingCanch({ ...editingCanch, close: e.target.value })
            }
            required
          /> */}

          {/* Promoción */}
          <label htmlFor="hasPromo">¿Tiene promoción?</label>
          <input
            type="checkbox"
            id="hasPromo"
            name="hasPromo"
            value={editingCancha.hasPromo}
            onChange={(e) => handleInputChange("promo", e.target.value)}
          />
          {/* Descripción */}
          <label htmlFor="description">Descripción:</label>
          <textarea
            name="description"
            value={editingCancha.description}
            onChange={(e) =>
              handleValidationAndChangeInput("description", e.target.value)
            }
            style={{ width: "30rem", height: "10rem" }}
          >
            Descripcion:
          </textarea>
          {formErrors.description && (
            <p className="error-message">{formErrors.description}</p>
          )}
          {/* Disponibilidad */}
          <label htmlFor="availability">Disponibilidad:</label>
          <select
            id="availability"
            name="availability"
            value={editingCancha.availability}
            onChange={(e) => handleInputChange("availability", e.target.value)}
          >
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
          {/* Tipo de césped */}
          <label htmlFor="grass">Tipo de césped:</label>
          <input
            type="text"
            id="grass"
            name="grass"
            value={editingCancha.grass}
            onChange={(e) =>
              handleValidationAndChangeInput("grass", e.target.value)
            }
          />
          {formErrors.grass && (
            <p className="error-message">{formErrors.grass}</p>
          )}
          {/* Cantidad de jugadores */}
          <label htmlFor="players">Players</label>
          <input
            type="number"
            id="players"
            name="players"
            value={editingCancha.players}
            onChange={(e) =>
              handleValidationAndChangeInput("players", e.target.value)
            }
          />
          {formErrors.players && (
            <p className="error-message">{formErrors.players}</p>
          )}
          <button type="submit" style={{backgroundColor: "red"}}>Guardar cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default CanchasTable;

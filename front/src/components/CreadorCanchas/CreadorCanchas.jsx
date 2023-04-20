import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCancha } from "../../redux/actions/canchaActions";
import validator from "validator";
import "./CreadorCanchas.css";
const CreadorCanchas = () => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    open: "",
    close: "",
    hasPromo: false,
    description: "",
    availability: null,
    grass: "",
    players: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateForm(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(formErrors).length === 0 &&
      formErrors.constructor === Object
    ) {
      dispatch(postCancha(formData));
      setFormData({
        name: "",
        image: "",
        price: "",
        open: "",
        close: "",
        hasPromo: false,
        description: "",
        availability: null,
        grass: "",
        players: "",
      });
    } else {
      console.log("Error: El formulario tiene errores");
    }
  };

  const validateForm = (field, value) => {
    const errors = { ...formErrors };

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
    <form onSubmit={handleSubmit}>
      {/* Nombre */}
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />
      {formErrors.name && <p className="error-message">{formErrors.name}</p>}
      {/* Imagen */}
      <label htmlFor="image">Imagen URL:</label>
      <input
        type="url"
        id="image"
        name="image"
        value={formData.image}
        onChange={(e) => handleChange("image", e.target.value)}
      />
      {formErrors.image && <p className="error-message">{formErrors.image}</p>}
      {/* Precio */}
      <label htmlFor="price">Precio:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={(e) => handleChange("price", e.target.value)}
        required
      />
      {formErrors.price && <p className="error-message">{formErrors.price}</p>}
      {/* Hora apertura */}
      <label htmlFor="open">Hora de apertura:</label>
      <input
        type="time"
        id="open"
        name="open"
        value={formData.open}
        onChange={(e) => handleChange("open", e.target.value)}
        required
      />
      {/* Hora cierre */}
      <label htmlFor="close">Hora de cierre:</label>
      <input
        type="time"
        id="close"
        name="close"
        value={formData.close}
        onChange={(e) => handleChange("close", e.target.value)}
        required
      />

      {/* Promoción */}
      <label htmlFor="hasPromo">¿Tiene promoción?</label>
      <input
        type="checkbox"
        id="hasPromo"
        name="hasPromo"
        value={formData.hasPromo}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* Descripción */}
      <label htmlFor="description">Descripción:</label>
      <textarea
        name="description"
        style={{ width: "30rem", height: "10rem" }}
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
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
        value={formData.availability}
        onChange={(e) => handleChange(e.target.value)}
        style={{ width: "20rem", height: "4rem" }}
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
        value={formData.grass}
        onChange={(e) => handleChange("grass", e.target.value)}
      />
      {formErrors.grass && <p className="error-message">{formErrors.grass}</p>}
      {/* Cantidad de jugadores */}
      <label htmlFor="players">Players</label>
      <input
        type="number"
        id="players"
        name="players"
        value={formData.players}
        onChange={(e) => handleChange("players", e.target.value)}
      />
      {formErrors.players && (
        <p className="error-message">{formErrors.players}</p>
      )}
      <button type="submit">Crear Cancha</button>
    </form>
  );
};

export default CreadorCanchas;

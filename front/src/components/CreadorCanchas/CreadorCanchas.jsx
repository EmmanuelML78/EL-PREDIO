import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCancha } from "../../redux/actions/canchaActions";
import "./CreadorCanchas.css"
const CreadorCanchas = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    open: "",
    close: "",
    hasPromo: false,
    description: "",
    availability: true,
    grass: "",
    players: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCancha(formData));
    setFormData({
      name: "",
      image: "",
      price: "",
      open: "",
      close: "",
      hasPromo: false,
      description: "",
      availability: true,
      grass: "",
      players: "",
    });
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
        onChange={handleChange}
        required
      />

      {/* Imagen */}
      <label htmlFor="image">Imagen URL:</label>
      <input
        type="url"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      {/* Precio */}
      <label htmlFor="price">Precio:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      {/* Hora apertura */}
      <label htmlFor="open">Hora de apertura:</label>
      <input
        type="time"
        id="open"
        name="open"
        value={formData.open}
        onChange={(e) => setFormData({ ...formData, open: e.target.value })}
        required
      />
      {/* Hora cierre */}
      <label htmlFor="close">Hora de cierre:</label>
      <input
        type="time"
        id="close"
        name="close"
        value={formData.close}
        onChange={(e) => setFormData({ ...formData, close: e.target.value })}
        required
      />

      {/* Promoción */}
      <label htmlFor="hasPromo">¿Tiene promoción?</label>
      <input
        type="checkbox"
        id="hasPromo"
        name="hasPromo"
        value={formData.hasPromo}
        onChange={(e) =>
          setFormData({ ...formData, hasPromo: e.target.checked })
        }
      />
      {/* Descripción */}
      <label htmlFor="description">Descripción:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      >
        Descripcion:
      </textarea>
      {/* Disponibilidad */}
      <label htmlFor="availability">Disponibilidad:</label>
      <select
        id="availability"
        name="availability"
        value={formData.availability}
        onChange={handleChange}
      >
        <option value="true">Disponible</option>
        <option value="false">No disponible</option>
      </select>
      {/* Tipo de césped */}
      <label
        htmlFor="grass">
        Tipo de césped:
      </label>
      <input
      type="text"
      id="grass"
      name="grass"
      value={formData.grass}
      onChange={handleChange}
      />
      {/* Cantidad de jugadores */}
      <label htmlFor="players">Players</label>
      <input
        type="number"
        id="players"
        name="players"
        value={formData.players}
        onChange={handleChange}
        />
      <button type="submit">Crear Cancha</button>
    </form>
  );
};

export default CreadorCanchas;

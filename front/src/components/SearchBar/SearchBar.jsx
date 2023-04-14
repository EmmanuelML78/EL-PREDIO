import React from "react";

// import s from "./SearchBar.module.css";
// import styled from "styled-components";

const SearchBar = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "1rem	" }}>
      <input
        type="text"
        placeholder="Buscar Tipo De Cancha"
        value={searchTerm}
        onChange={handleChange}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
          border: "none",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
          border: "none",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          color: "white"
        }}
      >
        <option value="">Filtrar Por Disponibilidad</option>
        <option value="available">Disponible</option>
        <option value="notAvailable">No Disponible</option>
      </select>
    </div>
  );
};

export default SearchBar;

import React from "react";

import "./SearchBar.module.css";
// import styled from "styled-components";



const SearchBar = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  playersFilter,
  setPlayersFilter,
}) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterPlayers = (event) => {
    setPlayersFilter(event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "3.5rem	" }}>
      <input
        type="text"
        placeholder="Buscar Tipo De Cancha"
        value={searchTerm}
        onChange={handleChange}
        style={{
          padding: "1rem",
          fontSize: "1.7rem",
          borderRadius: "0.25rem",
          border: "none",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        style={{
          padding: "1rem",
          fontSize: "1.7rem",
          borderRadius: "0.25rem",
          border: "none",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          color: "white",
        }}
      >
        <option value="">Filtrar Por Disponibilidad</option>
        <option value="available">Disponible</option>
        <option value="notAvailable">No Disponible</option>
      </select>
      <select
        value={playersFilter}
        onChange={handleFilterPlayers}
        style={{
          padding: "1rem",
          fontSize: "1.7rem",
          borderRadius: "0.25rem",
          border: "none",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          color: "white",
        }}
      >
        <option value="">Filtrar por Capacidad</option>
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="11">11</option>
      </select>
    </div>
  );
};

export default SearchBar;

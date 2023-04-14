import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import cars from "./data.json"


function Cards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const data = cars.data;
  

  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filteredData = data.filter(
    (item) =>
      normalize(item.description.toLowerCase()).includes(
        normalize(searchTerm.toLowerCase())
      ) &&
      (filter === "" ||
        (filter === "available" && item.available) ||
        (filter === "notAvailable" && !item.available))
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "6rem",
        marginBottom: "6rem"
      }}
    >
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card
              image={item.image}
              title={item.title}
              description={item.description}
              available={item.available}
            />
          ))
        ) : (
          <div
            style={{
              color: "#d9534f",
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginTop: "2rem",
            }}
          >
            "Lo siento, no se encontró ninguna cancha que coincida con la
            búsqueda."
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;

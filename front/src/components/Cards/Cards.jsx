import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";
import cars from "./data.json";

function Cards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const data = cars.data;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

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
        marginBottom: "6rem",
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
          filteredData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Cards;

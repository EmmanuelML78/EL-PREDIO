import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import { getCanchas } from "../../redux/actions/canchaActions";
import Card from "../Card/Card";


function Cards() {
  const dispatch = useDispatch();
  const canchas = useSelector((state) => state.canchas);
  console.log(canchas)
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [playersFilter, setPlayersFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  useEffect(() => {
    dispatch(getCanchas(currentPage, itemsPerPage, searchTerm, filter));
  }, [dispatch]);

  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filteredData = canchas.filter(
    (item) =>
      normalize(item.description.toLowerCase()).includes(
        normalize(searchTerm.toLowerCase())
      ) &&
      (filter === "" ||
        (filter === "available" && item.availability) ||
        (filter === "notAvailable" && !item.availability)) &&
      (playersFilter === "" || parseInt(playersFilter) === item.players)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "0.5rem",
        marginBottom: "6rem",
      }}
    >
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        playersFilter={playersFilter}
        setPlayersFilter={setPlayersFilter}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "5rem"
        }}
      >
        {filteredData.length > 0 ? (
          filteredData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.name}
                description={item.description}
                players={item.players}
                availability={item.availability}
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

import React from "react";

// import p from "./Pagination.module.css";
// import styled from "styled-components";

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
	const handleClickNext = () => {
	  if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
		setCurrentPage(currentPage + 1);
	  }
	};
  
	const handleClickPrev = () => {
	  if (currentPage > 1) {
		setCurrentPage(currentPage - 1);
	  }
	};
  
	return (
	  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "1.5rem" }}>
		<button onClick={handleClickPrev} disabled={currentPage === 1}>
		  {'<'}
		</button>
		<span style={{marginLeft: "1rem", marginRight: "1rem", fontSize: "1.5rem"}}>{currentPage}</span>
		<button onClick={handleClickNext} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
		  {'>'}
		</button>
	  </div>
	);
  };

export default Pagination;

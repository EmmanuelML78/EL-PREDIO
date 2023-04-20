import React from "react";


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
		<button onClick={handleClickPrev} disabled={currentPage === 1} className="button-pagination">
		  {'<'}
		</button>
		<span style={{marginLeft: "1rem", marginRight: "1rem", fontSize: "2.5rem", color:"white"}}>{currentPage}</span>
		<button onClick={handleClickNext} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)} className="button-pagination">
		  {'>'}
		</button>
	  </div>
	);
  };

export default Pagination;

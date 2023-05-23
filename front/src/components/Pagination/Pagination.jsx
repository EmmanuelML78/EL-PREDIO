// import React from "react";

// // import styled from "styled-components";

// const Pagination = ({
//   itemsPerPage,
//   totalItems,
//   currentPage,
//   setCurrentPage,
// }) => {

// 	const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const handleClickNext = () => {
//     if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleClickPrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const pages = [];
//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pages.push(i);
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         marginBottom: "1.5rem",
//       }}
//     >
//       <button
//         onClick={handleClickPrev}
//         disabled={currentPage === 1}
//         className="button-pagination"
// 		style={{
// 			backgroundColor: currentPage === 1 ? 'red' : '',
// 			color: currentPage === 1 ? 'white' : '',
// 			marginRight: "0.5rem",
// 			border: "none",
// 			padding: "0.5rem 1rem",
// 			borderRadius: "4px",
// 			cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
// 		  }}
//       >
//         {"<"}
//       </button>
// 	  {[...Array(totalPages)].map((_, i) => (
//         <span
//           key={i}
//           style={{
//             marginLeft: "0.5rem",
//             marginRight: "0.5rem",
// 			margin: "0.5",
// 			padding: "1rem",
//             fontSize: "2.5rem",
//             color: currentPage === i+1 ? 'white' : '',
//             cursor: currentPage === i+1 ? 'not-allowed' : 'pointer'
//           }}
//           className={currentPage === i+1 ? 'current-page' : ''}
//           onClick={() => setCurrentPage(i+1)}
//         >
//           {i+1}
//         </span>
//       ))}
//       <button
//         onClick={handleClickNext}
//         disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
// 		style={{
// 			backgroundColor: currentPage === totalPages ? 'red' : '',
// 			color: currentPage === totalPages ? 'white' : '',
// 			marginLeft: "0.5rem",
// 			border: "none",
// 			padding: "0.5rem 1rem",
// 			borderRadius: "4px",
// 			cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
// 		  }}
//       >
//         {">"}
//       </button>
//     </div>
//   );
// };

// export default Pagination;

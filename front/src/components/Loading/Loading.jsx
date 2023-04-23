import React from "react";
import spinner from "../../assets/Spinner-1.1s-200px.gif"

// import l from "./Loading.module.css";
// import styled from "styled-components";

const Loading = (props) => {
	return (
		<div style={{display: "flex", flexDirection: "column"}}>
			<h2 style={{color: "white"}}>Cargando...</h2>
			<img src={spinner} alt="" />
		</div>
	);
};

export default Loading;

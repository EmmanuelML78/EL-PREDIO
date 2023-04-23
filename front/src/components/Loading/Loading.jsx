import React from "react";
import { collapseToast } from "react-toastify";

// import l from "./Loading.module.css";
// import styled from "styled-components";

const Loading = (props) => {
	return (
		<div style={{display: "flex", flexDirection: "column"}}>
			<h2 style={{color: "white"}}>Cargando...</h2>
			<img src="" alt="" />
		</div>
	);
};

export default Loading;

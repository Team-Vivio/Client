import React from "react";

const HorizonLine = ({ text }) => {
	return (
		<div
			style={{
				width: "19.792vw",
				textAlign: "center",
				borderBottom: "1px solid #aaa",
				lineHeight: "0.1em",
				margin: "1.026vh 0 2.051vh",
			}}
		>
			<span style={{ 
				background: "#fff",
			 	padding: "0 10px",
				fontweight: 500,
				fontSize: "2.564vh",
				// lineHeight: "140%",
				letterSpacing: "0.02em",
				textTransform: "capitalize",
				color: "#626262"

			 }}>{text}</span>
		</div>
	);
};

export default HorizonLine;

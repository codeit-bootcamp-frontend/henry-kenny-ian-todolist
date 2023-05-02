import React from "react";

const Logo = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        border: "1px solid black",
        borderRadius: "20px",
        backgroundColod: "beige",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src="assets/Logo.png"
          style={{ width: "106px", height: "115px" }}
        ></img>
      </div>
    </div>
  );
};

export default Logo;

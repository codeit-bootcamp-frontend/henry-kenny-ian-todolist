import React from "react";

const Logo = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "20px",
        background: "linear-gradient(145deg, #d4d4d9, #fdfdff)",
        boxShadow: "9px 9px 18px #cdcdd2, -9px -9px 18px #ffffff",
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

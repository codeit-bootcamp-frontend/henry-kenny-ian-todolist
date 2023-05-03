import React from "react";
import { buttonTypeMap } from "../../static/maps";

const Button = ({ onClick, buttonType }) => {
  const targetBtn = buttonTypeMap[buttonType];
  return (
    <button
      onClick={onClick}
      style={targetBtn.style}
      type={targetBtn.type ?? ""}
    >
      <div style={{ width: targetBtn.width, height: targetBtn.height }}>
        <img src={targetBtn.src} style={{ width: "100%", display: "block" }} />
      </div>
    </button>
  );
};

export default Button;

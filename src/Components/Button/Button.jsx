import React from "react";

const BUTTON_STYLE_DELETE = {
  width: "21px",
  height: "27px",
};

const BUTTON_STYLE_EDIT = {
  width: "24px",
  height: "24px",
};

const Button = ({ src, onClick, style, type, buttonType }) => {
  return (
    <button onClick={onClick} style={style} type={buttonType}>
      <div style={type === "edit" ? BUTTON_STYLE_EDIT : BUTTON_STYLE_DELETE}>
        <img src={src} style={{ width: "100%", display: "block" }} />
      </div>
    </button>
  );
};

export default Button;

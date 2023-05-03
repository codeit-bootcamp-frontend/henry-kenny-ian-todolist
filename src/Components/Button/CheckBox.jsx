import { useState } from "react";

const CHECKBOX_STYLE = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#ececf1",
  border: "none",
  position: "absolute",
  top: "17px",
  left: "28px",
};

const UNPRESSED_SHADOW = {
  boxShadow: "5px 5px 10px #cdcdd2,-5px -5px 10px #ffffff",
};

const PRESSED_SHADOW = {
  boxShadow: "inset 5px 5px 10px #cdcdd2,inset -5px -5px 10px #ffffff",
};

const CheckBox = ({ checked, onClick, itemId }) => {
  return (
    <button
      style={
        checked
          ? { ...CHECKBOX_STYLE, ...PRESSED_SHADOW }
          : { ...CHECKBOX_STYLE, ...UNPRESSED_SHADOW }
      }
      onClick={() => {
        onClick(itemId);
      }}
    >
      {checked && (
        <img
          src="assets/checkmark.png"
          width="29"
          height="23"
          alt="check mark"
        />
      )}
    </button>
  );
};

export default CheckBox;

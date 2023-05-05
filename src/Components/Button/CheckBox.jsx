import { useContext, useState } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import styles from "./CheckBox.module.css";

const UNPRESSED_SHADOW = {
  boxShadow: "5px 5px 10px #cdcdd2,-5px -5px 10px #ffffff",
};

const PRESSED_SHADOW = {
  boxShadow: "inset 5px 5px 10px #cdcdd2,inset -5px -5px 10px #ffffff",
};

const CheckBox = ({ checked, onClick, itemId }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={`${styles.checkbox}`}
      style={checked ? PRESSED_SHADOW : UNPRESSED_SHADOW}
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

import React, { useContext, useEffect, useState } from "react";
import { buttonTypeMap } from "../../static/maps";
import { ThemeContext } from "../../Contexts/ThemeContext";
import styles from "./Button.module.css";

const Button = ({ onClick, buttonType }) => {
  const { theme } = useContext(ThemeContext);
  const targetBtn = buttonTypeMap[buttonType];
  const buttonStyle = `${styles[buttonType]}`;
  const [buttonClass, setButtonClass] = useState(
    `${buttonStyle} ${targetBtn[theme].className} ${theme}`
  );
  const changeToConcave = (e) => {
    e.stopPropagation();
    setButtonClass((prev) => prev.replace("convex", "concave"));
  };

  const changeToConvex = (e) => {
    e.stopPropagation();
    setButtonClass((prev) => prev.replace("concave", "convex"));
  };

  useEffect(() => {
    setButtonClass(`${buttonStyle} ${targetBtn[theme].className} ${theme}`);
  }, [theme]);

  return (
    <button
      onClick={onClick}
      onPointerDown={changeToConcave}
      onPointerLeave={changeToConvex}
      className={buttonClass}
      type={targetBtn.type ?? ""}
    >
      <div
        style={{ width: targetBtn.imgBoxWidth, height: targetBtn.imgBoxHeight }}
      >
        <img
          src={targetBtn[theme].src}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    </button>
  );
};

export default Button;

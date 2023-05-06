import React, { useContext, useEffect, useState } from "react";
import { desktopButtonMap, mobileButtonMap } from "../../static/maps";
import { ThemeContext } from "../../Contexts/ThemeContext";
import styles from "./Button.module.css";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

const Button = ({ onClick, buttonType }) => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const buttonTypeMap = isMobile ? mobileButtonMap : desktopButtonMap;
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
    <motion.button
      initial={{ opacity: 0, scale: 0.5, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.5, x: 100 }}
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
    </motion.button>
  );
};

export default Button;

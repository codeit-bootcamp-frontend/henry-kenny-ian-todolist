import React, { useContext } from "react";
import styles from "./Logo.module.css";
import { ThemeContext } from "../../Contexts/ThemeContext";
const Logo = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container}  convex-${theme}-lg`}>
      <div>
        <img className={styles.logoImg} src="assets/Logo.png" />
      </div>
    </div>
  );
};

export default Logo;

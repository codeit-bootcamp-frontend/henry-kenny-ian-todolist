import React, { useContext } from "react";
import styles from "./Logo.module.css";
import { ThemeContext } from "../../Contexts/ThemeContext";
const Logo = ({ isMobile }) => {
  const { theme } = useContext(ThemeContext);

  if (!isMobile)
    return (
      <div className={`${styles.container}  convex-${theme}-lg`}>
        <div className={styles.logoImg}>
          <img src="assets/Logo.png" />
        </div>
      </div>
    );
  return (
    <div className={styles.logoImgMobile}>
      <img src="assets/Logo.png" />
    </div>
  );
};

export default Logo;

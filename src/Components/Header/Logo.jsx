import React from "react";
import styles from "./Logo.module.css";
const Logo = () => {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.logoImg} src="assets/Logo.png" />
      </div>
    </div>
  );
};

export default Logo;

import React, { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ checked, onChange, isMobile, handleDiameter, key }) => {
  const [device, setDevice] = useState(isMobile ? "mobile" : "desktop");

  useEffect(() => {
    setDevice(isMobile ? "mobile" : "desktop");
  }, [isMobile]);

  return (
    <ReactSwitch
      checked={checked}
      onChange={onChange}
      handleDiameter={handleDiameter}
      offColor="#4d4d4d"
      onColor="#15C714"
      offHandleColor="#fff"
      onHandleColor="#fff"
      height={isMobile ? 24 : 50}
      width={isMobile ? 58 : 120}
      borderRadius={50}
      activeBoxShadow="0px 0px 1px 2px #fffc35"
      uncheckedIcon={
        <div className={styles.container}>
          <img
            src="assets/dark-theme.svg"
            className={
              device === "desktop"
                ? `${styles.darkIconMoonDesktop}`
                : `${styles.darkIconMoonMobile}`
            }
          />
          <img
            src="assets/star-6.svg"
            className={
              device === "desktop"
                ? `${styles.darkIconStarDesktop}`
                : `${styles.darkIconStarMobile}`
            }
          />
        </div>
      }
      checkedIcon={
        <div className={styles.container}>
          <img
            src="assets/light-theme.svg"
            className={
              device === "desktop"
                ? `${styles.lightIconDesktop}`
                : `${styles.lightIconMobile}`
            }
          />
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
};

export default ToggleSwitch;

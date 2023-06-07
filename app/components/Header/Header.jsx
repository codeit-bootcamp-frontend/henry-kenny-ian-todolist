"use client";

import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import ToggleSwitch from "./ToggleSwitch";
import { useMediaQuery } from "react-responsive";
import ThemeContext from "../../Contexts/ThemeContext";
import Button from "../Button/Button";
import signout from "../../lib/firebase/signout";
import styles from "./Header.module.css";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [device, setDevice] = useState(isMobile ? "mobile" : "desktop");
  const { theme, setTheme } = useContext(ThemeContext);
  const user = useRecoilValue(userState);

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setDevice(isMobile ? "mobile" : "desktop");
  }, [isMobile]);

  const handleLogout = async () => {
    const { error } = await signout();
    if (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    document.body.style.setProperty(
      "background-color",
      theme === "light" ? "#ececf1" : "#36393b"
    );
    document.body.style.setProperty(
      "color",
      theme === "light" ? "#767676" : "#c1c1c1"
    );
  }, [theme]);

  return (
    <header className={styles.header}>
      <div className={styles.dummyBox}></div>
      <div className={styles.logoContainer}>
        <Logo isMobile={isMobile}></Logo>
      </div>
      <div className={styles.switchContainer}>
        {device === "mobile" ? (
          <ToggleSwitch
            checked={theme === "light"}
            onChange={handleChange}
            isMobile={isMobile}
            handleDiameter={20}
            key={device}
          />
        ) : (
          <ToggleSwitch
            checked={theme === "light"}
            onChange={handleChange}
            isMobile={isMobile}
            handleDiameter={38}
            key={device}
          />
        )}

        {user && (
          <div className={styles.btnContainer}>
            <Button onClick={handleLogout} buttonType="logout" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

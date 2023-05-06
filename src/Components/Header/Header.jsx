import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import ToggleSwitch from "./ToggleSwitch";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Button from "../Button/Button";
import { firebaseAuth } from "../../service/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ isLoggedIn }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [device, setDevice] = useState(isMobile ? "mobile" : "desktop");
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setDevice(isMobile ? "mobile" : "desktop");
  }, [isMobile]);

  const handleLogout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
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
    <header>
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
          />
        ) : (
          <ToggleSwitch
            checked={theme === "light"}
            onChange={handleChange}
            isMobile={isMobile}
            handleDiameter={38}
          />
        )}

        {isLoggedIn && (
          <div className={styles.btnContainer}>
            <Button onClick={handleLogout} buttonType="logout" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

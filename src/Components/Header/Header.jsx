import React, { useContext, useEffect } from "react";
import Logo from "./Logo";
import ToggleSwitch from "./ToggleSwitch";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Button from "../Button/Button";
import { firebaseAuth } from "../../service/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ isLoggedIn }) => {
  const isDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

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
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

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
      <div className={styles.logoContainer}>
        <Logo></Logo>
      </div>
      <div className={styles.switchContainer}>
        <ToggleSwitch
          checked={theme === "light"}
          onChange={handleChange}
          isMobile={isMobile}
        />
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

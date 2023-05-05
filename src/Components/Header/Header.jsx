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
  const { theme, setTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const navigate = useNavigate();

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
    document.body.style.setProperty(
      "background-color",
      theme === "light" ? "#ececf1" : "#36393b"
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

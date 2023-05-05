import React, { useContext } from "react";
import Logo from "./Logo";
import ToggleSwitch from "./ToggleSwitch";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Button from "../Button/Button";
import { firebaseAuth } from "../../service/firebase";
import { useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const navigate = useNavigate();

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.style.setProperty(
      "background-color",
      theme === "light" ? "#ececf1" : "#36393b"
    );
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

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "58px",
        marginBottom: "58px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo></Logo>
      </div>
      <div
        style={{
          position: "absolute",
          top: "106px",
          right: "84px",
        }}
      >
        <ToggleSwitch
          checked={theme === "light"}
          onChange={handleChange}
          isMobile={isMobile}
        />
        {isLoggedIn && (
          <div style={{ marginTop: "20px" }}>
            <Button onClick={handleLogout} buttonType="logout" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

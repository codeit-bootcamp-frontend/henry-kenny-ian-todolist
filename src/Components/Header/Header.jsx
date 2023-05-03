import React, { useContext } from "react";
import Logo from "./Logo";
import ToggleSwitch from "./ToggleSwitch";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../../Contexts/ThemeContext";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo></Logo>
      </div>
      <ToggleSwitch
        checked={theme === "light"}
        onChange={handleChange}
        isMobile={isMobile}
      />
    </header>
  );
};

export default Header;

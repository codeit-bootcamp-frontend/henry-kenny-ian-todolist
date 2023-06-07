"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ThemeContext from "./ThemeContext";

const ThemeProvider = (props) => {
  const isDark = useMediaQuery({ query: "(prefers-color-scheme: dark" });
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (isDark ? "dark" : "light")
  );

  useEffect(() => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

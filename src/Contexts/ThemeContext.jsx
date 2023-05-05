import { createContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const ThemeContext = createContext(null);

export const ThemeProvider = (props) => {
  const isDark = useMediaQuery({ query: "(prefers-color-scheme: dark" });
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (isDark ? "dark" : "light")
  );

  useEffect(() => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

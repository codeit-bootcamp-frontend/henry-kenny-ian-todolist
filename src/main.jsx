import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

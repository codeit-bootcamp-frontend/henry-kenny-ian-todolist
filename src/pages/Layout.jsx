import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import { ThemeProvider } from "../Contexts/ThemeContext";

const Layout = ({ isLoggedIn }) => {
  return (
    <ThemeProvider>
      <Header isLoggedIn={isLoggedIn}></Header>
      <Outlet />
    </ThemeProvider>
  );
};

export default Layout;

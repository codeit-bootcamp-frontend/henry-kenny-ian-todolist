import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const Layout = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}></Header>
      <Outlet />
    </>
  );
};

export default Layout;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";

export const AppRouter = ({ isLoggedIn, userInfo }) => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} userInfo={userInfo} />}
          ></Route>
          <Route path="/signin" element={<SigninPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

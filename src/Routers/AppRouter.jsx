import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

export const AppRouter = ({ isLoggedIn, userInfo }) => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} />}>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} userInfo={userInfo} />}
          />
          <Route
            path="/signin"
            element={
              <PrivateRoute enable={!isLoggedIn} redirect="/">
                <SigninPage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

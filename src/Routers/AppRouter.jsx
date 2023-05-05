import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import AuthRouter from "./AuthRouter";
import NotFoundPage from "../pages/NotFoundPage";

export const AppRouter = ({ isLoggedIn, userInfo }) => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} />}>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} userInfo={userInfo} />}
          ></Route>
          <Route
            path="/signin"
            element={
              <AuthRouter
                condition={!isLoggedIn}
                destinationPage={<SigninPage />}
                redirectPage={
                  <HomePage isLoggedIn={isLoggedIn} userInfo={userInfo} />
                }
              />
            }
          ></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
};

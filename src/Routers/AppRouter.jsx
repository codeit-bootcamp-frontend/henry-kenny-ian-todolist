import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";

export const AppRouter = ({ isLoggedIn, userInfo }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomePage userInfo={userInfo} />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<SigninPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};

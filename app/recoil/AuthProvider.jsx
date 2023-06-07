"use client";

import useObserveAuthChange from "../hooks/useObserveAuthChange";
const AuthProvider = ({ children }) => {
  useObserveAuthChange();

  return <>{children}</>;
};

export default AuthProvider;

import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ enable, redirect, children }) => {
  if (!enable) {
    return <Navigate to={redirect} />;
  }
  return children;
};

export default PrivateRoute;

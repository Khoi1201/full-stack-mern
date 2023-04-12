// higher order components
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";
import Navbarmenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ children, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );

  return isAuthenticated ? (
    <>
      <Navbarmenu />
      {children ? children : <Outlet {...rest} />}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;

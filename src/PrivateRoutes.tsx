import React from "react";
import { Navigate } from "react-router-dom";
import keycloak from "./utils/auth";

// type PrivateRouteProps = RouteProps;

type IProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: IProps) => {
  if (keycloak.authenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;

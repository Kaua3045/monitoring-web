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

// const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
//   // eslint-disable-next-line react/prop-types
//   const { element, ...other } = props;
//   const Element: any = element;
//   // eslint-disable-next-line react/jsx-props-no-spreading
//   return (
//     <Route
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...other}
//       element={(prop: JSX.IntrinsicAttributes) => {
//         return keycloak.authenticated ? (
//           <Element {...prop} />
//         ) : (
//           <Navigate to="/login" />
//         );
//       }}
//     />
//   );
// };

export default PrivateRoute;

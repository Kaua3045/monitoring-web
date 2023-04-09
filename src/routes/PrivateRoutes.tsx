import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

type IProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: IProps) => {
  const auth = useAuth();

  if (auth.token) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;

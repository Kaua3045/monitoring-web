import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

type IProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: IProps) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div className="w-screen h-screen text-gray-600 text-xl flex justify-center items-center">
        Carregando...
      </div>
    );
  }

  if (keycloak.authenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;

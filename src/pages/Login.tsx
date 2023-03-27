import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { keycloak, initialized } = useKeycloak();

  if (keycloak.authenticated) {
    return <Navigate to="/" />;
  }

  if (!initialized) {
    return (
      <div className="w-screen h-screen text-gray-600 text-xl flex justify-center items-center">
        Carregando...
      </div>
    );
  }

  keycloak.login();
  return (
    <div className="w-screen h-screen text-gray-600 text-xl flex justify-center items-center">
      Carregando...
    </div>
  );
};

export default Login;

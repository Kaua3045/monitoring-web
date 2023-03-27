import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { keycloak } = useKeycloak();

  if (keycloak.authenticated) {
    return <Navigate to="/" />;
  }
  keycloak.register();
  return (
    <div className="w-screen h-screen text-gray-600 text-xl flex justify-center items-center">
      Carregando...
    </div>
  );
};

export default Register;

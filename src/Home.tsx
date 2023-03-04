import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useAuth } from "./context/auth/useAuth";

const Home = () => {
  const { keycloak, initialized } = useKeycloak();
  const { user, retrieveOrCreate } = useAuth();

  useEffect(() => {
    async function data() {
      if (initialized && keycloak.authenticated) {
        await retrieveOrCreate({
          userId: keycloak.tokenParsed?.sub,
          username: keycloak.tokenParsed?.preferred_username,
          email: keycloak.tokenParsed?.email,
          avatarUrl: keycloak.tokenParsed?.avatarUrl,
        });
      }
    }

    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, keycloak]);

  return (
    <div>
      <h1 className="text-green-800 text-4xl">
        Welcome {user?.userId} to the Homepage
      </h1>
    </div>
  );
};

export default Home;

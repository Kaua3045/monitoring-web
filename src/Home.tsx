import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import Api from "./utils/api";

type IUser = {
  userId: string | undefined;
  profileId: string | undefined;
  email: string | undefined;
  avatarUrl: string | undefined;
};

const Home = () => {
  const { keycloak, initialized } = useKeycloak();
  const [user, setUser] = useState<IUser>();
  // verificar se já existe no state se não seta de novo
  // ou então criar um método que busca / cria o user e chamar ele quando precisar,
  // se existir no localstorage pega de lá se não vai ao backend
  useEffect(() => {
    async function recover() {
      if (initialized && keycloak.authenticated) {
        const response = await Api.get(`/profile/${keycloak.tokenParsed?.sub}`)
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
            }
          })
          .catch((err) => {
            if (err.response.status === 404) {
              Api.post("/profile", {
                userId: keycloak.tokenParsed?.sub,
                avatarUrl: null,
              });
            }
          });

        return response;
      }
    }
    recover();
  }, [initialized, keycloak]);

  return (
    <div>
      <h1 className="text-green-800 text-4xl">
        Welcome {user?.email} to the Homepage
      </h1>
    </div>
  );
};

export default Home;

import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { BsLinkedin, BsDiscord } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useAuth } from "../context/auth/useAuth";

const Home = () => {
  const { keycloak, initialized } = useKeycloak();
  const { retrieveOrCreate } = useAuth();

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
    <div className="bg-slateDark-50 h-screen w-screen">
      <ToastContainer theme="dark" autoClose={3000} />
      <Nav />

      <div className="flex flex-col items-center justify-center mt-24">
        <div className="bg-slateDark-650 rounded-sm shadow-md w-1/2">
          <div className="flex flex-col justify-center items-center gap-3 w-full mb-3">
            <h1 className="font-semibold text-lg text-white-100 pt-3">
              Monitoring
            </h1>
            <p className="text-sm tracking-wide text-center text-white-100/80">
              Esse projeto foi construído com a finalidade de estudo, juntando
              todo o meu conhecimento em backend e frontend. O objetivo dele é
              verificar uma URL, se ela está retornando um erro ou se está
              funcionando corretamente conforme o esperado. Você pode configurar
              quando vai executar, selecionar o método, se vai repetir, se vai
              ser duas vezes ao mês, se vai repetir todos os dias no mesmo
              horário ou se só vai executar uma vez.
            </p>
          </div>

          <div className="pl-4 mb-3">
            <h3 className="text-white-100 mb-2">Para reportar bugs:</h3>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/kaua-pereira/"
                className="text-white-100/80 cursor-pointer hover:opacity-50"
              >
                <BsLinkedin
                  size={32}
                  className="text-blue-800 hover:opacity-50 cursor-pointer"
                />
              </a>

              <button type="button" className="hover:text-slateDark-1002/75">
                <BsDiscord
                  size={32}
                  className="text-white-100 hover:opacity-50 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText("zKauan#4979");
                    toast.success("Discord copiado com sucesso!");
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer container="mt-44" />
    </div>
  );
};

export default Home;

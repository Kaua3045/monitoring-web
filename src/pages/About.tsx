import Nav from "../components/Nav";

const About = () => {
  return (
    <div className="bg-slateDark-100 h-screen w-screen">
      <Nav />

      <div className="flex flex-col items-center justify-center mt-24">
        <div className="bg-slateDark-300 rounded-sm shadow-md w-1/2">
          <div className="flex flex-col justify-center items-center gap-3 w-full mb-3">
            <h1 className="font-semibold text-lg text-slateDark-1002 pt-3">
              Monitoring
            </h1>
            <p className="text-sm tracking-wide text-center text-slateDark-1002/90">
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
            <h3 className="text-slateDark-1002">Para reportar bugs:</h3>
            <a
              href="https://www.linkedin.com/in/kaua-pereira/"
              className="text-slateDark-1002/90 cursor-pointer hover:text-slateDark-1002/75"
            >
              Linkedin
            </a>
            <p className="text-slateDark-1002/90">
              Discord:{" "}
              <button
                type="button"
                className="hover:text-slateDark-1002/75"
                onClick={(e) =>
                  navigator.clipboard.writeText(
                    e.currentTarget.textContent ?? "zKauan#4979"
                  )
                }
              >
                zKauan#4979
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

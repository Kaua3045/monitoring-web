/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../components/Nav";
import { useAuth } from "../context/auth/useAuth";

const Login = () => {
  const { token, authenticate } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async () => {
    authenticate({
      email,
      password,
    })
      .then((response) => navigate("/"))
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Usuário não encontrado!");
        } else {
          toast.error("Erro interno, contate o suporte!");
        }
      });
  };

  return (
    <div className="bg-slateDark-50 h-screen w-screen">
      <ToastContainer theme="dark" autoClose={3000} />
      <Nav />

      <div className="flex justify-center mt-40">
        <form className="flex flex-col items-center gap-5 h-auto w-80 bg-slateDark-650 text-white-100">
          <h1 className="pt-3 font-semibold text-lg">Login</h1>

          <fieldset className="flex flex-col items-start">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Seu E-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8 focus:border-b-white-100"
            />
          </fieldset>

          <fieldset className="flex flex-col items-start">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8 focus:border-b-white-100"
            />
          </fieldset>

          <button
            type="button"
            onClick={handleSubmit}
            className="mb-3 bg-blue-1003 text-slateDark-650 text-lg h-8 w-20 border rounded-sm border-blue-1003 hover:opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

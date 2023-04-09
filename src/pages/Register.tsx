/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../components/Nav";
import { useAuth } from "../context/auth/useAuth";

const Register = () => {
  const { token, create } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = () => {
    create({
      username,
      email,
      password,
      avatarUrl: null,
    })
      .then((response) => navigate("/"))
      .catch((err) => {
        const usernameEmpty = "'username' should not be null or empty";
        const emailEmpty = "'email' should not be null or empty";
        const passwordEmpty = "'password' should not be null or empty";
        const emailAlreadyExists = "Email already exists";
        const passwordLengthInvalid =
          "'password' must be at least 8 characters";

        if (err.response.status === 400) {
          switch (err.response.data.errors[0].message) {
            case usernameEmpty:
              toast.error("O username não pode ser vazio!");
              break;
            case emailEmpty:
              toast.error("O email não pode ser vazio!");
              break;
            case passwordEmpty:
              toast.error("A senha não pode ser vazia!");
              break;
            case emailAlreadyExists:
              toast.error("O email já existe!");
              break;
            case passwordLengthInvalid:
              toast.error("A senha deve ter no mínimo 8 caracteres");
              break;
            default:
              toast.error("Erro interno, contate o suporte!");
          }
        }
      });
  };

  return (
    <div className="bg-slateDark-50 h-screen w-screen">
      <ToastContainer theme="dark" autoClose={3000} />
      <Nav />

      <div className="flex justify-center mt-32">
        <form className="flex flex-col items-center gap-5 h-auto w-80 bg-slateDark-650 text-white-100">
          <h1 className="pt-3 font-semibold text-lg">Register</h1>

          <fieldset className="flex flex-col items-start">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8 focus:border-b-white-100"
            />
          </fieldset>

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "../components/Nav";
import { useAuth } from "../context/auth/useAuth";
import { ErrorType } from "../utils/CommonTypes";
import { showProfileErrorMessages } from "../utils/Messages";

const queryKeyRegister = "Register";

type RegisterType = {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  avatarUrl: string | null;
};

const Register = () => {
  const { token, create } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (token) {
    return <Navigate to="/" />;
  }

  const { mutate, isError, error } = useMutation<any, ErrorType, RegisterType>({
    mutationKey: [queryKeyRegister],
    mutationFn: async ({
      username,
      email,
      password,
      avatarUrl,
    }: RegisterType) =>
      create({
        username,
        email,
        password,
        avatarUrl,
      }),
  });

  const handleSubmit = () => {
    mutate(
      {
        username,
        email,
        password,
        avatarUrl: null,
      },
      {
        onSuccess() {
          navigate("/");
        },
      }
    );
  };

  const showErrorBordForm = (type: string) => {
    return isError && error.response.data.errors[0].message.includes(type)
      ? "pl-2 border-2 border-tomato-900 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-9"
      : "pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-9 focus:border-white-100";
  };

  return (
    <div className="bg-slateDark-50 h-screen w-screen">
      <ToastContainer theme="dark" autoClose={3000} />
      <Nav />

      <div className="flex justify-center mt-32">
        <form className="flex flex-col items-center gap-5 h-auto w-80 bg-slateDark-650 text-white-100">
          <h1 className="pt-3 font-semibold text-lg">Register</h1>

          {isError ? (
            <p className="text-tomato-900">
              {showProfileErrorMessages(error.response.data.errors[0].message)}
            </p>
          ) : (
            ""
          )}

          <fieldset className="flex flex-col items-start">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={showErrorBordForm("username")}
            />
          </fieldset>

          <fieldset className="flex flex-col items-start">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Seu E-mail"
              onChange={(e) => setEmail(e.target.value)}
              className={showErrorBordForm("email")}
            />
          </fieldset>

          <fieldset className="flex flex-col items-start">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              onChange={(e) => setPassword(e.target.value)}
              className={showErrorBordForm("password")}
            />
          </fieldset>

          <button
            type="button"
            onClick={handleSubmit}
            className="mb-3 bg-blue-1003 text-slateDark-650 text-lg h-8 w-20 border rounded-sm border-blue-1003 hover:opacity-50"
          >
            Register
          </button>

          <p className="text-white-100/75 mb-3">
            Já possui uma conta ?{" "}
            <a href="/login" className="text-blue-1001">
              Clique aqui
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

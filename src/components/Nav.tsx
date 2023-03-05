import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { useAuth } from "../context/auth/useAuth";

const Nav = () => {
  const { keycloak } = useKeycloak();
  const { user } = useAuth();

  return (
    <header aria-label="Site Header" className="bg-skyDark-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-skyDark-50 hover:opacity-80" href="/">
          <span className="sr-only">Home</span>
          <h1 className="text-2xl">Monitoring</h1>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-skyDark-50 transition hover:opacity-80"
                  href="/"
                >
                  Upgrade
                </a>
              </li>

              <li>
                <a
                  className="text-skyDark-50 transition hover:opacity-80"
                  href="/"
                >
                  Serviços
                </a>
              </li>

              <li>
                <a
                  className="text-skyDark-50 transition hover:opacity-80"
                  href="/"
                >
                  Painel
                </a>
              </li>

              <li>
                <a
                  className="text-skyDark-50 transition hover:opacity-80"
                  href="/"
                >
                  Sobre
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {keycloak.authenticated ? (
                <img
                  className="w-10 hover:cursor-pointer"
                  alt="Profile"
                  src={user.avatarUrl ? user.avatarUrl : "./profile.png"}
                />
              ) : (
                <>
                  <a
                    className="block rounded-md bg-slateDark-300 px-5 py-2.5 text-sm font-medium text-skyDark-50 transition hover:bg-skyDark-250/60"
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    className="rounded-md bg-slateDark-300 px-5 py-2.5 text-sm font-medium text-skyDark-50 transition hover:bg-skyDark-250/60"
                    href="/register"
                  >
                    Register
                  </a>
                </>
              )}
            </div>

            <button
              type="button"
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;

import { useKeycloak } from "@react-keycloak/web";
import Profile from "./Avatar";

const Nav = () => {
  const { keycloak } = useKeycloak();

  return (
    <header aria-label="Site Header" className="bg-slateDark-50 shadow-lg">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-white-100 hover:text-blue-1003" href="/">
          <span className="sr-only">Home</span>
          <h1 className="text-2xl">Monitoring</h1>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-base text-white-100 transition hover:text-blue-1003"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-base text-white-100 transition hover:text-blue-1003"
                  href="/dashboard"
                >
                  Painel
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {keycloak.authenticated ? (
                <Profile />
              ) : (
                <>
                  <a
                    className="block rounded-md bg-blue-400 px-5 py-2.5 text-sm font-medium text-blue-1002 transition hover:opacity-50"
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    className="rounded-md bg-blue-400 px-5 py-2.5 text-sm font-medium text-blue-1002 transition hover:opacity-50"
                    href="/register"
                  >
                    Register
                  </a>
                </>
              )}
            </div>

            <button
              type="button"
              className="block rounded bg-blue-300 p-2.5 text-blue-1002 transition hover:bg-blue-200 md:hidden"
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

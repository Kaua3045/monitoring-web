import { useAuth } from "../context/auth/useAuth";
import Profile from "./Avatar";

const Nav = () => {
  const { token } = useAuth();

  return (
    <header aria-label="Site Header" className="bg-slateDark-50 shadow-lg">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-2 lg:px-8">
        <a className="block text-white-100 hover:text-blue-1003" href="/">
          <span className="sr-only">Home</span>
          <h1 className="text-2xl">Monitore</h1>
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
              {token ? (
                <Profile />
              ) : (
                <div className="flex items-center gap-4">
                  <a
                    className="rounded-md bg-blue-400 px-5 py-2.5 text-sm font-medium text-blue-1002 transition hover:opacity-50"
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;

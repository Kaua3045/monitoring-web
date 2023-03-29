/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import CreateUrl from "../components/url/CreateUrl";

const Dashboard = () => {
  return (
    <div className="bg-slateDark-50 h-screen">
      <Nav />

      <div className="flex flex-col items-center mt-10">
        <div className="w-3/5 mt-12">
          <h1 className="text-xl pb-3 text-white-100">Seus links</h1>
          <div>
            <div className="min-w-full flex gap-2">
              <CreateUrl />

              <div className="py-3 text-left uppercase font-bold text-base text-white-100 flex gap-2 justify-center">
                <input
                  type="text"
                  placeholder="Busque o link pelo título"
                  className="bg-slateDark-650 text-white-100 h-10 w-48 pl-1 border rounded-md border-slateDark-650 outline-none font-normal placeholder:font-normal"
                />

                <button
                  type="button"
                  className="bg-blue-1003 text-slateDark-650 font-semibold h-10 w-20 border rounded-md border-blue-1003 hover:opacity-50"
                >
                  Buscar
                </button>
              </div>
            </div>

            <Pagination />
          </div>
        </div>
      </div>

      <Footer container="mt-36" />
    </div>
  );
};

export default Dashboard;

/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import CreateUrl from "../components/url/CreateUrl";

const Dashboard = () => {
  // const { keycloak } = useKeycloak();

  // if (!keycloak.authenticated) {
  // return <Navigate to="/" />;
  // }

  // https://github.com/davidgrzyb/tailwind-admin-template/blob/master/index.html

  return (
    <div className="bg-slateDark-50 h-screen">
      <Nav />

      <div className="flex flex-col items-center mt-10">
        <div className="w-3/5 mt-12">
          <h1 className="text-xl pb-3 text-white-100">Seus links</h1>
          {/* https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.wpfrontendadmin.com%2Fwp-content%2Fuploads%2F2020%2F08%2F20164417%2F1.jpg&tbnid=r4TSr2Iwk9iNwM&vet=12ahUKEwjc4eTU3-r9AhW3OLkGHZIBB_YQMygDegUIARDCAQ..i&imgrefurl=https%3A%2F%2Fwpfrontendadmin.com%2F&docid=h1QA43nzsdtOnM&w=1400&h=788&q=dashboard%20to%20create%20and%20search%20frontend&ved=2ahUKEwjc4eTU3-r9AhW3OLkGHZIBB_YQMygDegUIARDCAQ */}
          <div>
            {/*  bg-slateDark-700 border rounded-sm border-slateDark-600 shadow-sm */}
            <div className="min-w-full flex gap-2">
              <CreateUrl />
              {/* <div className="py-3 text-left uppercase font-bold text-base text-blue-400">
                <button
                  type="button"
                  className="bg-blue-800 text-slateDark-1002 h-10 w-20 border rounded-sm border-blue-800 hover:bg-blue-700 hover:text-slateDark-1001 hover:border-blue-700"
                >
                  Criar Link
                </button>
              </div> */}

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
    </div>
  );
};

export default Dashboard;

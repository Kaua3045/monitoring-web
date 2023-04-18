/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  return (
    <div className="bg-slateDark-50 h-screen">
      <Nav />

      <div className="flex flex-col items-center mt-10">
        <div className="w-3/5 mt-12">
          <h1 className="text-xl pb-3 text-white-100">Seus links</h1>
          <div>
            <Pagination />
          </div>
        </div>
      </div>

      <Footer container="mt-36" />
    </div>
  );
};

export default Dashboard;

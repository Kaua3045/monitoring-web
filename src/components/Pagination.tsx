/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../context/auth/useAuth";
import Api from "../utils/api";
import LoadUserUrls from "./url/LoadUserUrls";
import CreateUrl from "./url/CreateUrl";

type LoadUserUrlsType = {
  currentPage: number;
  perPage: number;
  total: number;
  items: [
    {
      id: number;
      title: string;
      url: string;
      executeDateFormatted: string;
      linkExecution: string;
    }
  ];
};

type PageSelectedType = {
  selected: number;
};

const Pagination = () => {
  const { user, isLoading, token } = useAuth();
  const [urls, setUrls] = useState<LoadUserUrlsType>({} as LoadUserUrlsType);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const allUrls = async (currentPage: number) => {
    if (!isLoading && user.profileId !== undefined) {
      const response = await Api.get(`/links/list/${user.profileId}`, {
        params: {
          page: currentPage,
          perPage: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUrls(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    allUrls(0);
  }, [user, setOpenModal]);

  const numberPage = urls.total >= 1 ? Math.ceil(urls.total / urls.perPage) : 0;

  const handlePageChange = ({ selected }: PageSelectedType) => {
    allUrls(selected);
  };

  return (
    <div>
      <div className="min-w-full flex gap-2">
        <CreateUrl openModal={openModal} setOpenModal={setOpenModal} />

        {/* <div className="py-3 text-left uppercase font-bold text-base text-white-100 flex gap-2 justify-center">
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
        </div> */}
      </div>

      <table className="min-w-full bg-slateDark-1002">
        <thead className="bg-slateDark-650 text-blue-1002">
          <tr>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Título
            </th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Url
            </th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Data de validação
            </th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
              Tipo de validação
            </th>

            <th
              className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
              aria-label="Ações"
            />
          </tr>
        </thead>

        <tbody className="text-slateDark-800">
          {loading === false ? (
            <LoadUserUrls items={urls.items} total={urls.total} />
          ) : (
            <tr />
          )}
        </tbody>
      </table>

      <div>
        <ReactPaginate
          className="flex justify-center gap-1 mt-4"
          nextLabel={<FiChevronRight size={32} />}
          nextClassName="bg-slateDark-650
          w-9 h-9 text-white-100 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-slateDark-650
          hover:opacity-50 cursor-pointer"
          pageLinkClassName="bg-slateDark-650
          w-9 h-9 text-white-100 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-slateDark-650
          hover:opacity-50 cursor-pointer"
          activeClassName="bg-slateDark-650
          w-9 h-9 text-white-100 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-slateDark-650
          hover:opacity-50 cursor-pointer"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={numberPage}
          previousLabel={<FiChevronLeft size={32} />}
          previousClassName="bg-slateDark-650
          w-9 h-9 text-white-100 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-slateDark-650
          hover:opacity-50 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Pagination;

import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/auth/useAuth";
import Api from "../utils/api";
import LoadUserUrls from "./url/LoadUserUrls";
import CreateUrl from "./url/CreateUrl";
import { queryClient } from "../utils/ReactQuery";
import LoadUserUrlsCard from "./url/LoadUserUrlsCard";

const queryKeyName = "list_user_links";

const Pagination = () => {
  const { user, token } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);

  const { data, isFetching } = useQuery({
    queryKey: [queryKeyName, currentPage],
    queryFn: async () => {
      const response = await Api.get(`/links/list/${user.profileId}`, {
        params: {
          page: currentPage,
          perPage: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!user.profileId,
    keepPreviousData: true,
  });

  if (isFetching) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (data !== undefined && data.totalPage > 0 && data.items.length <= 0) {
    setCurrentPage(0);
    queryClient.invalidateQueries([queryKeyName]);
  }

  return (
    <div>
      <ToastContainer theme="dark" autoClose={3000} />

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

      <div className="mb-2">
        <span className="text-white-100/90">
          Para acessar as métricas do seu link, clique no título dele.
        </span>
      </div>

      <table className="min-w-full bg-slateDark-1002 hidden lg:block">
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
          {data !== undefined && data.items.length > 0 ? (
            <LoadUserUrls items={data.items} total={data.total} />
          ) : (
            <tr />
          )}
        </tbody>
      </table>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:hidden">
        {data !== undefined && data.items.length > 0 ? (
          <LoadUserUrlsCard items={data.items} total={data.total} />
        ) : (
          <div />
        )}
      </div>

      <div>
        {data !== undefined && (
          <ReactPaginate
            className="flex justify-center gap-1 mt-4 mb-10"
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
            onClick={(e) => {
              setCurrentPage(e.nextSelectedPage);
            }}
            pageRangeDisplayed={5}
            pageCount={data.totalPage}
            previousLabel={<FiChevronLeft size={32} />}
            previousClassName="bg-slateDark-650
        w-9 h-9 text-white-100 
        font-semibold
        flex items-center justify-center 
        border rounded-sm border-slateDark-650
        hover:opacity-50 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;

/* eslint-disable react-hooks/exhaustive-deps */
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../context/auth/useAuth";
import Api from "../utils/api";
import LoadUserUrls from "./url/LoadUserUrls";

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
  const { keycloak, initialized } = useKeycloak();
  const { user, isLoading } = useAuth();
  const [urls, setUrls] = useState<LoadUserUrlsType>({} as LoadUserUrlsType);
  const [loading, setLoading] = useState(true);

  const allUrls = async (currentPage: number) => {
    if (!isLoading && user.profileId !== undefined) {
      const response = await Api.get(`/links/list/${user.profileId}`, {
        params: {
          page: currentPage,
          perPage: 1,
        },
      });
      setUrls(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    allUrls(0);
  }, [initialized, keycloak, user]);

  const numberPage = urls.total >= 1 ? Math.ceil(urls.total / urls.perPage) : 0;

  const handlePageChange = ({ selected }: PageSelectedType) => {
    allUrls(selected);
  };

  return (
    <div>
      <table className="min-w-full bg-slateDark-1002">
        <thead className="bg-slateDark-600 text-blue-1002">
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
          nextClassName="bg-blue-800
          w-9 h-9 text-blue-1002 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-blue-800
          hover:bg-blue-700 
          hover:border-blue-700 hover:text-blue-1001 cursor-pointer"
          pageLinkClassName="bg-blue-800
          w-9 h-9 text-blue-1002 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-blue-800
          hover:bg-blue-700 
          hover:border-blue-700 hover:text-blue-1001 cursor-pointer"
          activeLinkClassName="bg-blue-800
          w-9 h-9 text-blue-1002 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-blue-800
          hover:bg-blue-700 
          hover:border-blue-700 hover:text-blue-1001 cursor-pointer"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={numberPage}
          previousLabel={<FiChevronLeft size={32} />}
          previousClassName="bg-blue-800
          w-9 h-9 text-blue-1002 
          font-semibold
          flex items-center justify-center 
          border rounded-sm border-blue-800
          hover:bg-blue-700 
          hover:border-blue-700 hover:text-blue-1001 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Pagination;

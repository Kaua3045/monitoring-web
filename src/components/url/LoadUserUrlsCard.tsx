/* eslint-disable react/jsx-no-useless-fragment */
import { Link } from "react-router-dom";
import { MdOpenInNew } from "react-icons/md";
import DeleteUrlDialog from "./DeleteUrl";
import UpdateUrlDialog from "./UpdateUrl";

type LoadUserUrlsType = {
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

const LoadUserUrlsCard = ({ items, total }: LoadUserUrlsType) => {
  return (
    <>
      {total <= 0
        ? ""
        : items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 bg-slateDark-1002 h-full p-4 rounded-md shadow"
            >
              <span className="px-4 flex items-center gap-1 font-semibold text-lg">
                <Link
                  to={`/metrics/${item.id}`}
                  className="text-slateDark-50 hover:opacity-70"
                >
                  {item.title}
                </Link>

                <MdOpenInNew />
              </span>
              <p className="px-4">
                <a
                  href={item.url}
                  className="text-slateDark-50 hover:opacity-70 text-base"
                >
                  {item.url.length > 35 ? item.url.slice(0, 28) : item.url}
                </a>
              </p>
              <p className="px-4 text-slateDark-50 text-sm">
                {item.executeDateFormatted}
              </p>
              <div className="px-4">
                <p className="text-center text-sm">{item.linkExecution}</p>
              </div>

              <div className="flex gap-3">
                <UpdateUrlDialog
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  executeDate={item.executeDateFormatted}
                  linkExecution={item.linkExecution}
                />
                <DeleteUrlDialog id={item.id} />
              </div>
            </div>
          ))}
    </>
  );
};

export default LoadUserUrlsCard;

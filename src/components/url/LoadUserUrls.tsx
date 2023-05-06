/* eslint-disable react/jsx-no-useless-fragment */
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";
import PopoverLinkExecution from "../LinkExecutionType";
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

const LoadUserUrls = ({ items, total }: LoadUserUrlsType) => {
  return (
    <>
      {total <= 0
        ? ""
        : items.map((item) => (
            <tr
              key={item.id}
              className="border-b-[1px] border-slateDark-1001/20 last:border-none"
            >
              <td className="w-1/3 text-left py-2 px-3">
                <Link
                  to={`/metrics/${item.id}`}
                  className="text-slateDark-50 hover:opacity-70 flex items-center gap-1"
                >
                  {item.title}
                  <MdOpenInNew />
                </Link>
              </td>
              <td className="w-1/3 text-left py-2 px-3">
                <a
                  href={item.url}
                  className="text-slateDark-50 hover:opacity-70"
                >
                  {item.url.length > 35 ? item.url.slice(0, 28) : item.url}
                </a>
              </td>
              <td className="w-1/3 text-left py-2 px-3 text-slateDark-50">
                {item.executeDateFormatted}
              </td>
              <td className="w-1/3 text-center py-2 px-3">
                <PopoverLinkExecution linkExecution={item.linkExecution} />
              </td>

              <td className="w-1/3 flex gap-3 py-2 px-3">
                <UpdateUrlDialog
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  executeDate={item.executeDateFormatted}
                  linkExecution={item.linkExecution}
                />
                <DeleteUrlDialog id={item.id} />
              </td>
            </tr>
          ))}
    </>
  );
};

export default LoadUserUrls;

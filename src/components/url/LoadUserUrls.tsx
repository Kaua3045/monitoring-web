/* eslint-disable react/jsx-no-useless-fragment */
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
            <tr key={item.id}>
              <td className="w-1/3 text-left py-3 px-4">
                <Link
                  to={`/metrics/${item.id}`}
                  className="text-slateDark-700 hover:text-slateDark-400"
                >
                  {item.title}
                </Link>
                {/* <a href="/metrics">{item.title}</a> */}
              </td>
              <td className="w-1/3 text-left py-3 px-4">
                <a
                  href={item.url}
                  className="text-slateDark-700 hover:text-slateDark-400"
                >
                  {item.url.length > 35 ? item.url.slice(0, 28) : item.url}
                </a>
              </td>
              <td className="w-1/3 text-left py-3 px-4">
                {item.executeDateFormatted}
              </td>
              <td className="w-1/3 text-center py-3 px-4">
                <PopoverLinkExecution linkExecution={item.linkExecution} />
              </td>

              <td className="w-1/3 flex gap-3 py-3 px-4">
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
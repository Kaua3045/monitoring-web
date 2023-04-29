/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkResponseTooltip from "../components/LinkResponseTooltip";
import Nav from "../components/Nav";
import { useAuth } from "../context/auth/useAuth";
import Api from "../utils/api";

type UrlMetricsType = {
  id: string;
  urlId: string;
  responseMessage: string;
  requestTime: string;
  statusCode: number;
  verifiedDate: string;
};

type UrlType = {
  id: number;
  title: string;
  url: string;
  executeDateFormatted: string;
  linkExecution: string;
};

const Metrics = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [urlMetrics, setUrlMetrics] = useState([]);
  const [url, setUrl] = useState<UrlType>({} as UrlType);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const urlMetricsFind = async () => {
    const response = await Api.get(`/links-responses/${id}`, {
      params: {
        start: startTime,
        end: endTime,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const urlResponse = await Api.get(`/links/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUrlMetrics(response.data);
    setUrl(urlResponse.data);
  };

  const uptimeNumber = (): string => {
    const statusGreen = urlMetrics.filter((url: UrlMetricsType) => {
      if (url.statusCode.toString().startsWith("2")) {
        return url;
      }
    }).length;

    const resultUptime = `${((statusGreen * 100) / urlMetrics.length).toFixed(
      2
    )}%`;

    return urlMetrics.length > 0 ? resultUptime : "0%";
  };

  const formatDate = () => {
    const startTimeFormat = format(new Date(startTime), "dd/MM/yyyy HH:mm", {
      locale: ptBR,
    });

    const endTimeFormat = format(new Date(endTime), "dd/MM/yyyy HH:mm", {
      locale: ptBR,
    });

    return `Período ${startTimeFormat} - ${endTimeFormat}`;
  };

  useEffect(() => {
    urlMetricsFind();
  }, []);

  return (
    <div className="bg-slateDark-50 h-screen w-full">
      <Nav />

      <div className="flex items-center mt-28 flex-col">
        <div className="bg-slateDark-650 w-2/4 max-sm:w-auto h-auto flex flex-col items-start max-sm:items-center max-sm:pr-3 max-sm:pl-3 pl-2 gap-3 rounded-t-[3px] rounded-tr-[3px]">
          <fieldset className="flex max-sm:flex-col items-center max-sm:gap-1 gap-2 mt-2">
            <label htmlFor="start-timestamp" className="text-white-100">
              Inicio
            </label>
            <input
              type="datetime-local"
              aria-label="start-timestamp"
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </fieldset>

          <fieldset className="flex items-center max-sm:flex-col max-sm:gap-1 gap-[21px] mb-2">
            <label htmlFor="fim-timestamp" className="text-white-100">
              Fim
            </label>
            <input
              type="datetime-local"
              aria-label="fim-timestamp"
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </fieldset>

          <div className="flex items-center -mt-2 mb-2">
            <button
              type="button"
              className="bg-blue-1003 text-slateDark-650 h-8 w-20 border rounded-sm border-blue-1003 hover:opacity-50"
              onClick={() => urlMetricsFind()}
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="bg-slateDark-650/90 w-2/4 max-sm:w-[232px] h-auto shadow-md rounded-bl-md rounded-br-md">
          <div className="flex justify-around items-center max-sm:flex-col max-sm:justify-center">
            <h3 className="text-white-100/80">{url.title}</h3>
            {startTime.length <= 0 || endTime.length <= 0 ? (
              <p className="text-white-100/80">Últimos 30 dias</p>
            ) : (
              <p className="text-white-100/80">{formatDate()}</p>
            )}

            <p className="text-white-100/80 ml-2 mt-2 mb-2">
              Uptime: <span className="text-green-1000">{uptimeNumber()}</span>
            </p>
          </div>

          <div className="flex flex-wrap max-w-1xl m-2">
            {urlMetrics.length <= 0 ? (
              <p className="pl-2 text-white-100">
                Sua url não possui métricas ainda
              </p>
            ) : (
              urlMetrics.flatMap((url: UrlMetricsType) => {
                if (url.statusCode.toString().startsWith("2")) {
                  return (
                    <LinkResponseTooltip
                      key={url.id}
                      bgColor="bg-green-1000"
                      statusColor="text-green-1000"
                      message={url.responseMessage}
                      statusCode={url.statusCode}
                      requestTime={url.requestTime}
                      verifiedDate={url.verifiedDate}
                    />
                  );
                }

                if (url.statusCode.toString().startsWith("4")) {
                  return (
                    <LinkResponseTooltip
                      key={url.id}
                      bgColor="bg-orangeDark-1000"
                      statusColor="text-orangeDark-1000"
                      message={url.responseMessage}
                      statusCode={url.statusCode}
                      requestTime={url.requestTime}
                      verifiedDate={url.verifiedDate}
                    />
                  );
                }

                if (url.statusCode.toString().startsWith("5")) {
                  return (
                    <LinkResponseTooltip
                      key={url.id}
                      bgColor="bg-tomato-1000"
                      statusColor="text-tomato-1000"
                      message={url.responseMessage}
                      statusCode={url.statusCode}
                      requestTime={url.requestTime}
                      verifiedDate={url.verifiedDate}
                    />
                  );
                }
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;

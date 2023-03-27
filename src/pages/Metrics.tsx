/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkResponseTooltip from "../components/LinkResponseTooltip";
import Nav from "../components/Nav";
import Api from "../utils/api";

type UrlMetricsType = {
  id: string;
  urlId: string;
  responseMessage: string;
  statusCode: number;
};

const Metrics = () => {
  const { id } = useParams();
  const [urlMetrics, setUrlMetrics] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { keycloak, initialized } = useKeycloak();

  const urlMetricsFind = async () => {
    // if (keycloak.authenticated && initialized) {
    console.log(id);
    const response = await Api.get(`/links-responses/${id}`, {
      params: {
        start: startTime,
        end: endTime,
      },
    });
    console.log(response.data);
    setUrlMetrics(response.data);
    // }
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

  useEffect(() => {
    urlMetricsFind();
  }, [keycloak, initialized]);

  return (
    <div className="bg-slateDark-100 h-screen w-full">
      <Nav />

      <div className="flex items-center mt-28 flex-col">
        <div className="bg-slateDark-1002/95 w-2/4 h-auto flex flex-col items-start pl-2 gap-3 rounded-t-sm rounded-tr-sm">
          <fieldset className="flex items-center gap-2 mt-2">
            <label htmlFor="start-timestamp">Inicio</label>
            <input
              type="datetime-local"
              aria-label="start-timestamp"
              className="border-2 border-slateDark-700 rounded-md w-52 h-7"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </fieldset>

          <fieldset className="flex items-center gap-[21px] mb-2">
            <label htmlFor="fim-timestamp">Fim</label>
            <input
              type="datetime-local"
              aria-label="fim-timestamp"
              className="border-2 border-slateDark-700 rounded-md w-52 h-7"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </fieldset>

          <div className="flex items-center -mt-2 mb-2">
            <button
              type="button"
              className="bg-blue-800 text-slateDark-1002 h-8 w-20 border rounded-sm border-blue-800 hover:bg-blue-700 hover:text-slateDark-1001 hover:border-blue-700"
              onClick={() => urlMetricsFind()}
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="bg-slateDark-1002/95 w-2/4 h-auto shadow-md rounded-bl-sm rounded-br-sm">
          <div>
            <p className="text-slateDark-700 ml-2 mt-2 mb-2">
              Uptime: <span className="text-green-1000">{uptimeNumber()}</span>
            </p>
          </div>

          <div>
            {urlMetrics.length <= 0 ? (
              <p className="pl-2 text-slateDark-100">
                Sua url não possui métricas
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

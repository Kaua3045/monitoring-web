/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import Api from "../../utils/api";
import Modal from "../Modal";

const CreateUrl = () => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [executeDate, setExecuteDate] = useState("");
  const [linkExecution, setLinkExecution] = useState("");
  const { user } = useAuth();

  const createUrlMethod = () => {
    Api.post("/links", {
      title,
      url,
      execute_date: executeDate,
      link_execution: linkExecution,
      profile_id: user.profileId,
    });
    setOpenModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="py-3 text-left uppercase font-bold text-base text-blue-400">
        <button
          type="button"
          className="bg-blue-800 text-slateDark-1002 h-10 w-20 border rounded-sm border-blue-800 hover:bg-blue-700 hover:text-slateDark-1001 hover:border-blue-700"
          onClick={() => setOpenModal(true)}
        >
          Criar Link
        </button>
      </div>

      <Modal
        showModal={openModal}
        setShowModal={setOpenModal}
        title="Criar Link"
      >
        <form className="flex flex-col text-slateDark-300 w-72 gap-3">
          <div className="flex flex-col items-center">
            <label htmlFor="title">Título</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Título da sua URL"
              className="pl-2 border-2 border-slateDark-700 rounded-md w-52 h-7"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="url">URL</label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              id="url"
              type="text"
              placeholder="Sua url"
              className="pl-2 border-2 border-slateDark-700 rounded-md w-52 h-7"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="execute-date">Data da verificação</label>
            <input
              onChange={(e) => setExecuteDate(e.target.value)}
              id="execute-date"
              type="datetime-local"
              className="pl-2 border-2 border-slateDark-700 rounded-md w-52 h-7"
            />
          </div>

          <div className="flex flex-col gap-1 items-center mt-2 mb-2">
            <label htmlFor="repeat">Verificações: </label>
            <select
              name="link-execution"
              onChange={(e) => setLinkExecution(e.target.value)}
              className="border-2 border-slateDark-700 rounded-md w-52 h-7"
            >
              <option value="NO_REPEAT">Não Repetir</option>
              <option value="ON_SPECIFIC_DAY">
                Executar no dia específico e na hora, todo mês
              </option>
              <option value="EVERY_DAYS">Executar todos os dias</option>
              <option value="TWO_TIMES_A_MONTH">
                Executar duas vezes no mês
              </option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => createUrlMethod()}
            className="bg-blue-800 text-slateDark-1002 active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          >
            Criar url
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateUrl;

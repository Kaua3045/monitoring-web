/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";
import Api from "../../utils/api";
import Modal from "../Modal";

const CreateUrl = ({ openModal, setOpenModal }: any) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [executeDate, setExecuteDate] = useState("");
  const [linkExecution, setLinkExecution] = useState("NO_REPEAT");
  const { user, token } = useAuth();

  const createUrlMethod = () => {
    Api.post(
      "/links",
      {
        title,
        url,
        execute_date: executeDate,
        link_execution: linkExecution,
        profile_id: user.profileId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Link criado com sucesso!");
          setOpenModal(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const { message } = err.response.data.errors[0];

          const titleEmpty = "'title' should not be null or empty";
          const urlEmpty = "'url' you must provide a valid url";
          const executeDateEmpty = "'executeDate' should not be empty";
          const executeDatePassed =
            "'executeDate' cannot be a date that has already passed";
          const linkExecutionEmpty = "'linkExecution' should not be null";

          switch (message) {
            case titleEmpty:
              toast.error("O título não pode ser inválido!");
              break;
            case urlEmpty:
              toast.error("A url deve ser válida!");
              break;
            case executeDateEmpty:
              toast.error("A data de verificação não pode ser vazia!");
              break;
            case executeDatePassed:
              toast.error("A data de verificação não pode ser no passado!");
              break;
            case linkExecutionEmpty:
              toast.error("O tipo não pode ser vazio!");
              break;
            default:
              toast.error("Erro interno, contate o suporte!");
          }

          if (err.response.status === 500) {
            toast.error("Erro interno, contate o suporte!");
          }
        }
      });
  };

  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} />
      <div className="py-3 text-left uppercase font-bold text-base">
        <button
          type="button"
          className="bg-blue-1003 text-slateDark-650 font-semibold h-10 w-20 border rounded-md border-blue-1003 hover:opacity-50"
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
        <form className="flex flex-col text-white-100 w-72 gap-3">
          <div className="flex flex-col items-center">
            <label htmlFor="title">Título</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Título da sua URL"
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="url">URL</label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              id="url"
              type="text"
              placeholder="Sua url"
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="execute-date">Data da verificação</label>
            <input
              onChange={(e) => setExecuteDate(e.target.value)}
              id="execute-date"
              type="datetime-local"
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
            />
          </div>

          <div className="flex flex-col gap-1 items-center mt-2 mb-2">
            <label htmlFor="repeat">Verificações: </label>
            <select
              name="link-execution"
              onChange={(e) => setLinkExecution(e.target.value)}
              className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
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
            type="submit"
            onClick={() => createUrlMethod()}
            className="bg-blue-1003 text-slateDark-650 font-bold uppercase text-sm px-6 mt-2 py-3 rounded shadow hover:opacity-50 outline-none focus:outline-none mr-1 mb-1"
          >
            Criar url
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateUrl;

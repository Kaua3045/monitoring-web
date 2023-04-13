/* eslint-disable jsx-a11y/label-has-associated-control */

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";
import Api from "../../utils/api";
import { ErrorType } from "../../utils/CommonTypes";
import { showUrlErrorMessages, urlMessages } from "../../utils/Messages";
import { queryClient } from "../../utils/ReactQuery";
import Modal from "../Modal";

const queryKeyCreateUrl = "link_create";

type UrlCreate = {
  titleToCreate: string | undefined;
  urlToCreate: string | undefined;
  executeDateToCreate: string | undefined;
  linkExecutionToCreate: string | undefined;
  profileId: string | undefined;
};

type ModalStatus = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

type UrlId = {
  id: string;
};

const CreateUrl = ({ openModal, setOpenModal }: ModalStatus) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [executeDate, setExecuteDate] = useState("");
  const [linkExecution, setLinkExecution] = useState("NO_REPEAT");
  const { user, token } = useAuth();

  const { mutate, isError, error } = useMutation<UrlId, ErrorType, UrlCreate>({
    mutationKey: [queryKeyCreateUrl],
    mutationFn: async ({
      titleToCreate,
      urlToCreate,
      executeDateToCreate,
      linkExecutionToCreate,
      profileId,
    }: UrlCreate) => {
      const response = await Api.post(
        `/links`,
        {
          title: titleToCreate,
          url: urlToCreate,
          execute_date: executeDateToCreate,
          link_execution: linkExecutionToCreate,
          profile_id: profileId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  });

  const createUrlMethod = () => {
    mutate(
      {
        titleToCreate: title,
        urlToCreate: url,
        executeDateToCreate: executeDate,
        linkExecutionToCreate: linkExecution,
        profileId: user.profileId,
      },
      {
        onError() {
          setOpenModal(true);
        },
        onSuccess() {
          toast.success(urlMessages.success.created);
          setOpenModal(false);
          queryClient.invalidateQueries(["list_user_links"]);
        },
      }
    );
  };

  const showErrorBordForm = (type: string) => {
    return isError && error.response.data.errors[0].message.includes(type)
      ? "pl-2 border-2 border-tomato-900 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-9"
      : "pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-9";
  };

  return (
    <div>
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
        <form className="flex flex-col items-center text-center text-white-100 w-72 gap-3">
          {isError ? (
            <p className="text-tomato-900">
              {showUrlErrorMessages(error.response.data.errors[0].message)}
            </p>
          ) : (
            ""
          )}
          <div className="flex flex-col items-center">
            <label htmlFor="title">Título</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Título da sua URL"
              className={showErrorBordForm("title")}
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="url">URL</label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              id="url"
              type="text"
              placeholder="Sua url"
              className={showErrorBordForm("url")}
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="execute-date">Data da verificação</label>
            <input
              onChange={(e) => setExecuteDate(e.target.value)}
              id="execute-date"
              type="datetime-local"
              className={showErrorBordForm("executeDate")}
            />
          </div>

          <div className="flex flex-col gap-1 items-center mt-2 mb-2">
            <label htmlFor="repeat">Verificações: </label>
            <select
              name="link-execution"
              onChange={(e) => setLinkExecution(e.target.value)}
              className={showErrorBordForm("linkExecution")}
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
            className="bg-blue-1003 text-slateDark-650 font-bold uppercase text-sm px-6 mt-2 py-3 rounded shadow hover:opacity-50 outline-none focus:outline-none mr-1 mb-1"
          >
            Criar url
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateUrl;

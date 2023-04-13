/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Api from "../../utils/api";
import { useAuth } from "../../context/auth/useAuth";
import { queryClient } from "../../utils/ReactQuery";
import { showUrlErrorMessages, urlMessages } from "../../utils/Messages";
import { ErrorType, UrlType } from "../../utils/CommonTypes";

const queryKeyUpdateUrl = "link_update";

const UpdateUrlDialog = ({
  id,
  title,
  url,
  executeDate,
  linkExecution,
}: UrlType) => {
  const { token } = useAuth();
  const [titleUpdated, setTitleUpdated] = useState<string>();
  const [urlUpdated, setUrlUpdated] = useState<string>();
  const [executeDateUpdated, setExecuteDateUpdated] = useState<string>();
  const [linkExecutionUpdated, setLinkExecutionUpdated] = useState<string>();
  const [open, setOpen] = useState(false);

  const { mutate, isError, error } = useMutation<UrlType, ErrorType, UrlType>({
    mutationKey: [queryKeyUpdateUrl],
    mutationFn: async ({
      id,
      title,
      url,
      executeDate,
      linkExecution,
    }: UrlType) => {
      const response = await Api.put(
        `/links/${id}`,
        {
          title,
          url,
          execute_date: executeDate,
          link_execution: linkExecution,
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

  const handleUpdateUrl = () => {
    mutate(
      {
        id,
        title: titleUpdated,
        url: urlUpdated,
        executeDate: executeDateUpdated,
        linkExecution: linkExecutionUpdated,
      },
      {
        onError() {
          setOpen(true);
        },
        onSuccess() {
          toast.success(urlMessages.success.updated);
          queryClient.invalidateQueries(["list_user_links"]);
          setOpen(false);
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
    <>
      <ToastContainer theme="dark" autoClose={3000} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type="button">
            <FiEdit2 className="h-5 w-5 text-green-1000 hover:text-green-800" />
          </button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
          <DialogContent className="bg-slateDark-650 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <DialogTitle className="flex justify-center text-white-100 m-0 text-[17px] font-medium">
              Atualizar link
            </DialogTitle>

            <DialogDescription className="text-white-100/80 flex justify-center text-center mt-4 mb-5 text-[15px] leading-normal">
              Faça as alterações que você quiser e no fim clique em atualizar
            </DialogDescription>

            <div className="flex flex-col text-center gap-2">
              {isError ? (
                <p className="text-tomato-900">
                  {showUrlErrorMessages(error.response.data.errors[0].message)}
                </p>
              ) : (
                ""
              )}
              <fieldset className="mb-2 flex flex-col items-center">
                <label htmlFor="title" className="text-white-100">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  defaultValue={title}
                  onChange={(e) => setTitleUpdated(e.target.value)}
                  className={showErrorBordForm("title")}
                />
              </fieldset>

              <fieldset className="mb-2 flex flex-col items-center">
                <label htmlFor="url" className="text-white-100">
                  Url
                </label>

                <input
                  type="text"
                  id="url"
                  defaultValue={url}
                  onChange={(e) => setUrlUpdated(e.target.value)}
                  className={showErrorBordForm("url")}
                />
              </fieldset>

              <fieldset className="mb-2 flex flex-col items-center">
                <label htmlFor="executeDate" className="text-white-100">
                  Data de execução:
                </label>

                <input
                  type="datetime-local"
                  id="executeDate"
                  defaultValue={executeDate}
                  onChange={(e) => setExecuteDateUpdated(e.target.value)}
                  className={showErrorBordForm("executeDate")}
                />
              </fieldset>

              <fieldset className="mb-2 flex flex-col items-center">
                <label htmlFor="linkExecution" className="text-white-100">
                  Tipo:
                </label>

                <select
                  name="linkExecution"
                  defaultValue={linkExecution}
                  onChange={(e) => setLinkExecutionUpdated(e.target.value)}
                  className={showErrorBordForm("linkExecution")}
                >
                  <option value="NO_REPEAT">Não Repetir</option>
                  <option value="ON_SPECIFIC_DAY">
                    Executar no dia específico
                  </option>
                  <option value="EVERY_DAYS">Executar todos os dias</option>
                  <option value="TWO_TIMES_A_MONTH">
                    Executar duas vezes no mês
                  </option>
                </select>
              </fieldset>
            </div>

            <div className="flex justify-center pt-4 gap-8">
              <button
                type="button"
                className="bg-blue-1003 border-blue-1003 font-semibold text-slateDark-650 h-8 w-52 rounded-md hover:opacity-50"
                onClick={() => handleUpdateUrl()}
              >
                Atualizar
              </button>
            </div>

            <DialogClose asChild>
              <button type="button" aria-label="Close">
                <AiOutlineClose className="text-white-100 hover:opacity-50 focus:shadow-slateDark-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none" />
              </button>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default UpdateUrlDialog;

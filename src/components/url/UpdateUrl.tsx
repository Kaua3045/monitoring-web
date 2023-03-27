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
import Api from "../../utils/api";

type UrlId = {
  id: number;
  title: string;
  url: string;
  executeDate: string;
  linkExecution: string;
};

const UpdateUrlDialog = ({
  id,
  title,
  url,
  executeDate,
  linkExecution,
}: UrlId) => {
  const [titleUpdated, setTitleUpdated] = useState<string>();
  const [urlUpdated, setUrlUpdated] = useState<string>();
  const [executeDateUpdated, setExecuteDateUpdated] = useState<string>();
  const [linkExecutionUpdated, setLinkExecutionUpdated] = useState<string>();

  const handleUpdateLink = () => {
    Api.put(`/links/${id}`, {
      title: titleUpdated,
      url: urlUpdated,
      execute_date: executeDateUpdated,
      link_execution: linkExecutionUpdated,
    });
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button">
          <FiEdit2 className="h-5 w-5 text-green-1000 hover:text-green-800" />
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
        <DialogContent className="bg-slateDark-1002 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <DialogTitle className="flex justify-center text-slateDark-100 m-0 text-[17px] font-medium">
            Atualizar link
          </DialogTitle>

          <DialogDescription className="text-slateDark-500 flex justify-center text-center mt-4 mb-5 text-[15px] leading-normal">
            Faça as alterações que você quiser e no fim clique em atualizar
          </DialogDescription>

          <div>
            <fieldset className="mb-2 flex flex-col items-center">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                defaultValue={title}
                onChange={(e) => setTitleUpdated(e.target.value)}
                className="pl-2 border-2 border-slateDark-900 rounded-md outline-none"
              />
            </fieldset>

            <fieldset className="mb-2 flex flex-col items-center">
              <label htmlFor="url">Url</label>

              <input
                type="text"
                id="url"
                defaultValue={url}
                onChange={(e) => setUrlUpdated(e.target.value)}
                className="pl-2 border-2 border-slateDark-900 rounded-md outline-none"
              />
            </fieldset>

            <fieldset className="mb-2 flex flex-col items-center">
              <label htmlFor="executeDate">Data de execução:</label>

              <input
                type="datetime-local"
                id="executeDate"
                defaultValue={executeDate}
                onChange={(e) => setExecuteDateUpdated(e.target.value)}
                className="pl-2 border-2 border-slateDark-900 rounded-md outline-none"
              />
            </fieldset>

            <fieldset className="mb-2 flex flex-col items-center">
              <label htmlFor="linkExecution">Tipo: </label>

              <select
                name="linkExecution"
                defaultValue={linkExecution}
                onChange={(e) => setLinkExecutionUpdated(e.target.value)}
                className="pl-2 border-2 border-slateDark-900 rounded-md outline-none"
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
            <DialogClose asChild>
              <button
                type="button"
                className="bg-blue-800 text-blue-1002 h-8 w-24 rounded-md hover:bg-blue-700"
                onClick={() => handleUpdateLink()}
              >
                Atualizar
              </button>
            </DialogClose>
          </div>

          <DialogClose asChild>
            <button
              type="button"
              // className="text-blue-1002 hover:bg-blue-400 focus:shadow-blue-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <AiOutlineClose className="text-slateDark-700 hover:text-slateDark-300 focus:shadow-slateDark-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none" />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UpdateUrlDialog;

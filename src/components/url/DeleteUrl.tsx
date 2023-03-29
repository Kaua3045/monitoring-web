import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { BsFillTrashFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../utils/api";

type UrlId = {
  id: number;
};

const DeleteUrlDialog = ({ id }: UrlId) => {
  const handleDeleteLink = () => {
    Api.delete(`/links/${id}`)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Link deletado com sucesso!");
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error("Erro interno, contate o suporte!");
        }
      });
  };

  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button type="button">
            <BsFillTrashFill className="text-tomato-900 h-5 w-5 hover:text-tomato-800" />
          </button>
        </AlertDialogTrigger>

        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
          <AlertDialogContent className="bg-slateDark-650 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <AlertDialogTitle className="text-white-100 m-0 text-[17px] font-medium">
              Você tem certeza que deseja deletar esse Link ?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-white-100/80 mt-4 mb-5 text-[15px] leading-normal">
              Se você deletar esse link todas as verificações que foram feitas
              seram perdidas.
            </AlertDialogDescription>

            <div className="flex gap-8 justify-end">
              <AlertDialogCancel asChild>
                <button
                  type="button"
                  className="bg-slateDark-50 text-white-100 h-8 w-24 rounded-md hover:opacity-50"
                >
                  Cancelar
                </button>
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <button
                  type="button"
                  className="bg-tomato-500 text-tomato-1001 h-8 w-36 rounded-md hover:bg-tomato-400 hover:text-tomato-1000"
                  onClick={() => handleDeleteLink()}
                >
                  Sim, deletar link
                </button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </>
  );
};

export default DeleteUrlDialog;

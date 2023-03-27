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
import Api from "../../utils/api";

type UrlId = {
  id: number;
};

const DeleteUrlDialog = ({ id }: UrlId) => {
  const handleDeleteLink = () => {
    Api.delete(`/links/${id}`);
    window.location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button">
          <BsFillTrashFill className="text-tomato-900 h-5 w-5 hover:text-tomato-800" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
        <AlertDialogContent className="bg-slateDark-1002 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialogTitle className="text-slateDark-100 m-0 text-[17px] font-medium">
            Você tem certeza que deseja deletar esse Link ?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slateDark-500 mt-4 mb-5 text-[15px] leading-normal">
            Se você deletar esse link todas as verificações que foram feitas
            seram perdidas.
          </AlertDialogDescription>

          <div className="flex gap-8 justify-end">
            <AlertDialogCancel asChild>
              <button
                type="button"
                className="bg-blue-800 text-blue-1002 h-8 w-24 rounded-md hover:bg-blue-700"
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
  );
};

export default DeleteUrlDialog;

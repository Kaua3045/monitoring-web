/* eslint-disable consistent-return */
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
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useAuth } from "../../context/auth/useAuth";
import Api from "../../utils/api";

const UpdateProfileDialog = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleUpdateProfile = async () => {
    const data = new FormData();

    data.append("username", username);

    data.append("avatar_url", avatar!);
    const result = await Api.put(`/profile/${user.profileId}`, data);

    if (result.status === 200) {
      toast.success("Perfil atualizado com sucesso!");
    }

    if (result.status === 500) {
      toast.error("Erro interno, contate o suporte!");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} />
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="bg-slateDark-600 text-slateDark-1002 h-8 w-36 rounded-md hover:bg-slateDark-400 hover:text-slateDark-1000 mt-4"
          >
            Editar Perfil
          </button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
          <DialogContent className="flex flex-col items-center bg-slateDark-1002 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <DialogTitle className="flex justify-center text-slateDark-100 m-0 text-[17px] font-medium">
              Atualizar Perfil
            </DialogTitle>

            <DialogDescription className="text-slateDark-500 flex justify-center text-center mt-4 mb-5 text-[15px] leading-normal">
              Faça as alterações que você quiser e no fim clique em atualizar
            </DialogDescription>

            <div className="flex flex-col gap-8">
              <fieldset className="relative self-center">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Perfil"
                    className="w-40 h-40 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={160} />
                )}

                <label
                  htmlFor="avatar"
                  className="absolute w-12 h-12 bg-slateDark-100 rounded-full transition-all border-none right-0 bottom-0 flex items-center justify-center cursor-pointer"
                >
                  <FiCamera className="w-5 h-5 text-slateDark-1002" />
                  <input
                    type="file"
                    id="avatar"
                    onChange={(e) =>
                      setAvatar(e.target.files ? e.target.files[0] : null)
                    }
                    className="hidden"
                  />
                </label>
              </fieldset>

              <fieldset className="mb-2 flex flex-col items-center">
                <label
                  htmlFor="username"
                  className="text-slateDark-100 text-lg"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="username"
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-2 border-2 border-slateDark-900 rounded-md outline-none"
                />
              </fieldset>
            </div>

            <div className="flex justify-center pt-4 gap-8">
              <DialogClose asChild>
                <button
                  type="button"
                  className="bg-blue-800 text-blue-1002 h-8 w-24 rounded-md hover:bg-blue-700 active:disabled"
                  onClick={() => handleUpdateProfile()}
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
    </>
  );
};

export default UpdateProfileDialog;

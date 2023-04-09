/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unneeded-ternary */
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
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useAuth } from "../../context/auth/useAuth";
import Api from "../../utils/api";

const UpdateProfileDialog = () => {
  const { user, token, loadUser } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateProfile = async () => {
    const data = new FormData();

    data.append("username", username);

    data.append("avatar_url", avatar!);

    await Api.put(`/profile/${user.profileId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Perfil atualizado com sucesso!");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          switch (err.response.data.message) {
            case "Image type is not valid":
              toast.error("Esse tipo de imagem não é aceito!");
              break;
            case "Image size is not valid":
              toast.error("Essa imagem é grande de mais!");
              break;
            default:
              toast.error("Erro interno, contate o suporte!");
          }
        }
      });
  };

  useEffect(() => {
    loadUser();
  }, [isLoading]);

  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} />
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="bg-blue-1003 text-slateDark-650 border-blue-1003 font-semibold outline-none h-8 w-36 rounded-md hover:opacity-50 mt-4"
          >
            Editar Perfil
          </button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay className="fixed inset-0 data-[state=open]:animate-overlayShow" />
          <DialogContent className="flex flex-col items-center bg-slateDark-650 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <DialogTitle className="flex justify-center text-white-100 m-0 text-[17px] font-medium">
              Atualizar Perfil
            </DialogTitle>

            <DialogDescription className="text-white-100/80 flex justify-center text-center mt-4 mb-5 text-[15px] leading-normal">
              Faça as alterações que você quiser e no fim clique em atualizar
            </DialogDescription>

            <div className="flex flex-col gap-8">
              <fieldset className="relative self-center">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Perfil"
                    className="w-32 h-32 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={128} className="text-slateDark-1002" />
                )}

                <label
                  htmlFor="avatar"
                  className="absolute w-12 h-12 bg-slateDark-50 rounded-full transition-all border-none right-0 bottom-0 flex items-center justify-center cursor-pointer"
                >
                  <FiCamera className="w-5 h-5 text-white-100" />
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
                <label htmlFor="username" className="text-white-100 text-lg">
                  Nome
                </label>
                <input
                  type="text"
                  id="username"
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-2 border-2 border-slateDark-50 bg-slateDark-50 text-white-100 outline-none rounded-md w-52 h-8"
                />
              </fieldset>
            </div>

            <div className="flex justify-center pt-4 gap-8">
              <DialogClose asChild>
                <button
                  type="button"
                  className="bg-blue-1003 text-slateDark-650 font-semibold h-8 w-32 rounded-md hover:opacity-50"
                  onClick={() => handleUpdateProfile()}
                >
                  Atualizar
                </button>
              </DialogClose>
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

export default UpdateProfileDialog;

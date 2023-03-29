import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useKeycloak } from "@react-keycloak/web";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/auth/useAuth";

const Avatar = () => {
  const { keycloak } = useKeycloak();
  const { user, isLoading } = useAuth();

  const imageUrl = () => {
    if (!isLoading && user.avatarUrl) {
      return (
        <img
          className="w-12 h-12 object-cover rounded-full hover:cursor-pointer mb-1 mt-1"
          alt="Profile"
          src={user.avatarUrl}
        />
      );
    }

    return <FaUserCircle size={48} />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">{imageUrl()}</button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="min-w-[140px] bg-slateDark-650 rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
          <DropdownMenuItem className="group text-base leading-none text-white-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-slateDark-1001 data-[disabled]:pointer-events-none data-[highlighted]:text-blue-1003">
            <a href="/profile">Meu perfil</a>
          </DropdownMenuItem>

          <DropdownMenuItem className="group text-base leading-none text-white-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-slateDark-1001 data-[disabled]:pointer-events-none data-[highlighted]:text-blue-1003">
            <a href="/dashboard">Painel</a>
          </DropdownMenuItem>

          <DropdownMenuItem className="group text-base leading-none text-white-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-slateDark-1001 data-[disabled]:pointer-events-none data-[highlighted]:text-blue-1003">
            <a href="/">Home</a>
          </DropdownMenuItem>

          <DropdownMenuItem className="group text-base leading-none text-white-100 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-slateDark-1001 data-[disabled]:pointer-events-none data-[highlighted]:text-blue-1003">
            <a
              href="/"
              onClick={() => {
                keycloak.logout();
                keycloak.clearToken();
              }}
            >
              Sair
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default Avatar;

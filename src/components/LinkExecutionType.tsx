import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { FiEye } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

type LinkExecutionType = {
  linkExecution: string;
};

const PopoverLinkExecution = ({ linkExecution }: LinkExecutionType) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <FiEye className="h-5 w-5 text-slateDark-500 hover:text-slateDark-200" />
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          sideOffset={5}
          className="flex flex-col-reverse gap-2 rounded p-5 w-[260px] bg-slateDark-1002 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        >
          <h1 className="text-slateDark-100">{linkExecution}</h1>

          <PopoverClose className="flex justify-end">
            <AiOutlineClose className="h-5 w-5 hover:text-slateDark-700" />
          </PopoverClose>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};

export default PopoverLinkExecution;

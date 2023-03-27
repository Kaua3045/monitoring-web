import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

type LinkResponseTooltipType = {
  bgColor: string;
  statusColor: string;
  message: string;
  statusCode: number;
};

const LinkResponseTooltip = ({
  bgColor,
  statusColor,
  message,
  statusCode,
}: LinkResponseTooltipType) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button">
            <div className={`ml-[3px] mr-[2px] mt-2 h-10 w-1 ${bgColor}`} />
          </button>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent
            sideOffset={5}
            className="flex flex-col-reverse gap-2 rounded p-5 w-[150px] bg-slateDark-1002 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          >
            <div>
              <p className="text-slateDark-700">
                Mensagem: <span className={statusColor}>{message}</span>
              </p>
              <p className="text-slateDark-700">
                Status: <span className={statusColor}>{statusCode}</span>
              </p>
            </div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinkResponseTooltip;

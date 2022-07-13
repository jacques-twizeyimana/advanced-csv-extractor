import { ReactNode } from "react";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import { ClickOutSide } from "./ClickOutSide";

type PropType = {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  onClose?: () => void;
  hasIcon?: boolean;
  hasBorder?: boolean;
  useDefaultTitleStyle?: boolean;
};

export default function Popup({
  open,
  onClose,
  children,
  title,
  hasIcon = true,
  hasBorder = true,
  useDefaultTitleStyle = false,
}: PropType) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return open ? (
    <div className="relative">
      <div className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-40 z-50  flex flex-col items-center justify-center">
        <ClickOutSide handleClickOutside={handleClose}>
          <div
            className={`bg-neutral-400 shadow-md rounded-lg px-6 py-4 relative`}
          >
            <div
              className={`flex justify-between ${
                hasBorder && " border-b border-neutral-350  pb-1"
              }`}
            >
              {useDefaultTitleStyle ? (
                <h2 className="text-lg font-semibold text-neutral-200">
                  {title}
                </h2>
              ) : (
                <div className="w-full">{title}</div>
              )}
              {hasIcon && (
                <Button isIcon onClick={handleClose} styleType="text">
                  <Icon name="close" size={14} />
                </Button>
              )}
            </div>
            <div className="py-6">{children}</div>
          </div>
        </ClickOutSide>
      </div>
    </div>
  ) : null;
}

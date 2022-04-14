import React, { FC } from "react";
import { ButtonSize } from "assets/constants";

type ButtonProps = {
  children: string;
  size: keyof typeof ButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button: FC<ButtonProps> = ({
  children,
  size = ButtonSize.medium,
  onClick,
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center outline-0 border-0 rounded-[16px] font-bold p-4 bg-[#f0f1ff] hover:bg-[antiquewhite] cursor-pointer ${
        size === ButtonSize.large
          ? "h-[3rem] text-xl"
          : size === ButtonSize.medium
          ? "h-[2.25rem] text-base"
          : "h-[1.75rem] text-sm"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

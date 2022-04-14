import { FC } from "react";
import Logo from "components/common/Logo";

const Header: FC = () => {
  return (
    <header className="flex items-center px-12  h-[10%]">
      <Logo />
    </header>
  );
};

export default Header;

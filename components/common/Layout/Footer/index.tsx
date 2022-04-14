import { FC } from "react";

import { FOOTER_MESSAGE } from "assets/string";

const Footer: FC = () => {
  return (
    <footer className="flex justify-center items-center h-[10%] text-gray-300 shadow-footer">
      {FOOTER_MESSAGE}
    </footer>
  );
};

export default Footer;

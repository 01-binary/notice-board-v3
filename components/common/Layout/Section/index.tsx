import { FC } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Section: FC<Props> = ({ children }) => {
  return (
    <section className="overflow-y-auto px-[30px] h-4/5">{children}</section>
  );
};

export default Section;

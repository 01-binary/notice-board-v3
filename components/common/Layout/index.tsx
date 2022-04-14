import { FC } from "react";

import type { ReactNode } from "react";
import Header from "components/common/Layout/Header";
import Section from "components/common/Layout/Section";
import Footer from "components/common/Layout/Footer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative mx-auto max-w-7xl h-full !bg-white">
      <Header />
      <Section>{children}</Section>
      <Footer />
    </div>
  );
};

export default Layout;

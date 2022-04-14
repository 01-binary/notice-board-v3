import { FC } from "react";

import Logo from "components/common/Logo";

interface Props {
  height?: string;
}

const Loading: FC<Props> = ({ height = "150px" }) => {
  return (
    <div className={`flex items-center justify-center`} style={{ height }}>
      <Logo className="animate-spinner origin-[50%_50%]" />
    </div>
  );
};

export default Loading;

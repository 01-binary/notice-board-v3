import React, { FC, useMemo } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  elementId: string;
  isMounted: boolean;
}

const Portal: FC<Props> = ({
  children,
  elementId = "root",
  isMounted = false,
}) => {
  const rootElement = useMemo(() => {
    if (!isMounted) return;
    return document.getElementById(elementId);
  }, [elementId, isMounted]);
  return rootElement ? createPortal(children, rootElement) : null;
};

export default Portal;

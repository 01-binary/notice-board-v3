import { FC, ReactNode, useEffect, useState } from "react";
import Portal from "components/common/Portal";

type Props = {
  children: ReactNode;
  visible: boolean;
  closeModal: () => void;
};

const Modal: FC<Props> = ({ visible, children, closeModal }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <Portal elementId="modal" isMounted={isMounted}>
      <div
        className={`fixed inset-0 z-[999] bg-[#00000099] ${
          visible ? `block` : `hidden`
        }`}
      />
      <div
        tabIndex={-1}
        className={`fixed inset-0 z-[1000] outline-0 overflow-auto ${
          visible ? `block` : `hidden`
        }`}
      >
        <div
          tabIndex={0}
          className={`flex relative p-4 mx-auto overflow-y-auto bg-white rounded-[10px] flex-col w-[550px] max-h-[500px] top-[20%]`}
        >
          <div className="flex justify-end">
            <div
              className="text-3xl font-bold text-black cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;

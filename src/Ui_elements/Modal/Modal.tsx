import React from "react";
import { Modal } from "antd";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/Contexts";

interface ModalProps {
  children: any;
  cancel:()=>void
}

export const CenteredDialog = ({ children, cancel }: ModalProps) => {
  const { openModal } = useContext(ModalContext);
  return (
    <Modal
      centered
      open={openModal}
      width={"80%"}
      onCancel={cancel}
    >
      {children}
    </Modal>
  );
};

import React from "react";
import { Modal } from "antd";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/Contexts";
import styled from "styled-components";

interface ModalProps {
  children: any;
  width?: string | number
  cancel:()=>void
}

export const CenteredDialog = ({ children,width, cancel }: ModalProps) => {
  const { openModal } = useContext(ModalContext);
  return (
    <StyledModal
      centered
      open={openModal}
      width={width}
      onCancel={cancel}
    >
      {children}
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-footer{
    display: none !important;
  }
`
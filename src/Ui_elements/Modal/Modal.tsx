import React from "react";
import { Modal } from "antd";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/Contexts";
import styled from "styled-components";

interface ModalProps {
  children: any;
  width?: string | number;
  cancel: () => void;
  okay?: () => void;
  cancelText?: string;
  okText?: string
  title?: string
  openState?: boolean
}

export const CenteredDialog = ({
  children,
  width,
  cancel,
  okay,
  cancelText,
  okText,
  title,
  openState
}: ModalProps) => {
  const { openModal } = useContext(ModalContext);
  return (
    <StyledModal
      centered
      open={openModal || openState}
      width={width}
      onCancel={cancel}
      onOk={okay}
      cancelText={cancelText}
      okText={okText}
      title={title}
    >
      {children}
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none !important;
  }
`;

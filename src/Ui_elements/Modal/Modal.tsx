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
}

export const CenteredDialog = ({
  children,
  width,
  cancel,
  okay,
}: ModalProps) => {
  const { openModal } = useContext(ModalContext);
  return (
    <StyledModal
      centered
      open={openModal}
      width={width}
      onCancel={cancel}
      onOk={okay}
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

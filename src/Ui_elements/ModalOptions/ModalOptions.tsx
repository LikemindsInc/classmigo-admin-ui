import { useContext } from "react";
import styled from "styled-components";
import { MoreIcon } from "../../Assets/Svgs";
import { ModalContext } from "../../Contexts/Contexts";

export const ModalOptions = () => {
  const { setOpenModal } = useContext(ModalContext);
  return <MoreHover onClick={() => setOpenModal(true)} />;
};

const MoreHover = styled(MoreIcon)`
  cursor: pointer;
`;

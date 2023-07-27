import { useContext } from "react";
import styled from "styled-components";
import { MoreIcon } from "../../Assets/Svgs";
import { DrawerContext } from "../../Contexts/Contexts";

export const Options = () => {
  const { setOpenDrawer } = useContext(DrawerContext);
  return <MoreHover onClick={() => setOpenDrawer(true)} />;
};

const MoreHover = styled(MoreIcon)`
  cursor: pointer;
`;

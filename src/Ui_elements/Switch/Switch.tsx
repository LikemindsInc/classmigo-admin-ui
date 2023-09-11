import { Switch, SwitchProps } from "@mui/material";
import React, { FC, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Contexts/Contexts";

interface Props {
  activeState?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const SwitchElement = ({ activeState, handleChange }: Props) => {
  const { user } = useContext(UserContext);
  return user?.role === "TEACHER" ? (
    <CustomSwitch checked={activeState} onChange={handleChange} />
  ) : null;
};

const CustomSwitch = styled(Switch)`
  .MuiSwitch-switchBase.Mui-checked {
    background: none;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(123, 49, 178, 0.2);
    }
  }
  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: var(--primary-color);
  }
  .MuiSwitch-thumb {
    background-color: var(--primary-color);
  }
`;

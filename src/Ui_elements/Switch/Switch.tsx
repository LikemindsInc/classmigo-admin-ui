import { Switch, SwitchProps } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";

interface IProps extends SwitchProps {}

export const SwitchElement: FC<IProps> = ({ ...props }) => {
  return <CustomSwitch {...props} />;
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

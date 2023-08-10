import { Switch } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const SwitchElement = () => {
  return <CustomSwitch />;
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

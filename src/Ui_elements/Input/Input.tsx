import React from "react";
import { styled } from "styled-components";
import { Input } from "antd";

interface InputProps {
  placeholder?: string;
  type?: string;
  label?: string;
}

export const InputElement = ({ placeholder, type, label }: InputProps) => {
  return (
    <>
      {type === "password" && (
        <InputHolder>
          <label>{label}</label>
          <PasswordInput placeholder={placeholder} />
        </InputHolder>
      )}
      {!type && (
        <InputHolder>
          <label>{label}</label>
          <TextInput placeholder={placeholder} />
        </InputHolder>
      )}
    </>
  );
};

// Styles
const TextInput = styled(Input)`
  width: fill;
  border-color: var(--primary-color);
  border-width: 1px;
  padding: clamp(0.8rem, 1rem, 1rem);
  :hover {
    border-width: 2px;
    border-color: var(--primary-color);
  }
  :focus {
    border-color: var(--primary-color);
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;
const PasswordInput = styled(Input.Password)`
  width: fill;
  border-color: var(--primary-color);
  border-width: 1px;
  padding: clamp(0.8rem, 1rem, 1rem);
  :hover {
    border-width: 2px;
    border-color: var(--primary-color);
  }
  :focus {
    border-color: var(--primary-color);
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;
const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
  }
`;

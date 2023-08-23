import { useState } from "react";
import styled from "styled-components";
import { ErrorIcon } from "../../Assets/Svgs";

interface TextAreaProps {
  width?: number;
  placeholder?: string;
  label?: string;
  register?: any;
  id?: string;
  disabled?: boolean;
  error?: any;
  value?: string | number;
}
export const TextAreaInput = ({
  width,
  placeholder,
  label,
  register,
  id,
  disabled,
  error,
  value,
}: TextAreaProps) => {
  return (
    <>
      <Label>{label}</Label>
      <TextAreWrapper width={width}>
        <StyledTextArea
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          {...(register && { ...register(id) })}
        />
      </TextAreWrapper>
      {error && id ? (
        <ErrorContainer>
          {error[id]?.message && <Error />}
          <p>{error[id]?.message}</p>
        </ErrorContainer>
      ) : null}
    </>
  );
};

const TextAreWrapper = styled.div<{ width?: number }>`
  height: 10rem;
  outline: none;
  border-radius: 5px;
  border: 1px solid #eed7ff;
  position: relative;
  width: ${({ width }) => (width ? width + "px" : "100%")};

  &:focus-within {
    border: 1px solid var(--primary-color);
  }
`;
const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  resize: none;
  overflow: hidden;
  height: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 14px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 1rem !important;
`;

const ErrorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    font-size: 0.7rem !important;
    color: red;
  }
`;

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;

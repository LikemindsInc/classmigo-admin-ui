import React from "react";
import styled from "styled-components";
import { Spinner } from "../Spinner/Spinner";
interface ButtonProp {
  label: React.ReactNode;
  width?: number;
  outline?: boolean;
  icon?: any;
  type?: "submit" | "button" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
}

interface StyledButtonProps {
  width?: number;
  outline?: boolean;
}

export const ButtonElement: React.FC<ButtonProp> = ({
  label,
  width,
  outline,
  icon,
  type,
  isLoading,
  ...otherProps
}) => {
  return (
    <Button width={width} outline={outline} {...otherProps} type={type}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {label}
          {icon && <div>{icon}</div>}
        </>
      )}
    </Button>
  );
};

const Button = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center !important;
  gap: 1rem;
  background-color: ${({ outline }) =>
    outline ? "transparent" : "var(--primary-color)"};
  color: ${({ outline }) => (outline ? "var(--primary-color)" : "white")};
  font-weight: 700;
  padding: ${({ outline }) => (outline ? "0.6rem 0.8rem" : "1.1rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:1vw;
  width: ${({ width }) => (width ? width + "px" : "100%")};
  border-radius: 6px;
  outline: none;
  border: ${({ outline }) =>
    outline ? "1px solid var(--primary-color)" : "none"};
  cursor: pointer;
`;

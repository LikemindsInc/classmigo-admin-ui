import React from 'react';
import styled from 'styled-components';

interface ButtonProp {
  label: React.ReactNode; // Use React.ReactNode for better type safety
  width?: number;
  outline?: boolean;
  onClick?: () => void;
}

interface StyledButtonProps {
  width?: number;
  outline?: boolean;
}

export const ButtonElement: React.FC<ButtonProp> = ({ label, width, outline, ...otherProps }) => {
  return (
    <Button width={width} outline={outline} {...otherProps}>
      {label}
    </Button>
  );
};

const Button = styled.button<StyledButtonProps>`
  background-color: ${({ outline }) => (outline ? "transparent" : "var(--primary-color)")};
  color: ${({ outline }) => (outline ? "var(--primary-color)" : "white")};
  font-weight: 700;
  padding: ${({ outline }) => (outline ? "0.6rem 0.8rem" : "0.8rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width ? width + "px" : "100%")};
  border-radius: 6px;
  outline: none;
  border: ${({ outline }) => (outline ? "1px solid var(--primary-color)" : "none")};
  cursor: pointer;
`;

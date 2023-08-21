import React from "react";
import Select, { StylesConfig } from "react-select";
import styled from "styled-components";
import { ErrorIcon } from "../../Assets/Svgs";
import { Spinner } from "../Spinner/Spinner";

interface SelectProps {
  options: any;
  onChange?: (value: any) => void;
  value?: any;
  defaultValue?: string;
  width?: number | string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: any;
  id?: string;
}

export const SelectInput = ({
  options,
  onChange,
  defaultValue,
  width,
  value,
  error,
  disabled,
  isLoading,
  id,
}: SelectProps) => {
  return (
    <>
      <SelectContainer width={width}>
        <SelectElement
          placeholder={defaultValue}
          isDisabled={disabled}
          styles={customStyles(disabled)}
          options={options}
          onChange={onChange}
          value={value}
        />
        {isLoading && <Spinner color="var(--primary-color)" />}
      </SelectContainer>
      {error ? (
        <ErrorContainer>
          {error?.message && <Error />}
          <p>{error?.message}</p>
        </ErrorContainer>
      ) : null}
    </>
  );
};

const SelectElement = styled(Select)`
  width: 100%;
`;
const ErrorContainer = styled.div`
  display: flex;
  gap:5px;
  align-items: center;
  justify-content: flex-start;
  width:100%;
  margin-top: 0px;
  p {
    color:red;
    font-size: 0.7rem !important;
  }
`;

const SelectContainer = styled.div<{ width: any }>`
  width: ${({ width }) => (width ? width + "px" : "100%")};
  display: flex;
  gap: 5px;
  align-items: center;
  height: fit-content;
`;
const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;

const customStyles = (disabled?: boolean): StylesConfig => ({
  control: (baseStyles, state) => ({
    ...baseStyles,
    width: "100%",
    border:
      state.isFocused && !disabled
        ? "2px solid var(--primary-color)"
        : !state.isFocused && disabled
        ? "none"
        : "1px solid var(--primary-color)",
    "&:hover": {
      border:
        state.isFocused && !disabled
          ? "2px solid var(--primary-color)"
          : "1px solid var(--primary-color)",
    },
    fontSize: "15px",
    color: disabled ? "#a5adba" : "black",
    backgroundColor: disabled ? "var(--dashboardBackground)" : "white",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "white",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "var(--primary-color)" : "white",
    color: state.isFocused ? "white" : "black",
    "&:hover": {
      backgroundColor: state.isFocused
        ? "var(--primary-color)"
        : "var(--primary-color)",
      color: "white",
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
    fontSize: "14px",
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: "var(--primary-color)",
  }),
});

import Select from "react-select";
import styled from "styled-components";
import { devices } from "../../utils/mediaQueryBreakPoints";

interface SelectProps {
  options: any;
  onChange?: (value: any) => void;
  defaultValue?: string;
  width?: number | string;
}

export const SelectInput = ({
  options,
  onChange,
  defaultValue,
  width,
}: SelectProps) => {
  return (
    <SelectElement
      placeholder={defaultValue}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: width,
          border: state.isFocused
            ? "2px solid var(--primary-color)"
            : "1px solid var(--primary-color)",
          "&:hover": {
            border: state.isFocused
              ? "2px solid var(--primary-color)"
              : "1px solid var(--primary-color)",
          },
          fontSize: "15px",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "white",
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "var(--primary-color)",
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
      }}
      options={options}
      onChange={onChange}
    />
  );
};
const SelectElement = styled(Select)`
  height: fit-content;
`;

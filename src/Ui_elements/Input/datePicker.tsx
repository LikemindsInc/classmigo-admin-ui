import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import React from "react";
import styled from "styled-components";
import { devices } from "../../utils/mediaQueryBreakPoints";

export const DatePickerInput = ({
  defaultDate,
  label,
  iconHidden,
  width,
}: any) => {
  return (
    <Container width={width}>
      <label>{label}</label>
      <StyledDatePickerWrapper iconHidden={iconHidden}>
        <StyledDatePicker defaultValue={defaultDate} />
      </StyledDatePickerWrapper>
    </Container>
  );
};

const Container = styled.div<{ width?: any }>`
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  width: ${({ width }) => (width ? width + "px" : "100%")};
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1px 4px;

  @media ${devices.tabletL} {
    width: 100%;
  }

  label {
    font-size: 0.6rem;
    color: var(--primary-color);
    align-self: flex-start;
    margin-bottom: 2px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  input {
    font-family: inherit;
    width: 100%;
    height: 100%;
    padding: 0;
    color: var(--text-color);
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiInputAdornment-root button {
    width: 1px;
    color: var(--primary-color);
  }
  .MuiInputBase-input,
  .MuiOutlinedInput-input {
    border-color: red;
  }
`;

const StyledDatePickerWrapper = styled.div<{ iconHidden?: any }>`
  .MuiInputAdornment-root button {
    width: 1px;
    color: var(--primary-color);
    visibility: ${({ iconHidden }) => (iconHidden ? "hidden" : "visible")};
  }
`;

export default DatePickerInput;

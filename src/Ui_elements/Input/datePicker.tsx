import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import React from "react";
import styled from "styled-components";
import { devices } from "../../utils/mediaQueryBreakPoints";

export const DatePickerInput = ({
  label,
  iconHidden,
  onChange,
  width,
  hint
}: any) => {
  return (
    <Container width={width}>
      {label && <label>{label}</label>}
      {/* <StyledDatePickerWrapper iconHidden={iconHidden}> */}
        <StyledDatePicker
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              border: "1px solid var(--primary-color)",
              borderRadius: "4px",
              height: "40px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.8rem",
              marginTop:"-5px"
            },
          }}
          onChange={onChange}
          label={hint}
        />
      {/* </StyledDatePickerWrapper> */}
    </Container>
  );
};

const Container = styled.div<{ width?: any }>`
  border-radius: 5px;
  /* width: ${({ width }) => (width ? width + "px" : "100%")}; */
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  width:100%;
  /* padding: 1px 4px; */

  @media ${devices.tabletL} {
    width: fill;
  }

  label {
    font-size: 0.6rem;
    color: var(--primary-color);
    align-self: flex-start;
    margin-bottom: 2px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  /* width: 100% !important; */
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  /* height: 40px;
  display: flex;
  align-items: center; */

  /* input {
    font-family: inherit;
    width: 100%;
    height: 100%;
    padding: 0;
    color: var(--text-color);
  } */
  /* 
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiInputAdornment-root button {
    width: 1px;
    height: fit-content;
    color: var(--primary-color);
  }
  .MuiInputBase-input,
  .MuiOutlinedInput-input {
    border-color: red;
  } */
`;

// const StyledDatePickerWrapper = styled.div<{ iconHidden?: any }>`
//   /* .MuiInputAdornment-root button {
//     width: 1px;
//     color: var(--primary-color);
//     visibility: ${({ iconHidden }) => (iconHidden ? "hidden" : "visible")};
//   } */
// `;

export default DatePickerInput;

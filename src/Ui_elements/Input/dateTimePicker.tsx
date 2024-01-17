import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorIcon } from "../../Assets/Svgs";
import dayjs from "dayjs";
import { formatIncomingDate } from "../../utils/utilFns";
import moment from "moment";
import useFormattedDate from "../../custom-hooks/UtilHooks/IncomingFormatDate";
import { SxProps } from "@mui/material";

interface Props {
  id: string;
  setValue: any;
  error?: any;
  defaultValue?: any;
  onChange?: any;
}
export const DateTimePickerElement = ({
  id,
  setValue,
  onChange,
  error,
  defaultValue,
}: Props) => {
  const currentDay = dayjs(new Date());
  const currentTime = dayjs(new Date().getTime());

  return (
    <Container>
      <Picker
        label="Enter time and date-"
        onChange={onChange}
        // onChange={(newValue) => {
        //   setValue(id, newValue);
        // }}
        sx={{
          width: "100%",
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }, //styles the label
          "& .MuiOutlinedInput-root": {
            "&:hover > fieldset": { borderColor: "var(--primaryColor)" },
            height: "48px",
            borderRadius: "6px",
            borderColor: "var(--primary-color)",
          },
          "& .MuiButtonBase-root": {
            color: "var(--primary-color)",
          },
          "& .MuiPickersDay-daySelected": {
            backgroundColor: "var(--primary-color)",
            color: "white",
          },
          "& .css-qdugyv-MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item":
            {
              backgroundColor: "var(--primary-color) !important",
            },
          "& .MuiPickersClockPin-pin": {
            backgroundColor: "var(--primary-color)",
          },
        }}
        minDate={currentDay}
        minTime={currentDay ? currentTime : undefined}
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
      />
      {error ? (
        <ErrorContainer>
          {error?.message && <Error />}
          <p>{error?.message}</p>
        </ErrorContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div``;

const Picker = styled(DateTimePicker)``;

const ErrorContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 6px;
  p {
    color: red;
    font-size: 0.7rem !important;
  }
`;

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;

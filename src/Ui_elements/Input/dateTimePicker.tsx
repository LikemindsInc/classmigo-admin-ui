import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorIcon } from "../../Assets/Svgs";
import dayjs from "dayjs";
import { formatIncomingDate } from "../../utils/utilFns";
import moment from "moment";
import useFormattedDate from "../../custom-hooks/UtilHooks/IncomingFormatDate";

interface Props {
  id: string;
  setValue: any;
  error?: any;
  defaultValue?: any;
}
export const DateTimePickerElement = ({
  id,
  setValue,
  error,
  defaultValue,
}: Props) => {
  const [incomingDateFormat, setIncomingDateFormat] = useState<any>(dayjs(defaultValue));
  const usefulDate = useFormattedDate(defaultValue);
  // console.log(incomingDateFormat, "Incoming")


  return (
    <Container>
      <Picker
        label="Enter time and date"
        onChange={(newValue) => {
          setValue(id, newValue);
        }}
        minDate={dayjs(new Date())}
        defaultValue={dayjs(defaultValue)}
        
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

const Picker = styled(DateTimePicker)`
  &:focus {
    label {
      color: var(--primary-color);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 0px;
  p {
    color: red;
    font-size: 0.7rem !important;
  }

`;

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;

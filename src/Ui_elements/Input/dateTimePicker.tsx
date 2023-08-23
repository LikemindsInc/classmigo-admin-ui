import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React from "react";
import styled from "styled-components";
import { ErrorIcon } from "../../Assets/Svgs";

interface Props {
  id: string;
  setValue: any;
  error?: any;
}
export const DateTimePickerElement = ({ id, setValue, error }: Props) => {
  console.log(id);
  return (
    <Container>
      <Input
        label="Enter time and date"
        // {...(register && { ...register("date") })}
        // value={value}
        onChange={(newValue) => {
          console.log(newValue, "Lalalkalk");
          setValue(id, newValue);
        }}
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

const Input = styled(DateTimePicker)`
  &:focus {
    label {
      color: var(--primary-color);
    }
  }
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

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;

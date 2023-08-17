import React from "react";
import styled from "styled-components";
import {
  ButtonElement,
  DatePickerInput,
  ImageInput,
  InputElement,
  SelectInput,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";

const LiveSessionsForm = () => {
  const currentDate = new Date();
  const date = currentDate.toDateString();
  return (
    <Container>
      <Header>
        <SelectInput
          options={[]}
          onChange={() => {}}
          defaultValue="Select Class"
          width={200}
        />
        <SelectInput
          options={[]}
          onChange={() => {}}
          defaultValue="Select Subject"
          width={200}
        />
      </Header>

      <InputHolder>
        <InputElement label="Live Lesson Title" />
      </InputHolder>
      <InputHolder>
        <TextAreaInput label="Description" />
      </InputHolder>
      <TimeSelect>
        <DatePickerInput
          label="Date"
          defaultValue={date}
          iconHidden={false}
          width={150}
        />
        <TimeContainer>
          <InputElement label="Hour" />
          <p>:</p>
          <InputElement label="Minute" />
          <ButtonsContainer>
            <ButtonElement label="AM" />
            <ButtonElement label="PM" />
          </ButtonsContainer>
        </TimeContainer>
      </TimeSelect>

      <ThumbnailSection>
        <h6>Thumbnail</h6>
        <p>Choose or upload an image to show what the video is about</p>
        <ThumbnailList>
          <ImageInput title="Upload Thumbnail" />
        </ThumbnailList>
      </ThumbnailSection>
      <InputHolder>
        <InputElement
          label="Live Lesson URL"
          placeholder="Enter the URL to the live lesson here"
        />
      </InputHolder>
      <InputHolder>
        <ButtonElement label="Schedule" width={150} />
      </InputHolder>
    </Container>
  );
};

export default LiveSessionsForm;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 5%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2%;
  > div {
    display: flex;
    gap: 1%;
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
  @media ${devices.tabletL} {
    gap: 4%;
  }
`;

const TimeSelect = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3rem;
`;
const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    margin-top: 10%;
    font-size: 2rem;
    font-weight: 500;
  }
  input {
    width: 50px;
    padding: 10px;
    text-align: center;
  }
`;

const InputHolder = styled.div`
  width: 50%;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 5px;
`;

const ThumbnailSection = styled.section`
  margin-top: 2rem;
  h6,
  p {
    font-size: 0.8rem;
  }
  h6 {
    font-weight: 600;
  }
`;

const ThumbnailList = styled.div`
  margin-top: 2rem;
`;

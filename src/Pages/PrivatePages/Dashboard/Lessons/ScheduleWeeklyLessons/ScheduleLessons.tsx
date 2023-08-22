import React from "react";
import styled from "styled-components";
import {
  ButtonElement,
  InputElement,
  SelectInput,
} from "../../../../../Ui_elements";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { ScheduleCard } from "./Components/ScheduleCard";

const ScheduleLessons = () => {
  return (
    <Container>
      <Header>
        <div>
          <SelectInput
            options={[]}
            onChange={() => {}}
            defaultValue="Subject Class"
            width={200}
          />
          <SelectInput
            options={[]}
            onChange={() => {}}
            defaultValue="Select Subject"
            width={200}
          />
          <ButtonElement label="View Video Lessons" />
        </div>
        {/* <WeekContainer>
          <p>Set Week No</p>
          <InputElement />
        </WeekContainer> */}
      </Header>
      <Body>
        <SelectInput
          options={[]}
          onChange={() => {}}
          defaultValue="Assign Week"
          width={150}
        />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
      </Body>
    </Container>
  );
};

export default ScheduleLessons;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 12%;
  justify-content: space-between;
  gap: 1%;
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
  > div {
    gap: 10px;
    display: flex;
    align-items: center;
  }
  @media ${devices.tabletL} {
    gap: 4%;
  }
`;

const WeekContainer = styled.div`
  align-items: center;
  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-top: 5px;
  }
  input {
    width: 40px;
    padding: 5px;
    text-align: center;
  }
`;

const Body = styled.section`
  width: 100%;
  padding: 0 12%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

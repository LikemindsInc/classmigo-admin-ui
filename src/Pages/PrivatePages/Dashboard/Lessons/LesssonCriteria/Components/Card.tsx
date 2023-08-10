import React from "react";
import styled from "styled-components";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import { MoveIcon } from "../../../../../../Assets/Svgs";

interface CardProps {
  subjects?: string[];
  topics?: string[];
  classname: string;
}

export const Card = ({ classname, subjects, topics }: CardProps) => {
  return (
    <OuterContainer>
      <Container>
        <DetailsContainer>
          <h6>{classname}</h6>
          <ToolsContainer>
            <Tools>0 Subjects</Tools>
            <Tools>0 Topics</Tools>
          </ToolsContainer>
        </DetailsContainer>
        <SwitchContainer>
          <SwitchElement />
        </SwitchContainer>
      </Container>
      <MoveIcon style={{cursor:"pointer"}} />
    </OuterContainer>
  );
};

const Container = styled.div`
  background-color: var(--dashboardBackground);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 14px;
  width: 100%;
`;

const Tools = styled.p`
  padding: 0.5rem 0.7rem;
  font-size: 0.7rem;
  width: 114px;
  border-radius: 25px;
  background-color: white;
  border: 1px solid gray;
  text-align: center;
`;

const ToolsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const DetailsContainer = styled.div`
  margin-bottom: 1rem;
  h6 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;
const SwitchContainer = styled.div``;

const OuterContainer = styled.div`
  width: 100% !important;
  display: flex;
  align-items: center;
  gap:5%;
  margin-bottom: 1.5rem;
`;

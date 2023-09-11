import React from "react";
import { QuestionCard } from "./Components/QuestionCard";
import styled from "styled-components";
import {
  ButtonElement,
  SearchInput,
} from "../../../../../../../Ui_elements";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { AddIcon } from "../../../../../../../Assets/Svgs";
import { useNavigate } from "react-router-dom";

export const ViewQuestions = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <h6>SSS 3</h6>
      <h3>October 7, 2023</h3>
      <UtilsHolder>
        <SearchContainer>
          <SearchInput />
        </SearchContainer>
        <ButtonElement
          icon={<AddIcon />}
          label="Add New Question"
          onClick={()=>navigate("#quiz/add_quiz")}
          width={200}
        />
      </UtilsHolder>
      <QuestionContainer>
        <QuestionCard />
        <QuestionCard />
      </QuestionContainer>
    </Container>
  );
};

const Container = styled.section`
  h6 {
    font-size: 1rem;
  }
  h3 {
    font-size: 1.2rem;
  }
`;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    button {
      font-size: 0.8rem;
      width: 300px;
      @media ${devices.tablet} {
        width: 100%;
      }
    }

    h6 {
      font-size: 1rem;
      font-weight: 700;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 30%;
  p {
    font-weight: 600;
  }
`;

const QuestionContainer = styled.section`
  padding: 0 20%;
`;

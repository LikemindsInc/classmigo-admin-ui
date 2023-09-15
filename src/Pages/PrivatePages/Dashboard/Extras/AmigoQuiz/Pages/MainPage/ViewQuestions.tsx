import React from "react";
import { QuestionCard } from "./Components/QuestionCard";
import styled from "styled-components";
import { ButtonElement, SearchInput } from "../../../../../../../Ui_elements";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { AddIcon } from "../../../../../../../Assets/Svgs";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useApiGet } from "../../../../../../../custom-hooks";
import { getPracticeQuestionUrl } from "../../../../../../../Urls";

export const ViewQuestions = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;

  // const { data } = useApiGet(
  //   ["amigoQuestion"],
  //   () => getPracticeQuestionUrl(),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: true,
  //   }
  // );

  return (
    <Container>
      <h6>{item?.className}</h6>
      <h3>{dayjs(item?.startDateTime).format("MMMM D, YYYY")}</h3>
      <UtilsHolder>
        <SearchContainer>
          <SearchInput />
        </SearchContainer>
        <ButtonElement
          icon={<AddIcon />}
          label="Add New Question"
          onClick={() =>
            navigate("#quiz/schedule_quiz/add_quiz_question", { state: item })
          }
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

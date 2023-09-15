import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddIcon, CsvIcon } from "../../../../../../Assets/Svgs";
import { useApiGet } from "../../../../../../custom-hooks";
import {
  ButtonElement,
  SearchInput,
  SelectInput,
} from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { QuestionCard } from "../Components/QuestionCard";
import { getQuizQuestions } from "../../../../../../Urls";
import { Skeleton } from "@mui/material";
import noData from "../../../../../../Assets/noData.png";

const QuizDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data: quizQuestions, isLoading: isLoadingQuizQuestions } = useApiGet(
    [`quiz${state}`],
    () => getQuizQuestions(state),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  // quizQuestions && console.log(quizQuestions?.data?.questions);

  return (
    <Container>
      <Header>
        <div>
          <ButtonElement label="Upload CSV" icon={<CsvIcon />} />
          <ButtonElement
            label="Add New Question"
            icon={<AddIcon />}
            onClick={() =>
              navigate("/quiz_library/add_question", { state: state })
            }
          />
        </div>
        <ButtonElement outline={true} label="Download CSV Format" />
      </Header>
      <Body>
        {/* <SearchContainer>
          <SearchInput width={300} />
          <p>250 Results</p>
        </SearchContainer> */}

        <QuestionsContainer>
          {isLoadingQuizQuestions ? (
            <div>
              {[...Array(4)].map((_, index) => (
                <SkeletonContainer key={index}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={118}
                  />
                </SkeletonContainer>
              ))}
            </div>
          ) : quizQuestions?.data?.questions &&
            quizQuestions.data.questions.length > 0 ? (
            <div>
              {quizQuestions.data.questions.map((item: any, index: number) => (
                <QuestionCard
                  key={index}
                  id={index+1}
                  question={item?.question}
                  options={item?.options}
                  imageUrl={item?.imageUrl}
                  answer={item?.correctOption}
                  detailId={item?._id}
                  item={item}
                  queryId={state}
                />
              ))}
            </div>
          ) : (
            <NoData>
              <img src={noData} alt="No data" />
              <p>You haven’t added any question yet.</p>
              <p>Use the add question above to add a question.</p>
            </NoData>
          )}
        </QuestionsContainer>
      </Body>
    </Container>
  );
};

export default QuizDetails;

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
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    gap: 1%;
    @media ${devices.tabletL} {
      flex-direction: column;
      gap: 5%;
      width: 100%;
    }

  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 18vw;
  }
  @media ${devices.tabletL} {
    gap: 4%;
    flex-direction: column;
    button{
      width:100%;
      margin-bottom: 20px;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  p {
    font-weight: 600;
  }
`;

const Body = styled.section`
  width: 100%;
  padding: 0 20%;
  @media ${devices.tabletL} {
    padding: 0;
  }
`;

const QuestionsContainer = styled.section``;
export const SkeletonContainer = styled.div`
  margin-bottom: 10px;
`;

const NoData = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
`;

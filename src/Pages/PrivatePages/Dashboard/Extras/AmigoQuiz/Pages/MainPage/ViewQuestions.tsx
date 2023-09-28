import React from "react";
import { QuestionCard } from "./Components/QuestionCard";
import styled from "styled-components";
import { ButtonElement, SearchInput } from "../../../../../../../Ui_elements";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { AddIcon } from "../../../../../../../Assets/Svgs";
import { useLocation, useNavigate } from "react-router-dom";
import noData from "../../../../../../../Assets/noData.png";
import dayjs from "dayjs";
import { useApiGet } from "../../../../../../../custom-hooks";
import { getAmigoQuizSingleQuestionsUrl } from "../../../../../../../Urls";
import { Skeleton } from "@mui/material";

export const ViewQuestions = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;

  const { data, isLoading } = useApiGet(
    ["amigoQuestion"],
    () => getAmigoQuizSingleQuestionsUrl(item._id),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

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
          width={200}
          onClick={() =>
            navigate("#quiz/schedule_quiz/add_quiz_question", { state: item })
          }
        />
      </UtilsHolder>
      <QuestionContainer>
        {data?.data?.questions.length > 0 ? (
          data?.data?.questions.map((item: any, index: number) => (
            <QuestionCard
              key={index}
              id={index + 1}
              question={item?.question}
              options={item?.options}
              imageUrl={item?.imageUrl}
              answer={item?.correctOption}
              detailId={item?._id}
              item={item}
              queryId={state}
            />
          ))
        ) : isLoading ? (
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
        ) : (
          <NoData>
            <img src={noData} alt="No data" />
            <p>You do not have any questions yet.</p>
          </NoData>
        )}
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
  margin: 3rem 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media ${devices.tablet} {
    flex-direction: column;
  }
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

export const SkeletonContainer = styled.div`
  margin-bottom: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 30%;
  p {
    font-weight: 600;
  }
  @media ${devices.tablet} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const QuestionContainer = styled.section`
  padding: 0 20%;
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

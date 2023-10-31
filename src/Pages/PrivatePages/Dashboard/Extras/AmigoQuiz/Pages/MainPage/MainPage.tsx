import React, { useEffect, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../../../Assets/noData.png";
import {
  ButtonElement,
  DatePickerInput,
  Loader,
  SelectInput,
} from "../../../../../../../Ui_elements";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { QuizCard } from "./Components/QuizCard";
import { getAmigoQuizUrl } from "../../../../../../../Urls";
import { useApiGet } from "../../../../../../../custom-hooks";
import { Skeleton } from "@mui/material";

interface MainProp {
  classOptions: { value: any; label: any }[];
  isLoadingClassOptions: boolean;
}

export const MainPage = ({ classOptions, isLoadingClassOptions }: MainProp) => {
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState([]);
  const [filter, setFilter] = useState({
    className: "",
    page: null,
  });

  const {
    data: amigoQuiz,
    isFetching: isLoadingAmigoQuiz,
    refetch,
  } = useApiGet(["amigoQuiz"], () => getAmigoQuizUrl(filter), {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  useEffect(() => {
    if (amigoQuiz?.data?.content) {
      setQuizes(amigoQuiz?.data?.content);
    }
  }, [amigoQuiz?.data?.content]);

  // if (isLoadingAmigoQuiz) {
  //   return <Loader />;
  // }

  return (
    <Container>
      <FilterContainer>
        <SelectContainer>
          <SelectInput
            options={classOptions}
            defaultValue={"Select a class"}
            onChange={(value) => {
              setFilter({ ...filter, className: value?.value });
            }}
            isLoading={isLoadingClassOptions}
          />
        </SelectContainer>

        {/* <SelectContainer>
          <DatePickerInput />
        </SelectContainer> */}
        <SelectContainer>
          <ButtonElement
            label="Schedule Amigo Quiz"
            onClick={() => navigate("#quiz/schedule_quiz")}
          />
        </SelectContainer>
      </FilterContainer>

      <DetailsContainer>
        <UpcomingSection>
          <h4>Upcoming Amigo Quiz</h4>
          <h6>Upcoming Scheduled Amigo Quiz Dates</h6>

          {isLoadingAmigoQuiz ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={118}
            />
          ) : quizes.some((item: any) => !item?.isPast) ? (
            <CardContainer>
              {quizes.map((el: any) => {
                if (!el?.isPast) {
                  return (
                    <QuizCard
                      item={el}
                      isActive={el.isActive}
                      dateTime={el.startDateTime}
                    />
                  );
                }
                return null;
              })}
            </CardContainer>
          ) : (
            <Error>
              <img src={noData} alt="No data" />
              <p>You don't have any past quizes.</p>
            </Error>
          )}
        </UpcomingSection>
        <UpcomingSection>
          <h4>Past Amigo Quiz</h4>
          <h6>Past Scheduled Amigo Quiz Dates</h6>

          {isLoadingAmigoQuiz ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={118}
            />
          ) : quizes.some((item: any) => item?.isPast) ? (
            <CardContainer>
              {quizes.map((item: any) => {
                if (item?.isPast) {
                  return (
                    <QuizCard
                      item={item}
                      isActive={item.isActive}
                      dateTime={item.startDateTime}
                    />
                  );
                }
                return null;
              })}
            </CardContainer>
          ) : (
            <Error>
              <img src={noData} alt="No data" />
              <p>You don't have any past quizes.</p>
            </Error>
          )}
        </UpcomingSection>
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;
  > button {
    font-size: 0.8rem;
    width: 10vw;
    @media ${devices.tabletL} {
      width: 100% !important;
    }
  }
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
  @media ${devices.tabletL} {
    overflow-y: scroll;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  gap: 2%;
  display: flex;
  align-items: center;
  @media ${devices.tabletL} {
    width: 100%;
    flex-direction: column;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 10vw;
  @media ${devices.tabletL} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const DetailsContainer = styled.section``;

const UpcomingSection = styled.section`
  margin-top: 48px;
  > h4 {
    font-size: 22px;
  }
  > h6 {
    font-size: 0.8rem;
  }
`;

const CardContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2%;
  width: 100%;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

const Error = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5% auto;
  p {
    font-size: 0.8rem;
    text-align: center;
  }
`;

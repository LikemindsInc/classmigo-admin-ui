import React, { useEffect, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../../../Assets/noData.png";
import {
  ButtonElement,
  DatePickerInput,
  Loader,
  SelectInput,
} from "../../../../../../../Ui_elements";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ScheduleQuiz } from "./ScheduleQuiz";
import { Controller, useForm } from "react-hook-form";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { QuizCard } from "./Components/QuizCard";
import { getAmigoQuizUrl } from "../../../../../../../Urls";
import { useApiGet } from "../../../../../../../custom-hooks";

interface MainProp {
  classOptions: { value: any; label: any }[];
  isLoadingClassOptions: boolean;
}

export const MainPage = ({ classOptions, isLoadingClassOptions }: MainProp) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [quizes, setQuizes] = useState([]);

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const { data: amigoQuiz, isFetching: isLoadingAmigoQuiz } = useApiGet(
    ["amigoQuiz"],
    () => getAmigoQuizUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  useEffect(() => {
    if (amigoQuiz?.data?.content) {
      setQuizes(amigoQuiz?.data?.content);
    }
  }, [amigoQuiz?.data?.content]);

  if (isLoadingAmigoQuiz) {
    return <Loader />;
  }

  return (
    <Container>
      {/* <NoData>
        <img src={noData} alt="No data" />
        <p>You don’t have any scheduled or previous amigo quiz.</p>
        <p>Use the schedule amigo quiz below to schedule a quiz.</p>
        <ButtonElement
          label="Schedule Amigo Quiz"
          onClick={() => navigate(`#quiz/schedule_quiz`)}
        />
      </NoData> */}

      <FilterContainer>
        <SelectContainer>
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={classOptions}
                defaultValue={"Select a class"}
                width={200}
                error={errors?.class}
                isLoading={isLoadingClassOptions}
              />
            )}
          />
        </SelectContainer>

        <SelectContainer>
          {/* <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={[]}
                defaultValue={"Select a class"}
                width={200}
                error={errors?.class}
                isLoading={false}
              />
            )}
          /> */}
          <DatePickerInput />
        </SelectContainer>
        <ButtonElement
          label="Schedule Amigo Quiz"
          width={300}
          onClick={() => navigate("#quiz/schedule_quiz")}
        />
      </FilterContainer>

      <DetailsContainer>
        <UpcomingSection>
          <h4>Upcoming Amigo Quiz</h4>
          <h6>Upcoming Scheduled Amigo Quiz Dates</h6>
          <CardContainer>
            {quizes.some((item: any) => item?.isActive) ? (
              <CardContainer>
                {quizes.map((el: any) => {
                  if (el?.isActive) {
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
          </CardContainer>
        </UpcomingSection>
        <UpcomingSection>
          <h4>Past Amigo Quiz</h4>
          <h6>Past Scheduled Amigo Quiz Dates</h6>

          {quizes.some((item: any) => !item?.isActive) ? (
            <CardContainer>
              {quizes.map((item: any) => {
                if (!item?.isActive) {
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

const Container = styled.section``;

const FilterContainer = styled.div`
  width: fit-content;
  gap: 2%;
  display: flex;
  align-items: center;
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
  button {
    margin-top: 1rem;
    width: fit-content;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
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

import React from "react";
import styled from "styled-components";
import noData from "../../../../../../../Assets/noData.png";
import { ButtonElement, DatePickerInput, SelectInput } from "../../../../../../../Ui_elements";
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

export const MainPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

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
                options={[]}
                defaultValue={"Select a class"}
                width={200}
                error={errors?.class}
                isLoading={false}
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
          <DatePickerInput/>
        </SelectContainer>
        <ButtonElement label="Schedule Amigo Quiz" width={300} />
      </FilterContainer>

      <DetailsContainer>
        <UpcomingSection>
          <h4>Upcoming Amigo Quiz</h4>
          <h6>Upcoming Scheduled Amigo Quiz Dates</h6>
          <CardContainer>
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
          </CardContainer>
        </UpcomingSection>
        <UpcomingSection>
          <h4>Past Amigo Quiz</h4>
          <h6>Past Scheduled Amigo Quiz Dates</h6>
          <CardContainer>
            <QuizCard isActive={false} />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
          </CardContainer>
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

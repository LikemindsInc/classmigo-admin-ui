import React from "react";
import styled from "styled-components";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { ButtonElement, SelectInput } from "../../../../../../../Ui_elements";
import { AddIcon, CsvIcon } from "../../../../../../../Assets/Svgs";
import noData from "../../../../../../../Assets/noData.png";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "./Components/QuestionCard";
export const PracticeQuiz = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <UtilHolder>
        <div>
          <SelectContainer>
            <SelectInput
              // value={value}
              options={[]}
              defaultValue={"Select Class"}
              // onChange={(value: any) => {
              //   setClassValue(value?.value);
              // }}
              // error={errors?.class}
              // isLoading={isLoadingClasses}
            />
          </SelectContainer>
          <ButtonElement label="Upload CSV" icon={<CsvIcon />} width={200} />
          <ButtonElement
            label="Add Question"
            icon={<AddIcon />}
            width={200}
            onClick={() => navigate("#practice/add_question")}
          />
        </div>
        <ButtonElement label="Download CSV Format" outline width={300} />
      </UtilHolder>

      <Content>
        {/* <NoData>
          <img src={noData} alt="No data" />
          <p>Select your preferred class and use the upload csv or </p>
          <p>add new question to add questions to practice quiz</p>
        </NoData> */}

        <QuestionContainer>
          <QuestionCard />
          <QuestionCard />
        </QuestionContainer>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const UtilHolder = styled.div`
  width: 100%;
  gap: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100%;
    gap: 2%;
    display: flex;
    align-items: center;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const Content = styled.section``;

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

const QuestionContainer = styled.section`
  padding: 0 20%;
`;

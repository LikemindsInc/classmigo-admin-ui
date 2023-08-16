import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddIcon, CsvIcon } from "../../../../../Assets/Svgs";
import {
  ButtonElement,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { QuestionCard } from "./Components/QuestionCard";

const QuizLibrary = () => {
  const navigate = useNavigate();
  const classOptions = [
    {
      value: 0,
      label: "SSS 1",
    },
    {
      value: 1,
      label: "SSS 2",
    },
    {
      value: 2,
      label: "SSS 3",
    },
  ];

  const [questions, setQuestions] = useState<any>([
    {
      question:
        "Two immiscible liquids with different boiling points can be separated by",
      options: [
        {
          id: "A",
          label: "The use of Separation Funnel",
        },
        {
          id: "B",
          label: "Evaporation",
        },
        {
          id: "C",
          label: "Distillation",
        },
        {
          id: "D",
          label: "Decantation",
        },
      ],
      answer: {
        id: "A",
        label: "The use of Separation Funnel",
      },
      imageUrl: null,
    },

    {
      question:
        "Two immiscible liquids with different boiling points can be separated by",
      options: [
        {
          id: "A",
          label: "The use of Separation Funnel",
        },
        {
          id: "B",
          label: "Evaporation",
        },
        {
          id: "C",
          label: "Distillation",
        },
        {
          id: "D",
          label: "Decantation",
        },
      ],
      answer: {
        id: "A",
        label: "The use of Separation Funnel",
      },
      imageUrl: null,
    },

    {
      question:
        "Two immiscible liquids with different boiling points can be separated by",
      options: [
        {
          id: "A",
          label: "The use of Separation Funnel",
        },
        {
          id: "B",
          label: "Evaporation",
        },
        {
          id: "C",
          label: "Distillation",
        },
        {
          id: "D",
          label: "Decantation",
        },
      ],
      answer: {
        id: "A",
        label: "The use of Separation Funnel",
      },
      imageUrl: null,
    },
  ]);

  const handleSearchFilter = (value: string) => {};

  return (
    <Container>
      <Header>
        <div>
          <SelectInput
            options={classOptions}
            onChange={handleSearchFilter}
            defaultValue="Subject Class"
            width={180}
          />
          <SelectInput
            options={classOptions}
            onChange={handleSearchFilter}
            defaultValue="Select Subject"
            width={180}
          />
          <SelectInput
            options={classOptions}
            onChange={handleSearchFilter}
            defaultValue="Select Topic"
            width={180}
          />
          <ButtonElement label="Upload CSV" icon={<CsvIcon />} />
          <ButtonElement
            label="Add New Question"
            icon={<AddIcon />}
            onClick={() => navigate("/quiz_library/add_question")}
          />
        </div>
        <ButtonElement outline={true} label="Download CSV Format" />
      </Header>
      <Body>
        <SearchContainer>
          <SearchInput width={300} />
          <p>250 Results</p>
        </SearchContainer>

        {questions.map((item: any, index: number) => (
          <QuestionCard
            id={index + 1}
            imageUrl={item?.imageUrl}
            key={index}
            question={item?.question}
            options={item?.options}
            answer={item?.answer}
          />
        ))}
      </Body>
    </Container>
  );
};

export default QuizLibrary;

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
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
  @media ${devices.tabletL} {
    gap: 4%;
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
  padding: 0 15%;
`;

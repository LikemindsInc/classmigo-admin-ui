import React from "react";
import styled from "styled-components";
import { DeleteIcon, EditIcon } from "../../../../../../Assets/Svgs";

import Placeholder from "../../../../../../Assets/placeholder.png";
import { ButtonElement } from "../../../../../../Ui_elements";

interface QuestionCardProp {
  imageUrl?: string | null;
  id?: number;
  question?: string;
  options?: any;
  answer?: any;
  detailId?: any;
  item?: any;
  queryId?:string
}

export const QuestionCard = ({
  imageUrl,
  id,
  question,
  options,
  answer,
  detailId,
  item,
  queryId
}: QuestionCardProp) => {

  return (
    <Container>
      <QuestionHolder>
        {/* <Number>
          <p>{id}</p>
        </Number> */}
        <QuestionContainer>
          <h5>{question}</h5>
          <OptionsContainer>
            {options.map((option: any, index: number) => (
              <div key={index}>
                <h6>{option.label}</h6>
                <p>{option.value}</p>{" "}
              </div>
            ))}
          </OptionsContainer>
          <Correct>Correct Answer: {answer}</Correct>
        </QuestionContainer>
      </QuestionHolder>

      <ImageContainer>
        <img src={imageUrl || Placeholder} alt="" />
        {/* <div>
          <ButtonElement
            outline
            icon={<EditIcon />}
            label="Edit"
            onClick={() =>
              navigate(`/quiz_library/edit_question/${id}`, {
                state: { id: detailId, item: item },
              })
            }
          />
          <Delete onClick={() => setOpen(!open)} />
        </div> */}
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 12px;
  gap: 1.5rem;
  width: 100%;
  background-color: var(--dashboardBackground);
  margin-bottom: 2rem;
  justify-content: space-between;
  
`;
const Number = styled.div`
  background-color: var(--primary-color);
  height: 0.3rem;
  width: 0.3rem;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
  }
`;
const QuestionContainer = styled.div`
  h5 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;
const QuestionHolder = styled.div`
  display: flex;
  gap: 20px;
`

const Correct = styled.h6`
  color: var(--primary-color);
  font-size: 1rem;
`;


const OptionsContainer = styled.div`
  margin-top: 1rem;
  cursor: pointer;
  div {
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;
    width: fit-content;
    &:hover {
      h6 {
        padding: 0.3rem;
        background-color: var(--primary-color);
        color: white;
      }
    }
    h6 {
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 1rem;
      margin-right: 0.1rem;
      height: 2rem;
      width: 2rem;
      padding: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const ImageContainer = styled.div`
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  > div {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    button {
      font-size: 0.7rem;
      width: fit-content !important;
      height: 30px;
    }
  }
`;

const Delete = styled(DeleteIcon)`
  cursor: pointer;
`;

import { values } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorIcon } from "../../../../../../Assets/Svgs";
import { InputElement } from "../../../../../../Ui_elements";

interface Props {
  register: any;
  value: string;
  id: string;
  error?: any;
  setSelected: any;
  getValue: any;
  selectionId: any;
  setSelectionId: any;
  indexId: number;
  option:string
}
export const OptionsCard = ({
  value,
  register,
  id,
  setSelected,
  getValue,
  selectionId,
  setSelectionId,
  indexId,
  option,
  error,
}: Props) => {
  const handleSelection = () => {
    setSelectionId(indexId);

  };

  useEffect(() => {
    if (selectionId === indexId) {
      setSelected(option);
    }
  }, [ id, indexId, option, selectionId, setSelected]);

  return (
    <Wrapper>
      <Container onClick={handleSelection} isSelected={selectionId === indexId}>
        <InputElement placeholder={value} register={register} id={id} />
        {selectionId === indexId && (
          <OptionHolder>
            <IconContainer>&#10003;</IconContainer>
            <p>Correct Answer</p>
          </OptionHolder>
        )}
      </Container>
      {error && id ? (
        <ErrorContainer>
          {error[id]?.message && <Error />}
          <p>{error[id]?.message}</p>
        </ErrorContainer>
      ) : null}
    </Wrapper>
  );
};

const Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--hover-color)" : "transparent"};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  cursor: pointer;
  input {
    border: none;
    cursor: pointer;
    &:focus {
      border: none;
      box-shadow: none;
    }
  }
  p {
    font-size: 0.8rem;
  }
  aside {
    background-color: ${({ isSelected }) =>
      isSelected ? "#4ecb71" : "rgba(0, 0, 0, 0.1)"};
  }
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--hover-color);
    aside {
      background-color: #4ecb71;
      color: white;
    }
  }
`;

const OptionHolder = styled.div`
  display: flex;
  width:200px;
  gap: 20px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
`;

const IconContainer = styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  height: 20px;
  width: 20px;
  font-size: 0.7rem;
`;

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;
const ErrorContainer = styled.div`
  margin-top:10px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    color:red;
    font-size: 0.7rem !important;
  }
`;

const Wrapper = styled.div`
`;

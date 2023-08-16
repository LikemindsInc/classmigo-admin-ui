import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ButtonElement, ImageInput, TextAreaInput } from "../../../../../../../Ui_elements";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { ModalContext } from "../../../../../../../Contexts/Contexts";
import { UploadTick } from "../../../../../../../Assets/Svgs";
import { CenteredDialog } from "../../../../../../../Ui_elements/Modal/Modal";

const AddQuestion = () => {
  const options = [
    { text: "Option 1" },
    { text: "Option 2" },
    { text: "Option 3" },
    { text: "Option 4" },
  ];
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const { setOpenModal } = useContext(ModalContext);

  const handleOptionSelect = (index: number, text: string) => {
    setSelectedOption({ index, text });
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <InputHolder>
        <TextAreaInput label="Question" width={300} />
      </InputHolder>
      <InputHolder>
        <ImageInput />
      </InputHolder>
      <OptionsContainer>
        <h3>Select an Option:</h3>
        {options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => handleOptionSelect(index, option.text)}
            isSelected={selectedOption?.index === index}
          >
            <p>{option.text}</p>
            <OptionHolder>
              <IconContainer>&#10003;</IconContainer>
              <p>Correct Answer</p>
            </OptionHolder>
          </OptionButton>
        ))}
      </OptionsContainer>
      <ButtonHolder>
        <ButtonElement
          label="Add Question"
          width={140}
          onClick={() => setOpenModal(true)}
        />
      </ButtonHolder>
      <Modal cancel={handleCancel} width={"40%"}>
        <ModalContent>
          <UploadTick />
          <p>Question Uploaded Successfully</p>
          <ButtonElement
            label="Done"
            width={100}
            onClick={() => setOpenModal(false)}
          />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AddQuestion;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 20%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const OptionsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const OptionButton = styled.div<{ isSelected: boolean }>`
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

const InputHolder = styled.div`
  margin-bottom: 2rem;
`;

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Modal = styled(CenteredDialog)``;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;

  p {
    font-weight: 600;
  }
`;

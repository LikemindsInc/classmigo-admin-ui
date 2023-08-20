import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { UploadTick } from "../../../../../../Assets/Svgs";
import { ModalContext } from "../../../../../../Contexts/Contexts";
import { useApiPost } from "../../../../../../custom-hooks";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../../Ui_elements/Modal/Modal";
import { addQuestionUrl } from "../../../../../../Urls";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { OptionsCard } from "../Components/OptionsCard";
import { addQuestionSchema } from "../QuizLibrarySchema";

const AddQuestion = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectionOptionId, setSelectionOptionId] = useState<any>(null);
  const { setOpenModal } = useContext(ModalContext);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addQuestionSchema),
  });

  const { mutate: addQuestion } = useApiPost(
    addQuestionUrl,
    () => {},
    () => {}
  );

  const onSubmit = (data: any) => {
    const options = ["A", "B", "C", "D"];

    const requestBody: any = {
      questions: [
        {
          question: data.question,
          image: data.image,
          options: options.map((label) => ({
            label,
            value: data[`option${label}`],
          })),
          correctOption: selectedOption,
          explanation: "haba",
          score: data.score,
        },
      ],
      quizId: "one"
    };

    addQuestion(requestBody);

    // Use requestBody as needed
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <NumberHolder>
          <InputElement
            label="Number"
            register={register}
            id="quizId"
            error={errors}
            
          />
        </NumberHolder>
        <InputHolder>
          <TextAreaInput
            label="Question"
            width={300}
            register={register}
            id="question"
            error={errors}
          />
        </InputHolder>
        <InputHolder>
          <ImageInput type="image" register={register} id="image" />
        </InputHolder>
        <OptionsContainer>
          <h3>Select an Option:</h3>

          {["A", "B", "C", "D"].map((label, index) => (
            <OptionsCard
              key={index}
              indexId={index}
              value={`Option ${label}`}
              register={register}
              id={`option${label}`}
              selectionId={selectionOptionId}
              setSelectionId={setSelectionOptionId}
              setSelected={setSelectedOption}
              getValue={getValues}
              error={errors}
            />
          ))}
        </OptionsContainer>
        <ButtonHolder>
          <InputElement
            placeholder="Score"
            register={register}
            id="score"
            error={errors}
          />
          <ButtonElement label="Add Question" width={140} type="submit" />
        </ButtonHolder>
      </Container>
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
      ;
    </>
  );
};

export default AddQuestion;

const Container = styled.form`
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

const InputHolder = styled.div`
  margin-bottom: 2rem;
`;

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  input {
    width: 5vw;
  }
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

const NumberHolder = styled(InputHolder)`
  input{
    width:50px;
    padding:7px;
    text-align: center;
  }
`
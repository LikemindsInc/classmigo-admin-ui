import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useApiPost } from "../../../../../../../custom-hooks";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  TextAreaInput,
} from "../../../../../../../Ui_elements";
import { OptionsCard } from "./Components/OptionsCard";
import { UploadTick } from "../../../../../../../Assets/Svgs";
import { CenteredDialog } from "../../../../../../../Ui_elements/Modal/Modal";
import { customPost } from "../../../../../../../utils/utilFns";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { createAmigoQuizQuestionUrl } from "../../../../../../../Urls";

export const EditQuizQuestion = () => {
  const [selectionOptionId, setSelectionOptionId] = useState<any>(null);
  // const { setOpenModal } = useContext(ModalContext);
  const [openModal, setOpenModal] = useState(false);
  const { state } = useLocation();
  const { item } = state;
  const [selectedOption, setSelectedOption] = useState<any>(
    item ? item.correctOption : ""
  );
  // const [selectedOption, setSelectedOption] = useState<any>();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialOption = ["A", "B", "C", "D"].indexOf(item.correctOption);
    setSelectionOptionId(initialOption);
  }, [item.correctOption]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      question: item?.question,
      explanation: item?.explanation,
      optionA: item?.options[0]?.value,
      optionB: item?.options[1]?.value,
      optionC: item?.options[2]?.value,
      optionD: item?.options[3]?.value,
      score: item?.score,
    },
  });

  const onSuccess = () => {
    toast.success("Successfully edited question", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    navigate(-1);
  };

  const onError = () => {
    toast.error("Something went wrong", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: addQuestion, isLoading: isUpdatingQuestion } = useApiPost(
    createAmigoQuizQuestionUrl,
    onSuccess,
    onError
  );

  const onSubmit = async (data: any) => {
    const options = ["A", "B", "C", "D"];

    const imageUploadUrl =
      "https://classmigo.herokuapp.com/api/v1/admin/upload";

    if (data?.image) {
      const formData = new FormData();
      formData.append("file", data?.image);
      try {
        setIsUploadingImage(true);
        const response: any = await customPost(imageUploadUrl, formData);
        if (response) {
          setIsUploadingImage(false);
        }
        const requestBody: any = {
          questions: [
            {
              question: data.question,
              imageUrl: response?.data?.data?.url,
              explanation: data?.explanation,
              options: options.map((label) => ({
                label,
                value: data[`option${label}`],
              })),
              correctOption: selectedOption,
              score: data.score,
            },
          ],
          quizId: state,
        };
        addQuestion(requestBody);
      } catch (e) {
        console.log(e);
      }
    } else {
      const requestBody: any = {
        questions: [
          {
            question: data.question,
            explanation: data?.explanation,
            options: options.map((label) => ({
              label,
              value: data[`option${label}`],
            })),
            correctOption: selectedOption,
            score: data.score,
          },
        ],
        quizId: state,
      };
      addQuestion(requestBody);
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <InputHolder>
          <TextAreaInput
            label="Question"
            // width={300}
            register={register}
            id="question"
          />
        </InputHolder>
        <InputHolder>
          <TextAreaInput
            label="Question Explanation"
            // width={300}
            register={register}
            id="explanation"
          />
        </InputHolder>
        <InputHolder>
          <ImageInput
            type="image"
            register={register}
            id="image"
            // defaultImage={item?.imageUrl}
          />
        </InputHolder>
        <OptionsContainer>
          <h3>Select an Option:</h3>

          {["A", "B", "C", "D"].map((label, index) => (
            <OptionsCard
              option={label}
              key={index}
              indexId={index}
              value={`Option ${label}`}
              register={register}
              id={`option${label}`}
              selectionId={selectionOptionId}
              setSelectionId={setSelectionOptionId}
              setSelected={setSelectedOption}
              getValue={getValues}
            />
          ))}
        </OptionsContainer>
        <ButtonHolder>
          <InputElement placeholder="Score" register={register} id="score" />
          <ButtonElement
            label="Edit Question"
            width={140}
            type="submit"
            isLoading={isUpdatingQuestion || isUploadingImage}
          />
        </ButtonHolder>
      </Container>
      <Modal
        cancel={handleCancel}
        width={"40%"}
        openState={openModal}
      >
        <ModalContent>
          <UploadTick />
          <p>Question Edited Successfully</p>
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
  button {
    width: 170px;
  }
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

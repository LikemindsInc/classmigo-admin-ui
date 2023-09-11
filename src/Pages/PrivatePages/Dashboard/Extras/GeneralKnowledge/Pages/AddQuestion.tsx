import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { UploadTick } from "../../../../../../Assets/Svgs";
import { ModalContext } from "../../../../../../Contexts/Contexts";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  SelectInput,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../../Ui_elements/Modal/Modal";
import {
  addQuestionUrl,
  getAllClassesUrl,
  getAllLessonsUrl,
  getAllSubjectsUrl,
} from "../../../../../../Urls";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import {
  convertToBase64,
  customPost,
  formatOptions,
} from "../../../../../../utils/utilFns";
import { OptionsCard } from "../Components/OptionsCard";
import { addGeneralQuestionSchema } from "../GeneralQuizLibrarySchema";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImageUrl } from "../../../../../../Urls/Utils";
import { toast } from "react-toastify";
import { addGeneralKnowledgeUrl } from "../../../../../../Urls/GeneralKnowledge";

const AddQuestion = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectionOptionId, setSelectionOptionId] = useState<any>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [classValue, setClassValue] = useState<any>(null);
  const [subjectValue, setSubjectValue] = useState<any>(null);

  const { setOpenModal } = useContext(ModalContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addGeneralQuestionSchema),
  });

  const difficulties = [
    {
      value: 0,
      label: "BEGINNER",
    },
    {
      value: 1,
      label: "INTERMEDIATE",
    },
    {
      value: 2,
      label: "ADVANCED",
    },
  ];

  // console.log(errors, "error");

  // let classValue: any = watch("class");
  // let subjectValue: any = watch("subject");

  const { data: classes, isFetching: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const {
    data: subjects,
    isFetching: isLoadingSubjects,
    refetch: fetchSubject,
  } = useApiGet(
    ["allSubjects"],
    () => getAllSubjectsUrl(classValue && classValue),
    {
      refetchOnWindowFocus: false,
      enabled: !!classValue,
    }
  );

  const {
    data: topics,
    isFetching: isLoadingTopics,
    refetch: fetchTopic,
  } = useApiGet(
    ["lessonTopic"],
    () => getAllLessonsUrl(subjectValue && subjectValue?.label),
    {
      refetchOnWindowFocus: false,
      enabled: !!subjectValue,
      staleTime: 0,
    }
  );

  if (topics) {
    console.log(topics, "topics");
  }

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);
  const activeSubjects = subjects?.data?.subjects.filter(
    (item: any) => item.isActive
  );
  const activeTopics = topics?.data?.content.filter(
    (item: any) => item.isActive
  );

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(activeSubjects, "name", "_id");
  }, [activeSubjects]);

  const allTopics = useMemo(() => {
    return formatOptions(activeTopics, "lessonName", "_id");
  }, [activeTopics]);

  const onSuccess = () => {
    toast.success("Successfully added question", {
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

  const { mutate: addQuestion, isLoading: isAddingQuestion } = useApiPost(
    addGeneralKnowledgeUrl,
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
          subjectId: subjectValue?.value,
          class: classValue,
          lessonId: data?.topic?.value,
          difficultyLevel: data?.difficulty?.label,
          question: data.question,
          imageUrl: response?.data?.data?.url,
          explanation: data?.explanation,
          options: options.map((label) => ({
            label,
            value: data[`option${label}`],
          })),
          correctOption: selectedOption,
          score: parseInt(data.score),
        };
        console.log(requestBody, "request");
        addQuestion(requestBody);
      } catch (e) {
        console.log(e);
      }
    } else {
      const requestBody: any = {
        subjectId: subjectValue?.value,
        class: classValue,
        lessonId: data?.topic?.value,
        difficultyLevel: data?.difficulty?.label,
        question: data.question,
        explanation: data?.explanation,
        options: options.map((label) => ({
          label,
          value: data[`option${label}`],
        })),
        correctOption: selectedOption,
        score: data.score,
      };
      addQuestion(requestBody);
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <SelectHolder>
          <Controller
            name="class"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SelectContainer>
                <SelectInput
                  // value={value}
                  options={allClasses}
                  defaultValue={"Select Class"}
                  onChange={(value: any) => {
                    setClassValue(value?.value);
                    setValue("class", value?.value)
                  }}
                  error={errors?.class}
                  isLoading={isLoadingClasses}
                />
              </SelectContainer>
            )}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SelectContainer>
                <SelectInput
                  // value={value}
                  options={allSubjects}
                  defaultValue={"Subject Class"}
                  onChange={(value: any) => {
                    setSubjectValue(value);
                    setValue("subject", value?.value)
                  }}
                  error={errors?.subject}
                  isLoading={isLoadingSubjects}
                />
              </SelectContainer>
            )}
          />
          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  options={allTopics}
                  defaultValue={"Subject Class"}
                  error={errors?.topic}
                  isLoading={isLoadingTopics}
                />
              </SelectContainer>
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  options={difficulties}
                  defaultValue={"Select Difficulty"}
                  error={errors?.difficulty}
                />
              </SelectContainer>
            )}
          />
        </SelectHolder>

        {/* <InputHolder>
          <InputElement
            label="Name"
            register={register}
            id="name"
          />
        </InputHolder> */}
        <InputHolder>
          <TextAreaInput
            label="Question"
            // width={300}
            register={register}
            id="question"
            error={errors}
          />
        </InputHolder>
        <InputHolder>
          <TextAreaInput
            label="Question Explanation"
            // width={300}
            register={register}
            id="explanation"
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
          <ButtonElement
            label="Add Question"
            width={140}
            type="submit"
            isLoading={isAddingQuestion || isUploadingImage}
          />
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

const SelectHolder = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 3%;
  @media ${devices.tabletL} {
    flex-direction: column;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

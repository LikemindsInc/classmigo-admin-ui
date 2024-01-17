import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useMemo, useState, useEffect } from "react";
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
  getAllClassesUrl,
  getAllLessonsUrl,
  getAllSubjectsUrl,
} from "../../../../../../Urls";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { customPost, formatOptions } from "../../../../../../utils/utilFns";
import { OptionsCard } from "../Components/OptionsCard";
import { addGeneralQuestionSchema } from "../GeneralQuizLibrarySchema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addGeneralKnowledgeUrl } from "../../../../../../Urls/GeneralKnowledge";

const AddQuestion = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectionOptionId, setSelectionOptionId] = useState<any>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [classValue, setClassValue] = useState<any>(null);
  const [subjectValue, setSubjectValue] = useState<any>(null);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addGeneralQuestionSchema),
    defaultValues: {
      class: sessionStorage.getItem("class")
        ? JSON.parse(sessionStorage.getItem("class")!)?.label
        : "",
      topic: sessionStorage.getItem("topic")
        ? JSON.parse(sessionStorage.getItem("topic")!)?.label
        : null,
      subject: sessionStorage.getItem("subject")
        ? JSON.parse(sessionStorage.getItem("subject")!)?.label
        : null,

      difficulty: sessionStorage.getItem("difficulty")
        ? JSON.parse(sessionStorage.getItem("difficulty")!)?.label
        : null,
    },
  });

  let watchClass: any = watch("class");
  let watchSubject: any = watch("subject");
  let watchTopic: any = watch("topic");
  let watchDifficulty: any = watch("difficulty");

  console.log(watchClass, watchSubject, watchTopic, watchDifficulty);

  const { setOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpenModal(false);
  };

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
    () =>
      getAllSubjectsUrl(
        watchClass?.value || JSON.parse(sessionStorage.getItem("class")!)?.value
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!watchClass,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const {
    data: topics,
    isFetching: isLoadingTopics,
    refetch: fetchTopic,
  } = useApiGet(
    ["lessonTopic"],
    () =>
      getAllLessonsUrl(
        watchSubject?.label ||
          JSON.parse(sessionStorage.getItem("class")!)?.label,
        watchClass?.value || JSON.parse(sessionStorage.getItem("class")!)?.value
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!watchSubject,
      cacheTime: 0,
      staleTime: 0,
      retry: false,
    }
  );

  const activeClasses = useMemo(
    () => classes?.data?.filter((item: any) => item.isActive) ?? [],
    [classes]
  );

  const activeSubjects = useMemo(
    () => subjects?.data?.subjects?.filter((item: any) => item.isActive) ?? [],
    [subjects]
  );
  const activeTopics = useMemo(
    () => topics?.data?.content?.filter((item: any) => item.isActive) ?? [],
    [topics]
  );

  var allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  var allSubjects = useMemo(
    () => formatOptions(activeSubjects, "name", "_id"),
    [activeSubjects]
  );

  var allTopics = useMemo(
    () => formatOptions(activeTopics, "lessonName", "_id"),
    [activeTopics]
  );

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

  useEffect(() => {
    if (watchClass) {
      setValue("subject", "");
      setValue("topic", "");
      fetchSubject();
    }
  }, [watchClass, fetchSubject, setValue]);

  useEffect(() => {
    if (watchSubject) {
      fetchTopic();
    }
  }, [watchSubject]);

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
          subjectId:
            data.subject.value ||
            JSON.parse(sessionStorage.getItem("subject")!)?.value,
          class:
            data.class.value ||
            JSON.parse(sessionStorage.getItem("class")!)?.value,
          lessonId:
            data.topic.value ||
            JSON.parse(sessionStorage.getItem("topic")!)?.value,
          difficultyLevel:
            data.difficulty.label ||
            JSON.parse(sessionStorage.getItem("difficulty")!)?.label,
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
        addQuestion(requestBody);
      } catch (e) {
        console.log(e);
      }
    } else {
      const requestBody: any = {
        subjectId:
          data.subject.value ||
          JSON.parse(sessionStorage.getItem("subject")!)?.value,
        class:
          data.class.value ||
          JSON.parse(sessionStorage.getItem("class")!)?.value,
        lessonId:
          data.topic.value ||
          JSON.parse(sessionStorage.getItem("topic")!)?.value,
        difficultyLevel:
          data.difficulty.label ||
          JSON.parse(sessionStorage.getItem("difficulty")!)?.label,
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
          {
            <Controller
              name="class"
              control={control}
              render={({ field: { onChange, ...restField } }) => (
                <SelectContainer>
                  <SelectInput
                    {...restField}
                    options={allClasses}
                    defaultValue={"Select Class"}
                    onChange={(value: any) => {
                      // setClassValue(value?.value);
                      sessionStorage.setItem("class", JSON.stringify(value));
                      onChange(value);
                      // fetchSubject()
                    }}
                    error={errors?.class}
                    isLoading={isLoadingClasses}
                  />
                </SelectContainer>
              )}
            />
          }

          {allSubjects && (
            <Controller
              name="subject"
              control={control}
              render={({ field: { onChange, ...restField } }) => (
                <SelectContainer>
                  <SelectInput
                    {...restField}
                    options={allSubjects ?? []}
                    defaultValue={"Select Subject"}
                    onChange={(value: any) => {
                      // setSubjectValue(value?.value);
                      sessionStorage.setItem("subject", JSON.stringify(value));
                      onChange(value);
                      // fetchTopic()
                    }}
                    error={errors?.subject}
                    isLoading={isLoadingSubjects}
                  />
                </SelectContainer>
              )}
            />
          )}

          {allTopics && (
            <Controller
              name="topic"
              control={control}
              render={({ field: { onChange, ...restField } }) => (
                <SelectContainer>
                  <SelectInput
                    {...restField}
                    onChange={(value) => {
                      sessionStorage.setItem("topic", JSON.stringify(value));
                      onChange(value);
                    }}
                    options={allTopics ?? []}
                    defaultValue={"Select Topic"}
                    error={errors?.topic}
                    isLoading={isLoadingTopics}
                  />
                </SelectContainer>
              )}
            />
          )}

          <Controller
            name="difficulty"
            control={control}
            render={({ field: { onChange, ...restField } }) => (
              <SelectContainer>
                <SelectInput
                  {...restField}
                  onChange={(value) => {
                    sessionStorage.setItem("difficulty", JSON.stringify(value));
                    onChange(value);
                  }}
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

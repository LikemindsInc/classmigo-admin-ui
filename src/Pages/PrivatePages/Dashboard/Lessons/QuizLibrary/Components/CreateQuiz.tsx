import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import {
  ButtonElement,
  InputElement,
  SelectInput,
} from "../../../../../../Ui_elements";
import {
  createQuizUrl,
  getAllClassesUrl,
  getAllLessonsUrl,
  getAllSubjectsUrl,
} from "../../../../../../Urls";
import { formatOptions } from "../../../../../../utils/utilFns";
import { yupResolver } from "@hookform/resolvers/yup";
import { createQuestionSchema } from "../QuizLibrarySchema";

export const CreateQuiz = () => {
  const {
    handleSubmit,
    watch,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createQuestionSchema),
  });

  let classValue: any = watch("class");
  let subjectValue: any = watch("subject");
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

  const onSuccess = () => {
    toast.success(`Successfully created quiz`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    setValue("class", "");
    setValue("subject", "");
    setValue("name", " ");
    setValue("topic", "");
    setValue("difficulty", null as any);
  };

  const onError = (error: any) => {
    toast.error(`Something went wrong, could not create quiz: ${error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    setValue("class", "");
    setValue("subject", "");
    setValue("name", " ");
    setValue("topic", "");
    setValue("difficulty", null as any);
  };

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
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
  } = useApiGet(["allSubjects"], () => getAllSubjectsUrl(classValue?.value), {
    refetchOnWindowFocus: false,
    enabled: !!classValue,
  });
  const {
    data: topics,
    isFetching: isLoadingTopics,
    refetch: fetchTopic,
  } = useApiGet(["allTopics"], () => getAllLessonsUrl(subjectValue?.label), {
    refetchOnWindowFocus: false,
    enabled: !!subjectValue,
  });

  useEffect(() => {
    if (classValue) {
      fetchSubject();
    }
  }, [classValue, fetchSubject]);

  useEffect(() => {
    if (subjectValue) {
      fetchTopic();
    }
  }, [fetchTopic, subjectValue]);

  const allClasses = useMemo(
    () => formatOptions(classes?.data, "value", "name"),
    [classes?.data]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(subjects?.data?.subjects, "name", "_id");
  }, [subjects?.data]);

  const allTopics = useMemo(() => {
    return formatOptions(topics?.data?.content, "lessonName", "_id");
  }, [topics?.data]);

  const { mutate: addQuiz, isLoading: isCreatingQuiz } = useApiPost(
    createQuizUrl,
    onSuccess,
    onError
  );

  const onSubmit = (data: any) => {
    const requestBody: any = {
      subjectId: data?.subject.value,
      class: data?.class.value,
      name: data?.name,
      lessonId: data?.topic.value,
      difficultyLevel: data?.difficulty.label,
    };
    addQuiz(requestBody);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputElement label="Quiz Name" register={register} id={"name"} />
      <Controller
        name="class"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            options={allClasses}
            value={classValue}
            defaultValue="Select a class"
            isLoading={isLoadingClasses}
            error={errors?.class}
          />
        )}
      />

      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            options={allSubjects}
            defaultValue="Select a subject"
            isLoading={isLoadingSubjects}
            disabled={!classValue}
            error={errors?.subject}
          />
        )}
      />

      <Controller
        name="topic"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            options={allTopics}
            defaultValue="Select a topic"
            isLoading={isLoadingTopics}
            disabled={!subjectValue}
            error={errors?.topic}
          />
        )}
      />

      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            options={difficulties}
            defaultValue="Choose quiz difficulty"
            error={errors?.difficulty}
          />
        )}
      />

      <ButtonContainer>
        <ButtonElement label="Create Quiz" isLoading={isCreatingQuiz} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

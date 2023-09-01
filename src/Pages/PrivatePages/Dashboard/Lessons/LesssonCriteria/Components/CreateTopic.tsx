import React, { useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  SelectInput,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import {
  addTopicUrl,
  createQuizUrl,
  getAllClassesUrl,
  getAllLessonsUrl,
  getAllSubjectsUrl,
} from "../../../../../../Urls";
import { formatOptions } from "../../../../../../utils/utilFns";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalContext } from "../../../../../../Contexts/Contexts";
import { topicSchema } from "../LessonCriteriaSchema";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";


type Props = {
  scope: string,
  classTitle:string
}

export const CreateTopic = ({scope, classTitle}: Props) => {
  const { setOpenModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(topicSchema),
  });


  const handleSuccess = () => {
    toast.success("Successfully added topic", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const handleError = (error: any) => {
    toast.error(error?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: addTopic, isLoading: isAddingTopic } = useApiPost(
    addTopicUrl,
    handleSuccess,
    handleError,
    ["lessons-get-all"]
  );


  const onSubmit = (data: any) => {
    const requestBody: any = {
      lessonName: data?.topic,
      lessonDescription: data?.description,
      // introVideo: data?.video,
      schoolSubject: scope,
      studentClass: classTitle,
    };
    addTopic(requestBody);
    setValue("topic", "");
    setValue("description", "");
    setValue("video", "");
    setOpenModal(false)
  };


  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
        <InputHolders>
          <InputElement
            label="Topic Title"
            placeholder="Enter Lesson Title"
            register={register}
            id="topic"
            error={errors}
          />
        </InputHolders>

        <InputHolders>
          <TextAreaInput
            label="Description"
            placeholder="Give a little description of the lesson "
            register={register}
            id="description"
            error={errors}
          />
        </InputHolders>

        <InputHolders>
          <p>Upload Video</p>
          <ImageInput
            title="Upload Video"
            type="video"
            id="video"
            register={register}
            error={errors}
          />
        </InputHolders>
        <ButtonElement label="Add Topic" width={150} type="submit" isLoading={isAddingTopic} />
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  padding: 2% 0;
  input{
    width:100% !important;
  }
`;

const InputHolders = styled.div`
  margin-bottom: 2rem;
  >p {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;
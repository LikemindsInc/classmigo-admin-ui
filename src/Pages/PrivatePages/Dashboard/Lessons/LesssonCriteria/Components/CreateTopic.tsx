import React, { useContext} from "react";
import {useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import {useApiPost } from "../../../../../../custom-hooks";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import {
  addTopicUrl,
} from "../../../../../../Urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { LessonCriteriaContext, ModalContext } from "../../../../../../Contexts/Contexts";
import { topicSchema } from "../LessonCriteriaSchema";


export const CreateTopic = ({
  register,
  handleSubmit,
  errors,
  setValue
}: any) => {
  const { setOpenModal } = useContext(ModalContext);
  const {className, subject} = useContext(LessonCriteriaContext)

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(topicSchema),
  // });

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
    setValue("topic", "");
    setValue("description", "");
    setValue("video", null as any);
    setOpenModal(false);
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
    const formData = new FormData();
    formData.append("lessonName", data?.topic.trim());
    formData.append("lessonDescription", data?.description);
    formData.append("file", data?.video);
    data?.introVideo && formData.append("introVideo", data?.introVideo);
    formData.append("schoolSubject", subject?.value);
    formData.append("studentClass", className?.value);
    addTopic(formData as any);
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
        <p>Upload Intro Video</p>
        <ImageInput
          title="Upload Video"
          type="video"
          id="video"
          register={register}
          error={errors}
          setValue={setValue}
        />
      </InputHolders>

      <InputHolders>
        <p>Or enter intro video URL</p>
        <InputElement
          // label="Video URL"
          placeholder="Enter Video URL"
          register={register}
          id="introVideo"
        />
      </InputHolders>
      <ButtonElement
        label="Add Topic"
        width={150}
        type="submit"
        isLoading={isAddingTopic}
      />
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  padding: 2% 0;
  input {
    width: 100% !important;
  }
`;

const InputHolders = styled.div`
  margin-bottom: 2rem;
  > p {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;

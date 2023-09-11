import React, { useContext } from "react";
import styled from "styled-components";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useApiPost } from "../../../../../../custom-hooks";
import { addSubTopicUrl } from "../../../../../../Urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { subTopicSchema } from "../LessonCriteriaSchema";
import { LessonCriteriaContext } from "../../../../../../Contexts/Contexts";

const Subtopic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topic } = useContext(LessonCriteriaContext);
  // const { state } = location;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subTopicSchema),
  });

  const onSuccess = () => {
    toast.success("Successfully added Video", {
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
  const onError = (e: any) => {
    toast.error(`Something went wrong, ${e.message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: addSubTopic, isLoading: isAddingSubtopic } = useApiPost(
    (_: any) => addSubTopicUrl(_, topic),
    onSuccess,
    onError
    // [`sub_topic${item?._id}`]
  );

  const onSubmit = (data: any) => {
    const formData = new FormData();
    data?.video && formData.append("file", data?.video);
    formData.append("topic", data?.subtopicTitle);
    formData.append("shortNote", data?.subtopicDescription);
    data?.videoUrl && formData.append("introVideo", data?.videoUrl);
    formData.append("thumbnail", data?.thumbnail ? data?.thumbnail : "");
    addSubTopic(formData as any);
  };
  return (
    <Container>
      <DetailsContainer onSubmit={handleSubmit(onSubmit)}>
        <InputHolders>
          <InputElement
            label="Subtopic Title"
            placeholder="Enter Subtopic Title"
            register={register}
            id="subtopicTitle"
            error={errors}
          />
        </InputHolders>

        <InputHolders>
          <TextAreaInput
            label="Description"
            placeholder="Give a little description of the lesson "
            register={register}
            id="subtopicDescription"
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
            setValue={setValue}
          />
        </InputHolders>
        <InputHolders>
          <InputElement
            label="Or Enter Video Url"
            placeholder="Enter Video Url"
            register={register}
            id="videoUrl"
            error={errors}
          />
        </InputHolders>
        <ThumbnailSection>
          <h6>Thumbnail (Optional)</h6>
          <p>Choose or upload an image to show what the video is about</p>
          <ThumbnailList>
            <ImageInput
              title="Upload Thumbnail"
              type="image"
              id="thumbnail"
              register={register}
              error={errors}
              setValue={setValue}
            />
          </ThumbnailList>
        </ThumbnailSection>
        <ButtonElement
          label="Add Subtopic"
          width={150}
          type="submit"
          isLoading={isAddingSubtopic}
        />
      </DetailsContainer>
    </Container>
  );
};

export default Subtopic;

const Container = styled.section`
  width: 100% !important;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 3%;
  display: flex;
  justify-content: space-between;
  overflow-y: scroll;
  position: relative !important;
  gap: 5%;

  @media ${devices.tabletL} {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const DetailsContainer = styled.form`
  width: 50%;
  margin: 0 !important;
  padding: 0 !important;
  button {
    margin-top: 1rem;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  gap: 5%;
  margin-top: 2rem;
  @media ${devices.tabletL} {
    flex-direction: column;
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

const ThumbnailSection = styled.section`
  margin-top: 2rem;
  h6,
  p {
    font-size: 0.8rem;
  }
  h6 {
    font-weight: 600;
  }
`;

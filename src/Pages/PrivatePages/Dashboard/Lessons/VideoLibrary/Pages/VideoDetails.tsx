import React from "react";
import styled from "styled-components";
import {
  ButtonElement,
  ImageInput,
  InputElement,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { VideoCard } from "../Component/VideoCard";
import { useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { fi } from "date-fns/locale";

const VideoDetails = () => {
  const location = useLocation();
  const { state } = location;

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      title: state?.details?.title,
    }
  });
  console.log(state);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <DetailsContainer onSubmit={handleSubmit(onSubmit)}>
        <InputHolders>
          <InputElement
            label="Lesson Title"
            placeholder="Enter Lesson Title"
            value={`${state?.details?.title}`}
            disabled={true}
          />
        </InputHolders>

        <InputHolders>
          <TextAreaInput
            label="Description"
            placeholder="Give a little description of the lesson "
            register={register}
            id="description"
          />
        </InputHolders>

        <InputHolders>
          <p>Upload Video</p>
          <ImageInput title="Upload Video" type="video" name="video" register={register}  />
        </InputHolders>
        <ThumbnailSection>
          <h6>Thumbnail</h6>
          <p>Choose or upload an image to show what the video is about</p>
          <ThumbnailList>
            <ImageInput title="Upload Thumbnail" type="image" name="image" register={register}  />
          </ThumbnailList>
        </ThumbnailSection>
        <ButtonElement label="Save" width={150} type="submit" />
      </DetailsContainer>
      <PreviewContainer>
        <h6>Preview</h6>
        <div>
          <VideoCard
            title={state?.details?.title}
            source={state?.details?.videoUrl}
          />
        </div>
      </PreviewContainer>
    </Container>
  );
};

export default VideoDetails;

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
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
  button {
    margin-top: 1rem;
  }
`;
const PreviewContainer = styled.aside`
  h6 {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  p {
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

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
  ButtonElement,
  DatePickerInput,
  ImageInput,
  InputElement,
  SelectInput,
  TextAreaInput,
} from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { Controller, useForm } from "react-hook-form";
import { getAllClassesUrl, getAllSubjectsUrl } from "../../../../../../Urls";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import {
  convertToBase64,
  formatOptions,
} from "../../../../../../utils/utilFns";
import { createLiveLessonUrl } from "../../../../../../Urls/LiveSessions";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { liveSessionSchema } from "../LiveSessionsSchema";
import { useNavigate } from "react-router-dom";
const LiveSessionsForm = () => {
  const currentDate = new Date();
  const [timeLine, setTimeLine] = useState<any>(null);
  const navigate = useNavigate()
  const { register, control, watch, handleSubmit } = useForm({
    // resolver: yupResolver(liveSessionSchema)
  });

  const classValue = watch("class");
  const subjectValue = watch("subject");

  const onSuccess = () => {

    toast.success("Successfully added topic", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });

    navigate(-1)
  };
  const onError = (e: any) => {
    toast.error(e, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  const { data: subjects, isLoading: isLoadingSubjects } = useApiGet(
    ["allSubjects"],
    () => getAllSubjectsUrl(classValue?.value),
    {
      refetchOnWindowFocus: false,
      enabled: !!classValue,
    }
  );

  const { mutate: createLiveLesson, isLoading: isCreatingLiveLesson } =
    useApiPost(createLiveLessonUrl, onSuccess, onError, ["classes"]);

  const allClasses = useMemo(
    () => formatOptions(classes?.data, "value", "name"),
    [classes?.data]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(subjects?.data?.subjects, "name", "name");
  }, [subjects?.data]);

  const onSubmit = (data: any) => {
    const requestBody:any = {
      subject: data?.subject?.value,
      class: data?.class?.value,
      note: data?.note,
      date: data?.date,
      liveUrl: data?.liveUrl,
      title: data?.title,
      // image: data?.thumbnail,
    };
    createLiveLesson(requestBody);
  };
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <Controller
          name="class"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={allClasses}
              value={classValue}
              defaultValue="Subject Class"
              width={200}
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
              value={subjectValue}
              defaultValue="Select Subject"
              width={200}
            />
          )}
        />
      </Header>

      <InputHolder>
        <InputElement
          label="Live Lesson Title"
          id="title"
          register={register}
        />
      </InputHolder>
      <InputHolder>
        <TextAreaInput label="Description" id="note" register={register} />
      </InputHolder>
      <TimeSelect>
        <Controller
          name="date"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePickerInput
              label="Date"
              iconHidden={false}
              width={150}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <TimeContainer>
          <InputElement label="Hour" id="hour" register={register} />
          <p>:</p>
          <InputElement label="Minute" id="minute" register={register} />
          <ButtonsContainer>
            <ButtonInputAm active={timeLine} onClick={() => setTimeLine("AM")}>
              AM
            </ButtonInputAm>
            <ButtonInputPm active={timeLine} onClick={() => setTimeLine("PM")}>
              PM
            </ButtonInputPm>
          </ButtonsContainer>
        </TimeContainer>
      </TimeSelect>

      <ThumbnailSection>
        <h6>Thumbnail</h6>
        <p>Choose or upload an image to show what the video is about</p>
        <ThumbnailList>
          <ImageInput
            title="Upload Thumbnail"
            type="image"
            id="thumbnail"
            register={register}
          />
        </ThumbnailList>
      </ThumbnailSection>
      <InputHolder>
        <InputElement
          label="Live Lesson URL"
          placeholder="Enter the URL to the live lesson here"
          id="liveUrl"
          register={register}
        />
      </InputHolder>
      <InputHolder>
        <ButtonElement label="Schedule" width={150} isLoading={isCreatingLiveLesson} />
      </InputHolder>
    </Container>
  );
};

export default LiveSessionsForm;

const Container = styled.form`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 5%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2%;
  > div {
    display: flex;
    gap: 1%;
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;

  }
  @media ${devices.tabletL} {
    gap: 4%;
  }
`;

const TimeSelect = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3rem;
`;
const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    margin-top: 10%;
    font-size: 2rem;
    font-weight: 500;
  }
  input {
    width: 50px;
    padding: 10px;
    text-align: center;
  }
`;

const InputHolder = styled.div`
  width: 50%;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 5px;
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

const ThumbnailList = styled.div`
  margin-top: 2rem;
`;

const ButtonInputAm = styled.div<{ active: string }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) =>
    active === "AM" ? "var(--primary-color)" : "var(--dashboardBackground)"};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  color: ${({ active }) => (active === "AM" ? "white" : "black")};
  transition: all 0.3s ease;
`;

const ButtonInputPm = styled.div<{ active: string }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: ${({ active }) => (active === "PM" ? "white" : "black")};
  justify-content: center;
  background-color: ${({ active }) =>
    active === "PM" ? "var(--primary-color)" : "var(--dashboardBackground)"};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

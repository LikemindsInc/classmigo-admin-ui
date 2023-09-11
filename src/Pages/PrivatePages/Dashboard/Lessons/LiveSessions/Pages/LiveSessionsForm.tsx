import React, { useEffect, useMemo, useState } from "react";
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
import { formatOptions } from "../../../../../../utils/utilFns";
import {
  createLiveLessonUrl,
  updateLiveLesson,
} from "../../../../../../Urls/LiveSessions";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { liveSessionSchema } from "../LiveSessionsSchema";
import { useLocation, useNavigate } from "react-router-dom";
import { DateTimePickerElement } from "../../../../../../Ui_elements/Input/dateTimePicker";
import dayjs from "dayjs";
const LiveSessionsForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [parsedDate, setParsedDate] = useState<any>(null);
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(liveSessionSchema),
    defaultValues: {
      class: state?.class || undefined,
      subject: state?.subject?.name || undefined,
      title: state?.title || null,
      note: state?.note || null,
      liveUrl: state?.liveUrl || null,
      date: state?.date,
      durationInMinutes: state?.durationInMinutes || null,
    },
  });

  let classValue: any = watch("class");

  useEffect(() => {
    if (state) {
      setParsedDate(state.date);
    }
  }, [state]);

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

    navigate(-1);
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
  } = useApiGet(["allSubjects"], () => getAllSubjectsUrl(classValue?.value), {
    refetchOnWindowFocus: false,
    enabled: !!classValue,
  });

  useEffect(() => {
    if (classValue) {
      fetchSubject();
    }
  }, [classValue, fetchSubject]);

  const handleSuccess = () => {
    toast.success(`Successfully Updated Live Lessons`, {
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

  const handleError = () => {
    toast.error(`Something went wrong, could not update live lesson`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: updateSession, isLoading: isUpdatingLiveLesson } = useApiPost(
    state ? (_: any) => updateLiveLesson(_, state?._id) : null,
    handleSuccess,
    handleError
  );

  const { mutate: createLiveLesson, isLoading: isCreatingLiveLesson } =
    useApiPost(createLiveLessonUrl, onSuccess, onError, ["classes"]);

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);
  // const activeSubjects =
  //   subjects && subjects?.data?.subjects.filter((item: any) => item.isActive);

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(subjects?.data?.subjects, "name", "name");
  }, [subjects?.data?.subjects]);

  const handleUpdate = (data: any) => {
    const requestBody: any = {
      subject: data?.subject?.value,
      class: data?.class?.value,
      note: data?.note,
      date: data?.date?.$d,
      liveUrl: data?.liveUrl,
      title: data?.title,
      durationInMinutes: data?.durationInMinutes,
    };
    updateSession(requestBody);
  };

  const onSubmit = (data: any) => {
    const requestBody: any = {
      subject: data?.subject?.value,
      class: data?.class?.value,
      note: data?.note,
      date: data?.date,
      liveUrl: data?.liveUrl,
      title: data?.title,
      durationInMinutes: data?.durationInMinutes,
    };
    createLiveLesson(requestBody);
  };
  return (
    <Container onSubmit={handleSubmit(state ? handleUpdate : onSubmit)}>
      <Header>
        <div>
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={allClasses}
                defaultValue={"Select a class"}
                width={200}
                error={errors?.class}
                isLoading={isLoadingClasses}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={allSubjects}
                defaultValue={"Select Subject"}
                width={200}
                error={errors?.subject}
                isLoading={isLoadingSubjects}
              />
            )}
          />
        </div>
      </Header>

      <InputHolder>
        <InputElement
          label="Live Lesson Title"
          id="title"
          placeholder={"Enter A Tile For Your Live Lesson"}
          register={register}
          error={errors}
        />
      </InputHolder>
      <InputHolder>
        <TextAreaInput
          label="Description"
          placeholder={"Enter Your Live Lesson Description"}
          id="note"
          register={register}
          error={errors}
        />
      </InputHolder>

      <InputHolder>
        <DateTimePickerElement
          id="date"
          setValue={setValue}
          error={errors?.date}
          defaultValue={state ? new Date(state?.date) : null}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Duration In Minutes"
          id="durationInMinutes"
          placeholder="Please Enter Duration In Minutes (1 Hour = 60 Minutes)"
          register={register}
          error={errors}
        />
      </InputHolder>

      {/* <ThumbnailSection>
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
      </ThumbnailSection> */}
      <InputHolder>
        <InputElement
          label="Live Lesson URL"
          placeholder="Enter the URL to the live lesson here"
          id="liveUrl"
          register={register}
          error={errors}
        />
      </InputHolder>
      <InputHolder>
        <ButtonElement
          label={state ? "Update" : "Schedule"}
          width={150}
          isLoading={isUpdatingLiveLesson || isCreatingLiveLesson}
        />
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
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
  @media ${devices.tabletL} {
    gap: 4%;
  }
`;

const InputHolder = styled.div`
  width: 50%;
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

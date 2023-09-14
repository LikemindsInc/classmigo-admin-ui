import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  ButtonElement,
  InputElement,
  SelectInput,
} from "../../../../../../../Ui_elements";
import { DateTimePickerElement } from "../../../../../../../Ui_elements/Input/dateTimePicker";
import { CsvIcon, CsvIconPrimary } from "../../../../../../../Assets/Svgs";
import { yupResolver } from "@hookform/resolvers/yup";
import { scheduleQuizSchema } from "./MainPageSchema";
import { useApiPost } from "../../../../../../../custom-hooks";
import { scheduleAmigoQuizUrl } from "../../../../../../../Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface MainProp {
  classOptions: { value: any; label: any }[];
  isLoadingClassOptions: boolean;
}

export const ScheduleQuiz = ({
  classOptions,
  isLoadingClassOptions,
}: MainProp) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheduleQuizSchema),
  });


  const success = () => {
    toast.success("Successfully Scheduled Quiz", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  }

  const error = (error:AxiosError) => {
    toast.error(`Something went wrong, ${error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  }

  const { mutate: scheduleAmigoQuiz, isLoading: isScheduling } = useApiPost(
    scheduleAmigoQuizUrl,
    success,
    error
  );

  const onSubmit = (data: any) => {
    const requestBody: any = {
      tag: data.tag,
      className: data.class.value,
      startDateTime: data.date,
      questionCompletionTimeInSecond: data.time,
    };
    scheduleAmigoQuiz(requestBody);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputHolder>
        <Controller
          name="class"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={classOptions}
              defaultValue={"Select a class"}
              error={errors?.class}
              isLoading={isLoadingClassOptions}
            />
          )}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Quiz Tag"
          placeholder="Enter Quiz Tag"
          register={register}
          id="tag"
          error={errors}
        />
      </InputHolder>
      {/* <InputHolder>
        <InputElement
          label="Question Completion Time (In Seconds)"
          placeholder="Enter Question Time"
          register={register}
          id="time"
          error={errors}
        />
      </InputHolder> */}

      <InputHolder>
        <DateTimePickerElement
          id="date"
          setValue={setValue}
          error={errors?.date}
          // defaultValue={state ? new Date() : null}
        />
      </InputHolder>

      <InputHolder>
        <ButtonElement
          outline
          label="Upload Questions.CSV"
          width={350}
          icon={<CsvIconPrimary />}
        />
      </InputHolder>

      <InputHolder>
        <ButtonElement
          type="submit"
          label="Schedule"
          width={250}
          isLoading={isScheduling}
        />
      </InputHolder>

      <InputHolder></InputHolder>
    </Container>
  );
};

const Container = styled.form``;
const InputHolder = styled.div`
  width: 20%;
  margin-bottom: 5%;
  & > button {
    width: 200px !important;
  }import { AxiosError } from 'axios';

`;

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  ButtonElement,
  InputElement,
  Loader,
  SelectInput,
} from "../../../../../../../Ui_elements";
import { DateTimePickerElement } from "../../../../../../../Ui_elements/Input/dateTimePicker";
import { CsvIconPrimary } from "../../../../../../../Assets/Svgs";
import { yupResolver } from "@hookform/resolvers/yup";
import { scheduleQuizSchema } from "./MainPageSchema";
import { useApiGet, useApiPost } from "../../../../../../../custom-hooks";
import {
  getAllClassesUrl,
  scheduleAmigoQuizUrl,
  updateAmigoQuizUrl,
} from "../../../../../../../Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { formatOptions } from "../../../../../../../utils/utilFns";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";




export const ScheduleQuiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      class: state?.item?.className || null,
      tag: state?.item?.tag || null,
      date: state?.item?.startDateTime || null,
    },
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
    navigate(-1);
  };

  const error = (error: AxiosError) => {
    toast.error(`Something went wrong, ${error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: scheduleAmigoQuiz, isLoading: isScheduling } = useApiPost(
    scheduleAmigoQuizUrl,
    success,
    error
  );

  const { mutate: updateAmigoQuiz, isLoading: isUpdating } = useApiPost(
    (_: any) => updateAmigoQuizUrl(_, state?.item?._id),
    success,
    error
  );

  const { data: classes, isLoading: isLoadingClassOptions } = useApiGet(
    ["allClassesA"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const onSubmit = (data: any) => {
    const requestBody: any = {
      tag: data.tag,
      className: data.class.value || data.class,
      startDateTime: data.date,
      questionCompletionTimeInSecond: data.time,
    };

    if (state) {
      updateAmigoQuiz(requestBody);
    } else {
      scheduleAmigoQuiz(requestBody);
    }
  };

  if (isLoadingClassOptions) {
    return <Loader/>
  }


  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputHolder>
        <Controller
          name="class"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={allClasses}
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

      <InputHolder>
        <DateTimePickerElement
          id="date"
          setValue={setValue}
          error={errors?.date}
          defaultValue={state ? new Date(state?.item?.startDateTime) : null}
        />
      </InputHolder>

      {/* <InputHolder>
        <ButtonElement
          outline
          label="Upload Questions.CSV"
          icon={<CsvIconPrimary />}
        />
      </InputHolder> */}

      <InputHolder>
        <ButtonElement
          type="submit"
          label={state ? "Update Quiz" : "Schedule"}
          width={250}
          isLoading={isScheduling || isUpdating}
        />
      </InputHolder>

      <InputHolder></InputHolder>
    </Container>
  );
};

const Container = styled.form``;
const InputHolder = styled.div`
  width: 18%;
  margin-bottom: 3%;
  & > button {
    width: 100%;
  }
  @media ${devices.tabletL}{
    width:100%;
    margin-bottom:10%;
  }
`;

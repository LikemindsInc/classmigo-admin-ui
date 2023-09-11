import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { ButtonElement, SelectInput } from "../../../../../../../Ui_elements";
import { DateTimePickerElement } from "../../../../../../../Ui_elements/Input/dateTimePicker";
import { CsvIcon, CsvIconPrimary } from "../../../../../../../Assets/Svgs";

export const ScheduleQuiz = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  return (
    <Container>
      <InputHolder>
        <Controller
          name="class"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={[]}
              defaultValue={"Select a class"}
              width={200}
              error={errors?.class}
              isLoading={false}
            />
          )}
        />
      </InputHolder>
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
        <ButtonElement label="Schedule" width={250} />
      </InputHolder>

      <InputHolder></InputHolder>
    </Container>
  );
};

const Container = styled.section``;
const InputHolder = styled.div`
  width: fit-content;
  margin-bottom: 5%;
  & > button {
    width: 200px !important;
  }
`;

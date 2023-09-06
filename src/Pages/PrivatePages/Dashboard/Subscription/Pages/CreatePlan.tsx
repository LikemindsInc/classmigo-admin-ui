import React, { useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  InputElement,
  SelectInput,
} from "../../../../../Ui_elements";
import { Controller, useForm } from "react-hook-form";
import { SUBSCRIPTION_TYPES } from "../../../../../utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscriptionSchema } from "../SubscriptionSchema";
import { useApiPost } from "../../../../../custom-hooks";
import { createSubscription, updateSubscription } from "../../../../../Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePlan = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: state && {
      type: state?.type,
      duration: state?.dayCount,
      price: state?.price,
      discount: state?.discountedPrice,
      subscriptionName: state?.friendlyName,
    },
  });

  const onSuccess = () => {
    toast.success("Successfully added subscription", {
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

  const onSuccessUpdate = () => {
    toast.success("Successfully Updated Subscription", {
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

  const onError = (e: AxiosError) => {
    toast.error(`Something went wrong. ${e}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const { mutate: addSubscription, isLoading: isCreatingSubscription } =
    useApiPost(createSubscription, onSuccess, onError);

  const { mutate: updateSub, isLoading: isUpdatingSubscription } = useApiPost(
    (_: any) => updateSubscription(_, state?._id),
    onSuccessUpdate,
    onError
  );

  const onSubmit = (data: any) => {
    if (state) {
      const requestBody: any = {
        type: data.type.value,
        dayCount: data.duration,
        price: data.price,
        friendlyName: data.subscriptionName,
        discountedPrice: data.discount,
        label:data.type.label
      };
      updateSub(requestBody);
    } else {
      const requestBody: any = {
        type: data.type.value,
        dayCount: data.duration,
        price: data.price,
        friendlyName: data.subscriptionName,
        discountedPrice: data.discount || 0,
        label:data.type.label
      };
      addSubscription(requestBody);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <ButtonHolder>
        <label>Subscription Type</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <SelectInput
              {...field}
              options={SUBSCRIPTION_TYPES}
              defaultValue={"Select Subscription Type"}
              error={errors?.type}
            />
          )}
        />
      </ButtonHolder>

      <InputHolder>
        <InputElement
          label="Duration In Days"
          placeholder="Enter Duration In Days"
          register={register}
          id="duration"
          error={errors}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Set Subscription Price"
          placeholder="Enter Subscription Price"
          register={register}
          id="price"
          error={errors}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Set Discount in percentage (Optional)"
          placeholder="Enter Discount Price"
          register={register}
          id="discount"
          error={errors}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Subscription Name"
          placeholder="Enter Subscription Name"
          register={register}
          id="subscriptionName"
          error={errors}
        />
      </InputHolder>

      <ButtonElement
        label={state ? "Update Plan" : "Create Plan"}
        type="submit"
        isLoading={isCreatingSubscription || isUpdatingSubscription}
      />

      {/* <SubscriptionCard/> */}
    </Container>
  );
};

export default CreatePlan;

const InputHolder = styled.div`
  width: 40%;
`;
const ButtonHolder = styled.div`
  width: 40%;
  input {
    width: 100%;
    margin-top: 0.5rem !important;
  }
  label {
    font-weight: 600;
    font-size: 0.8rem;
  }
`;
const Container = styled.form`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  button {
    width: 200px;
  }
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const PlanButton = styled.div<{ selected: boolean }>`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ selected }) => (selected ? "white" : "black")};
  background-color: ${({ selected }) =>
    selected ? "var(--primary-color)" : "transparent"};
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    background-color: var(--primary-color);
    color: white;
  }
`;

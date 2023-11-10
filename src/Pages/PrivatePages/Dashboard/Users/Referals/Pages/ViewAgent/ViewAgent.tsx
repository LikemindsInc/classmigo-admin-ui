import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AnyObject } from "yup";
import { useApiGet, useApiPost } from "../../../../../../../custom-hooks";
import {
  ButtonElement,
  InputElement,
  Loader,
  SelectInput,
} from "../../../../../../../Ui_elements";
import {
  createAgent,
  getCountries,
  getLga,
  getStates,
} from "../../../../../../../Urls";
import { UNIVERSAL_KEY } from "../../../../../../../utils/constants";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import {
  customApiGet,
  formatOptions,
  generateRandom,
} from "../../../../../../../utils/utilFns";
import { ViewAgentSchema } from "../../ReferalSchema";

export const ViewAgent = () => {
  const [fetchingAuth, setFetchingAuth] = useState(false);
  const [countryToken, setCountryToken] = useState("");
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ViewAgentSchema),
  });

  const country: any = watch("country");
  const state: any = watch("state");

  const {
    data: countries,
    isLoading: isLoadingCountires,
    isError: isCountriesError,
  } = useApiGet(["countriesQuery"], () => getCountries(countryToken), {
    enabled: !!countryToken,
  });

  const {
    data: states,
    isFetching: isLoadingState,
    isError: isStatesError,
  } = useApiGet(
    ["statesQuery"],
    () => getStates(countryToken, country?.label),
    {
      enabled: !!country,
    }
  );

  const {
    data: lga,
    isFetching: isLoadingLga,
    isError: isLgaError,
  } = useApiGet(["lgaQuery"], () => getLga(countryToken, state?.label), {
    enabled: !!state,
  });

  const allCountries = useMemo(
    () => formatOptions(countries, "country_name", "country_phone_code"),
    [countries]
  );

  const allStates = useMemo(
    () => formatOptions(states, "state_name", "state_name"),
    [states]
  );

  const allLga = useMemo(
    () => formatOptions(lga, "city_name", "city_name"),
    [lga]
  );

  const generateRandomPassword = () => {
    const value = generateRandom(8);

    setValue("password", value);
  };

  useEffect(() => {
    async function getAuth() {
      setFetchingAuth(true);
      try {
        const headers = {
          Accept: "application/json",
          "api-token": UNIVERSAL_KEY,
          "user-email": "amavictor47@gmail.com",
        };
        const url = "https://www.universal-tutorial.com/api/getaccesstoken";
        const response: AnyObject = await customApiGet(url, headers);
        setFetchingAuth(false);
        setCountryToken(response?.auth_token);
      } catch (e) {
        console.error(e);
        setFetchingAuth(false);
      }
    }

    if (!countryToken) {
      getAuth();
    }
  }, [countryToken]);

  const onSuccess = () => {
    toast.success("Successfully added agent", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });

    setValue("fullName", "");
    setValue("phoneNumber", "");
    setValue("email", "");
    setValue("password", "");
    setValue("country", null as any);
    setValue("state", null as any);
    setValue("lga", null as any);
    // reset()
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

    setValue("fullName", "");
    setValue("phoneNumber", "");
    setValue("email", "");
    setValue("password", "");
    setValue("country", null as any);
    setValue("state", null as any);
    setValue("lga", null as any);
  };

  const { mutate: createAgents, isLoading: isCreatingAgent } = useApiPost(
    createAgent,
    onSuccess,
    onError
  );

  const onSubmit = (data: any) => {
    const requestBody: any = {
      fullName: data?.fullName,
      phoneNumber: data?.phoneNumber,
      password: data?.password,
      country: data?.country?.label,
      state: data?.state?.label,
      lga: data?.lga?.label,
      email: data?.email,
    };
    createAgents(requestBody);
  };

  if (isLoadingCountires || fetchingAuth) {
    return <Loader />;
  }

  if (isCountriesError || isStatesError || isLgaError) {
    return <p>Something didn't load. Please refresh the page</p>;
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputHolder>
        <InputElement
          label="Full Name"
          id="fullName"
          placeholder={"Enter full name"}
          register={register}
          error={errors}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Phone Number"
          id="phoneNumber"
          placeholder="Enter phone number"
          register={register}
          error={errors}
        />
      </InputHolder>

      <InputHolder>
        <InputElement
          label="Email"
          id="email"
          placeholder="Enter email"
          register={register}
          error={errors}
        />
      </InputHolder>

      <div
        style={{
          display: "flex",
          width: "50%",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <InputHolder style={{ width: "80%" }}>
          <InputElement
            label="Password"
            id="password"
            placeholder="Enter password"
            register={register}
            error={errors}
          />
        </InputHolder>

        <div
          className="outline-button mt-20"
          style={{
            width: "fit-content",
            height: "auto",
            display: "flex",
            backgroundColor: "var(--hover-color)",
          }}
          onClick={generateRandomPassword}
        >
          Generate
        </div>
      </div>

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <SelectContainer>
            <label>Country</label>
            <SelectInput
              {...field}
              options={allCountries}
              defaultValue={"Select Country"}
              error={errors?.country}
            />
          </SelectContainer>
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <SelectContainer>
            <label>State</label>
            <SelectInput
              {...field}
              options={allStates}
              defaultValue={"Select State"}
              error={errors?.state}
              isLoading={isLoadingState}
            />
          </SelectContainer>
        )}
      />
      <Controller
        name="lga"
        control={control}
        render={({ field }) => (
          <SelectContainer>
            <label>LGA</label>
            <SelectInput
              {...field}
              options={allLga}
              defaultValue={"Select Lga"}
              error={errors?.lga}
              isLoading={isLoadingLga}
            />
          </SelectContainer>
        )}
      />
      <InputHolder>
        <ButtonElement
          label="Create Agent"
          width={150}
          isLoading={isCreatingAgent}
        />
      </InputHolder>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  margin-top: -3rem;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 5%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const InputHolder = styled.div`
  width: 50%;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 50%;
  label {
    font-size: 0.8rem;
    font-weight: 600;
  }
  flex-direction: column;
  gap: 10px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

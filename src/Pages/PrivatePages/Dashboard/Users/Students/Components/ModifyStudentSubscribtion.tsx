import { FC, useMemo } from "react";
import { Student } from "../Students";
import { Controller, useForm } from "react-hook-form";
import { ButtonElement, SelectInput } from "../../../../../../Ui_elements";
import styled from "styled-components";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import {
  awardSubscription,
  getAllClassesUrl,
  getSubscriptions,
} from "../../../../../../Urls";
import {
  formatOptions,
  formatSubscriptionOptions,
} from "../../../../../../utils/utilFns";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { toast } from "react-toastify";

interface IProps {
  student: Student | null;
  onComplete: () => void;
}

const ModifyStudentSubscription: FC<IProps> = ({ student, onComplete }) => {
  const { control, setValue, getValues, handleSubmit } = useForm();

  const handleClearClass = () => {
    setValue("className", null);
  };
  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["subscriotion-modal", "allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const { data, isLoading } = useApiGet(
    ["modify-student", "subscription"],
    () => getSubscriptions(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const activeClasses = classes
    ? classes?.data?.filter((item: any) => item.isActive)
    : [];

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const allSubscriptions = useMemo(
    () => formatSubscriptionOptions(data?.data, "value", "name"),
    [data?.data]
  );

  const onSelectClassname = (value: any) => {
    setValue("className", value);
  };
  const onSelectSubscription = (value: any) => {
    setValue("subscription", value);
  };

  const handleSuccess = ({ data }: any) => {
    toast.success("Subscription awarded successfully");
    setValue("className", null);
    setValue("subscription", null);
    onComplete();
  };

  const handleError = (error: any) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const {
    mutate: submitAwardRequest,
    isLoading: isAwardSubscriptionInProgress,
  } = useApiPost(awardSubscription, handleSuccess, handleError);

  const onSubmit = (data: any) => {
    if (data.className && data.subscription) {
      submitAwardRequest({
        data: [
          {
            studentClass: data.className.value,
            planId: data.subscription.value,
          },
        ],
        studentId: student?.key,
      } as any);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UtilsHolder>
          <div>
            <Controller
              name="className"
              control={control}
              render={({ field }) => (
                <SelectContainer>
                  <SelectInput
                    {...field}
                    id="className"
                    options={allClasses}
                    onChange={onSelectClassname}
                    defaultValue="Class"
                    // width={200}
                    isLoading={isLoadingClasses}
                  />
                </SelectContainer>
              )}
            />
            <Controller
              name="subscription"
              control={control}
              render={({ field }) => (
                <SelectContainer>
                  <SelectInput
                    {...field}
                    id="subscription"
                    options={allSubscriptions}
                    onChange={onSelectSubscription}
                    defaultValue="Subscription"
                    // width={200}
                    isLoading={isLoading}
                  />
                </SelectContainer>
              )}
            />
          </div>
        </UtilsHolder>
        <br />
        <br />
        <ButtonElement
          isLoading={isAwardSubscriptionInProgress}
          type="submit"
          label={"Add Subscription"}
        />
      </form>
    </div>
  );
};

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const CancelIcon = styled.div`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
`;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: auto;
  align-items: center;
  justify-content: space-between;

  h5 {
    font-size: 0.8rem;
    font-weight: 600;
    color: red;
    transition: all 0.3s ease;
    &:hover {
      cursor: pointer;
      color: white;
      padding: 5px 10px;
      background-color: red;
      text-align: center;
      border-radius: 6px;
    }
  }

  @media ${devices.tabletL} {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;

    input {
      width: fill !important;
    }
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 80%;

    @media ${devices.tabletL} {
      flex-direction: column;
      width: 100%;
    }

    h6 {
      font-size: clamp(1rem, 1vw, 1rem);
      font-weight: 700;
      width: 100%;
    }
  }
  button {
    background-color: var(--primary-color);
    padding: 0.6rem;
    color: white;
    display: flex;
    font-size: 0.8rem;
    outline: none;
    border: none;
    border-radius: 12px;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    cursor: pointer;

    @media ${devices.tabletL} {
      margin-top: 5%;
      width: 100%;
    }
  }
`;

export default ModifyStudentSubscription;

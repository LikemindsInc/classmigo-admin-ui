import { Checkbox } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { SelectInput } from "../../../../../../Ui_elements";
import { useApiPost } from "../../../../../../custom-hooks";
import { updateWeek } from "../../../../../../Urls";
import { generateWeekoptions } from "../../../../../../utils/constants";
import { toast } from "react-toastify";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";

interface Props {
  item: any;
}

const handleSuccess = () => {
  toast.success(`Successfully updated`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
  });
};

const handleError = () => {
  toast.error(`Something went wrong, could not update lesson week`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
  });
};
export const ScheduleCard = ({ item }: Props) => {
  const { mutate: update } = useApiPost(
    (_: any) => updateWeek(_, item?._id),
    handleSuccess,
    handleError,
    ["lessonTopic"]
  );

  return (
    <Container>
      <div>
        <div>
          <h6>{item.lessonName}</h6>
        </div>
        <SelectContainer>
          <SelectInput
            options={generateWeekoptions()}
            onChange={(value: any) => {
              const requestBody: any = {
                week: value?.value,
              };
              update(requestBody);
            }}
            defaultValue={item.lessonWeek || ""}
          />
        </SelectContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: var(--dashboardBackground);
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  padding: 2rem 4rem;

  @media ${devices.tablet} {
    padding: 1rem;
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      gap: 1rem;
      h6 {
        font-weight: 700;
        font-size: 1rem;
      }
    }
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100px;

`;

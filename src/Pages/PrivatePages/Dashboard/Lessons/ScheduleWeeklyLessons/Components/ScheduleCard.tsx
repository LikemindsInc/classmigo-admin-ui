import { Checkbox } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { SelectInput } from "../../../../../../Ui_elements";

export const ScheduleCard = () => {
  return (
    <Container>
      <div>
        <div>
          {/* <Checkbox
            sx={{
              color: "var(--primary-color)",
              "&.Mui-checked": {
                color: "var(--primary-color)",
              },
            }}
          /> */}
          <h6>Trigonometry</h6>
        </div>

        <SelectInput
          options={[]}
          onChange={() => {}}
          defaultValue="Assign Week"
          width={150}
        />
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

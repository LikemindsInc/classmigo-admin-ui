import { DateCalendar } from "@mui/x-date-pickers";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
export const DatePickers = () => {
  return (
    <Container>
      <DateContainer>
        <div>
          <p>From Date</p>
        </div>
        <CustomDateCalendar />
      </DateContainer>

      <DateContainer>
        <div>
          <p>From Date</p>
        </div>
        <CustomDateCalendar />
      </DateContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0px 4px 40px 5px rgba(0, 0, 0, 0.09);
  @media ${devices.tablet} {
    flex-direction: column;
  }
`;

const DateContainer = styled.div`
  width: auto;
  height: inherit;
  > div {
    padding: 0.5rem 1rem;
    border: 1px solid var(--dashboardBackground);
    border-radius: 10px;
    width: fit-content;
    margin-bottom: 9px;

    p {
      font-size: 0.8rem;
    }
  }
`;

const CustomDateCalendar = styled(DateCalendar)`
  .MuiPickersDay-root.Mui-selected {
    position: relative;
    background-color: var(--primary-color) !important;
  }
  .MuiPickersDay-root:hover {
    background-color: #f5e9ff;
  }
  .MuiPickersDay-root.Mui-selected:hover {
    background-color: transparent;
  }
  .css-2bfofy-MuiPickersYear-yearButton.Mui-selected {
    background-color: var(--primary-color) !important;
  }
  .css-2bfofy-MuiPickersYear-yearButton.Mui-selected:hover {
    background-color: #f5e9ff !important;
  }
`;

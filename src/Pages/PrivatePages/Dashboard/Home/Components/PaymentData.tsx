import styled from "styled-components";
import { SelectInput } from "../../../../../Ui_elements";
import { useState } from "react";
import { DatePickers } from "./DataPickers";
import { StatsCard } from "./StatsCard";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";

export const PaymentData = () => {
  const [dateRange, setDateRange] = useState<string>("This week");

  const handleDateChange = (value: string) => {
    setDateRange(value);
  };

  const dateSelectOptions = [
    {
      value: 0,
      label: "Today",
    },
    {
      value: 1,
      label: "This Week",
    },
    {
      value: 2,
      label: "This Month",
    },
    {
      value: 3,
      label: "This Year",
    },
    {
      value: 4,
      label: "All Time",
    },
  ];

  return (
    <Container>
      <Header>
        <h4>Payment Data</h4>
        <SelectInput
          options={dateSelectOptions}
          onChange={handleDateChange}
          defaultValue={dateRange}
        />
      </Header>

      <DataContainer>
        <CalendarContainer>
          <DatePickers />
        </CalendarContainer>
        <StatContainer>
          <StatsCard
            value="20,000"
            description="Student Subscribed"
            stat={true}
            statValue="25%"
          />
          <StatsCard
            value="₦250,000"
            description="Subscription Payment"
            stat={false}
            statValue="-8%"
          />
        </StatContainer>
      </DataContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem 2rem;
  width: 100%;
  background-color: var(--dashboardBackground);
  height: 100%;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 1rem;
  h4 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
const DataContainer = styled.section`
  display: flex;
  gap: 1rem;
  @media ${devices.tablet}{
    flex-direction: column;
  }
`;
const CalendarContainer = styled.div``;

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content:center;
  gap: 1rem;
  width: 100%;
`;

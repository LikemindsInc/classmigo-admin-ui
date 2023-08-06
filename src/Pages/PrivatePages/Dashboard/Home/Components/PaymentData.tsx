import styled from "styled-components";
import {
  BarChart,
  DatePickerInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { useState } from "react";
import { DatePickers } from "./DataPickers";
import { StatsCard } from "./StatsCard";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";

export const PaymentData = () => {
  const [dateRange, setDateRange] = useState<string>("This week");
  const currentDate = new Date();
  const date = currentDate.toDateString();

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

  const chartData = [
    {
      month: "Jan",
      value: 1000,
    },
    {
      month: "Feb",
      value: 1900,
    },
    {
      month: "Mar",
      value: 1200,
    },
    {
      month: "May",
      value: 2500,
    },
    {
      month: "Jun",
      value: 3000,
    },
    {
      month: "Jul",
      value: 4000,
    },
    {
      month: "Aug",
      value: 3200,
    },
    {
      month: "Sep",
      value: 2200,
    },
    {
      month: "Oct",
      value: 1200,
    },

    {
      month: "Nov",
      value: 3400,
    },

    {
      month: "Dec",
      value: 1000,
    },
  ];
  return (
    <Container>
      <Header>
        <h4>Payment Data</h4>
        <SelectContainer>
          {/* <SelectInput
            options={dateSelectOptions}
            onChange={handleDateChange}
            defaultValue={dateRange}
          /> */}
          <DatePickerInput defaultValue={date} label={"From Date"} width={130} />
          <DatePickerInput defaultValue={date} label={"To Date"} width={130} />
          <SelectInput
            options={dateSelectOptions}
            onChange={handleDateChange}
            defaultValue={dateRange}
            width={130}
          />
        </SelectContainer>
      </Header>

      <ChartContainer>
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
        <Chart>
          <BarChart data={chartData} />
        </Chart>
      </ChartContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem 2rem;
  max-width: 100%;
  background-color: var(--dashboardBackground);
  height: 100%;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  width: auto;
  gap: 1.6rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  @media ${devices.tablet} {
    flex-wrap: wrap;
  }
  @media ${devices.laptop} {
    flex-wrap: wrap;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    @media ${devices.tablet} {
      font-size: 1rem;
    }
  }
`;
const ChartContainer = styled.section`
  display: flex;
  flex: 1;
  gap: 1rem;
  @media ${devices.tabletL} {
    flex-direction: column;
    flex-wrap: wrap;
  }
  @media ${devices.laptop} {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const SelectContainer = styled.div`
  display: flex;
  width: auto;
  gap: 3%;
  transition: all .3s ease;
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 5%;
  }
`;
const Chart = styled.div`
  width: 100%;
  height: 100%;
`;

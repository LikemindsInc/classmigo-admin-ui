import styled from "styled-components";
import {
  BarChart,
  DatePickerInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { useState } from "react";
// import { DatePickers } from "./DataPickers";
import { StatsCard } from "./StatsCard";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { PAYMENT_DATES } from "../../../../../utils/constants";

interface PaymentDataProps {
  data: any;
  filter: any;
  isFetching: boolean;
  setFilter: any;
  fetchAction: () => void;
}
export const PaymentData = ({
  data,
  filter,
  setFilter,
  isFetching,
  fetchAction,
}: PaymentDataProps) => {

  const handleDateChange = (value: { value: string; label: number }) => {
    setFilter((item: any) => ({ ...item, period: value?.value }));
    fetchAction();
  };

  return (
    <Container>
      <Header>
        <h4>Payment Data</h4>
        <SelectContainer>
          <SelectInput
            options={PAYMENT_DATES}
            onChange={handleDateChange}
            defaultValue="Payment Date"
            // width={200}
          />
        </SelectContainer>
      </Header>

      <ChartContainer>
        <StatContainer>
          <StatsCard
            value={data?.paymentData?.totalCountStudentSubscribed}
            description="Student Subscribed"
            student={true}
            isFetching={isFetching}
            // stat={true}
            // statValue="25%"
          />
          <StatsCard
            value={data?.paymentData?.totalPayment}
            description="Subscription Payment"
            student={false}
            isFetching={isFetching}
            // stat={false}
            // statValue="-8%"
          />
        </StatContainer>
        <Chart>
          <BarChart data={data?.chart} />
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
  transition: all 0.3s ease;
  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 5%;
  }
`;
const Chart = styled.div`
  width: 100%;
  height: 100%;
`;

import styled from "styled-components";
import { Card } from "./Components/Card";
import { PaymentData } from "./Components/PaymentData";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
const Home = () => {
  return (
    <Container>
      <ScrollCap><p>Top</p></ScrollCap>
      <CardContainer>
        <Card value={"250,000"} description="Students Registered" />
        <Card value={"100,000"} description="Parents Registered" />
        <Card value={"12"} description="Classes Covered" />
        <Card value={"2,000"} description="Videos Uploaded" />
        <Card value={"5000"} description="Quiz Questions Uploaded" />
        <Card value={"1,000"} description="Live Lessons Taken" />
      </CardContainer>

      <div>
        <PaymentData />
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 3.5rem 2.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet}{
    padding: 0 1rem 1rem 1rem;
  }
`;
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  @media ${devices.tablet}{
    margin: 0 !important;
  }
`;

const ScrollCap = styled.div`
  position:sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.2rem;
  background-color: white;
  color: white;
  p{
    display: hidden;
  }

  @media ${devices.tablet}{
    height:0.8rem;
    margin-bottom: 0 !important;
  }

`

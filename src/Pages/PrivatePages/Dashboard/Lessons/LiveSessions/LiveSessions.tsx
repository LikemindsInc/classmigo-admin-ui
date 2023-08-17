import React from "react";
import styled from "styled-components";
import {
  ButtonElement,
  InputElement,
  SelectInput,
} from "../../../../../Ui_elements";
import noData from "../../../../../Assets/noData.png";
import { useNavigate } from "react-router-dom";
import { UpcomingCard } from "./Components/UpomingCard";
import { LiveSessionCard } from "./Components/liveSessionCard";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import zIndex from "@mui/material/styles/zIndex";
const LiveSessions = () => {
  const navigate = useNavigate();

  const sessions = [
    {
      title: "Partial Fractions of Non Linear Factors",
      time: "8:00PM",
      date: "21 Dec",
    },
    {
      title: "Partial Fractions of Non Linear Factors",
      time: "8:00PM",
      date: "21 Dec",
    },
  ];
  return (
    <Container>
      <Body>
        <Upcoming>
          <h4>Upcoming Live Lessons</h4>
          <div>
            {sessions.map((session, index) => (
              <UpcomingCard
                key={index}
                topic={session.title}
                time={session.time}
                date={session.date}
              />
            ))}
          </div>
        </Upcoming>
        <LiveSection>
          <h4>Past Live Lessons</h4>
          <div>
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
            <LiveSessionCard />
          </div>
        </LiveSection>
        {/* <NoData>
          <img src={noData} alt="No data" />
          <p>You don't have any scheduled or previous live lessons.</p>
          <p>Use the schedule live lesson below to schedule a lesson.</p>
          <ButtonElement
            onClick={() => navigate("/live_lessons/schedule_session")}
            width={200}
            label="Schedule Live Lesson"
          />
        </NoData> */}
      </Body>
    </Container>
  );
};

export default LiveSessions;

const Container = styled.div`
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
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const Body = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NoData = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
  button {
    margin-top: 1rem;
  }
`;

const Upcoming = styled.div`
  width: 100%;
  h4 {
    font-size: 1.3rem;
  }
  > div {
    display: flex;
    gap: 5%;
    width: 70%;
    margin-top: 2rem;
  }
`;

const LiveSection = styled.section`
  margin-top: 2rem;
  width: 100%;
  h4 {
    font-size: 1.3rem;
  }
  > div {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

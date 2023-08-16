import React from "react";
import styled from "styled-components";

const Participant = () => {
  return (
    <ParticipantContainer>
      <ParticipantDetails>
        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        <p>Omotolani Adeoye</p>
      </ParticipantDetails>
      <ParticipantMessage>
        Hello ma, I didnt quite understand that part you just explained
      </ParticipantMessage>
    </ParticipantContainer>
  );
};

const Instructor = () => {
  return (
    <ParticipantContainer>
      <ParticipantDetails>
        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
        <p>Instructor</p>
      </ParticipantDetails>
      <InstructorMessage>Have a great day guys!!!</InstructorMessage>
    </ParticipantContainer>
  );
};

export const LiveChat = () => {
  return (
    <Container>
      <Participant />
      <Instructor />
    </Container>
  );
};

const Container = styled.div``;

const ParticipantContainer = styled.div`
  margin: 1rem 0;
`;
const ParticipantMessage = styled.div`
  background-color: var(--dashboardBackground);
  font-size: 0.8rem;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 10px;
  width: fit-content;
  margin-left: 30px;
`;

const ParticipantDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-size: 0.8rem;
    color: #717171;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const InstructorMessage = styled(ParticipantMessage)`
  background-color: var(--hover-color);
`;

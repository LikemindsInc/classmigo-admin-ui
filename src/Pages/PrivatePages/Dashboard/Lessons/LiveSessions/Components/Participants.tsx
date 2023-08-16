import React from "react";
import styled from "styled-components";

const Participant = () => {
  return (
    <ParticipantContainer>
      <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
      <p>John Chukwuemmeka</p>
    </ParticipantContainer>
  );
};
export const Participants = () => {
  return (
    <Container>
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
    </Container>
  );
};

const Container = styled.div`
  /* overflow-y: scroll; */
  width:100%;
  height:500px;
`;

const ParticipantContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

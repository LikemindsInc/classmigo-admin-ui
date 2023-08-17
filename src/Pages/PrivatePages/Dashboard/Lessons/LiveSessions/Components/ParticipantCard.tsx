import React from "react";
import styled from "styled-components";

export const ParticipantCard = () => {
  return (
    <Container>
      <p>Kemi Joseph</p>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 13rem;
  height: 13rem;
  background: url("https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.webp?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0="),
    lightgray 50% / cover no-repeat;
  flex-shrink: 0;
  background-size: cover;
  border-radius: 5px;
  p {
    color: white;
    position: absolute;
    font-weight: 600;
    bottom: 0;
    left: 0;
  }
`;

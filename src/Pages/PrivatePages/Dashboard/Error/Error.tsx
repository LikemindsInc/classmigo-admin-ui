import React from "react";
import styled from "styled-components";
import { ButtonElement } from "../../../../Ui_elements";
import error from "../../../../Assets/Error_404.png";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
import { useIsOnline } from "../../../../custom-hooks";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const isOnline = useIsOnline();
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <img src={error} alt="error" />
        <h3>Oops! Something went wrong</h3>
        <p>
          {isOnline
            ? "You have either clicked a bad link or the URL you entered is incorrect."
            : "You are offline. Please connect to the Internet."}
        </p>
        {isOnline ? (
          <ButtonElement label="Go Home" onClick={() => navigate("/")} />
        ) : null}
      </div>
    </Container>
  );
};

export default Error;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  button {
    width: 200px;
    margin: 0 auto;
  }

  img {
    @media ${devices.tabletL} {
      width: 12rem;
      height: 12rem;
      object-fit: contain;
    }
  }
  h3 {
    font-size: 2rem;
    @media ${devices.tabletL} {
      font-size: 1.2rem;
    }
  }
  h3,
  p {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonElement } from "../../../../../../Ui_elements";

interface Props {
  topic: string;
  time?: string;
  date?: string;
  item:any
}
export const UpcomingCard = ({ topic, time="5:00", date="25 Dec", item }: Props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Details>
        <img
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="hi"
        />
        <div>
          <h6>{topic}</h6>
          <Time>
            <p>{date}</p>
            <p>{time}</p>
          </Time>
          <Start>
            <p>Starts in 5 Days</p>
            <ButtonElement outline={true} label="Edit" />
          </Start>
        </div>
      </Details>
      <ButtonElement
        label="Join"
        onClick={() => navigate(`/live_lessons/${topic}`, {
          state: {
          item:item
        }})}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 1rem;

  > button {
    margin-top: 1.5rem;
  }
`;

const Details = styled.div`
  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
  }
  > div {
    h6 {
      font-size: 0.9rem;
      font-weight: 700;
    }
  }
  display: flex;
  gap: 10px;
`;

const Time = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: #585858;
  }
`;
const Start = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 0.8rem;
    color: var(--primary-color);
    font-weight: 700;
  }
  button {
    width: 50px;
    font-size: 0.8rem;
    padding: 5px !important;
  }
`;

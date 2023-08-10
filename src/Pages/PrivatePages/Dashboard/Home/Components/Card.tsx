import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { useEffect, useState } from "react";

interface CardProps {
  value: string;
  description: string;
}
export const Card = ({ value, description }: CardProps) => {
  const [newDescription, setNewDescription] = useState<any>("");

  useEffect(() => {
    if (description === "studentCount") {
      setNewDescription("Students Registered");
    }
    if (description === "parentCount") {
      setNewDescription("Parents Registered");
    }
    if (description === "classesCount") {
      setNewDescription("Classes Covered");
    }
    if (description === "videoCount") {
      setNewDescription("Videos Uploaded");
    }
    if (description === "quizCount") {
      setNewDescription("Quiz Questions Uploaded");
    }
  }, [description]);

  return (
    <Container>
      <h3>{value}</h3>
      <p>{newDescription}</p>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: clamp(5rem, 50vh, 10rem);
  background: var(--dashboardBackground);
  padding-left: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 12px;
  transition: all ease 0.3s;
  @media ${devices.tabletL} {
    width: 100%;
    padding: 0.4rem;
  }
  &:hover {
    p,
    h3 {
      color: white;
      transition: all ease 0.3s;
    }
    background: var(--primary-color);
  }

  h3 {
    font-size: clamp(2rem, 3vw, 3rem);
    font-weight: 700;
  }
  p {
    font-size: clamp(0.8rem, 1vw, 0.9rem);
  }
`;

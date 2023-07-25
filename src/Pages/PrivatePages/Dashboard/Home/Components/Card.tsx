import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";

interface CardProps {
  value: string;
  description: string;
}
export const Card = ({ value, description }: CardProps) => {
  return (
    <Container>
      <h3>{value}</h3>
      <p>{description}</p>
    </Container>
  );
};

const Container = styled.div`
  width: clamp(10rem, 50vw, 23rem);
  height: clamp(5rem, 50vh, 10rem);
  background: var(--dashboardBackground);
  padding-left: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 12px;
  transition: all ease 0.3s;
  @media ${devices.tablet} {
    width: 100%;
  }
  &:hover {
    p,
    h3 {
      color: white;
    }
    background: var(--primary-color);
  }

  h3 {
    font-size: clamp(1.2rem, 30vw, 3rem);
    font-weight: 700;
  }
  p {
    font-size: clamp(0.8rem, 30vw, 0.9rem);
  }
`;

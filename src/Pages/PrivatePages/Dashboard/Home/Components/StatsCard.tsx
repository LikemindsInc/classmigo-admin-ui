import styled from "styled-components";
import { GreenIcon, RedIcon } from "../../../../../Assets/Svgs";

interface CardProps {
  value: string;
  description: string;
  stat: boolean;
  statValue: string;
}
export const StatsCard = ({
  value,
  description,
  stat,
  statValue,
}: CardProps) => {
  return (
    <Container>
      <StatHolder>
        {stat ? (
          <IconHolder>
            <GreenIcon />
            <p>{statValue}</p>
          </IconHolder>
        ) : (
          <IconHolder>
            <RedIcon />
            <p>{statValue}</p>
          </IconHolder>
        )}
      </StatHolder>
      <DetailHolder>
        <h3>{value}</h3>
        <p>{description}</p>
      </DetailHolder>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 12px;
  width: 100%;
  padding: 2rem;
  transition: all ease 0.3s;
  background-color: white;
  transition: all ease 0.3s;
  &:hover {
    p,
    h3 {
      color: white;
    }
    background: var(--primary-color);
  }
`;

const IconHolder = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 0.8rem;
    font-weight: 400;
  }
`;

const DetailHolder = styled.div`
  h3 {
    font-size: clamp(1.2rem, 2.5vw, 3rem);
    font-weight: 700;
  }
  p {
    font-size: clamp(0.8rem, 0.5vw, 0.9rem);
  }
`;

const StatHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;

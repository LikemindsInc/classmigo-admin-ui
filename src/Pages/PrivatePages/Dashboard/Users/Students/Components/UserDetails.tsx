import { Avatar } from "@mui/material";
import styled from "styled-components";

export const UserDetails = ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  return (
    <Container>
      <Avatar
        sx={{
          backgroundColor: "var(--hover-color)",
          color: "black",
        }}
        alt={`${name}`}
      />
      <h4>{name}</h4>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

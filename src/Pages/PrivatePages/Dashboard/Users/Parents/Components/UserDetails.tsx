import styled from "styled-components";

export const UserDetails = ({
  name,
}: {
  name: string;
}) => {
  return (
    <Container>
      <h4>{name}</h4>
    </Container>
  );
};

const Container = styled.div`
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

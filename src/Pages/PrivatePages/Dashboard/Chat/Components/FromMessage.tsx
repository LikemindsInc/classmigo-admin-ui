import styled from "styled-components";

export const FromMessage = ({ children }: any) => {
  return (
    <Container>
      <MessageBox>
        <p>{children}</p>
      </MessageBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const MessageBox = styled.div`
  padding: 2%;
  max-width: 20rem;
  background-color: #F5E9FF;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  
  p {
    font-size: 0.9rem;
    font-weight: 500;
  }

`;

import styled from "styled-components";
import { ToMessage } from "./ToMessage";
import { FromMessage } from "./FromMessage";

export const MessageSection = ({ messages }: any) => {
  return (
    <Container>
      {messages.map((message: any, index: number) =>
        message.to ? (
          <ToMessage key={index}>{message?.message}</ToMessage>
        ) : message.from ? (
          <FromMessage key={index}>{message?.message}</FromMessage>
        ) : null
      )}
    </Container>
  );
};
const Container = styled.div`
  height: auto;
  width: 100%;
`;

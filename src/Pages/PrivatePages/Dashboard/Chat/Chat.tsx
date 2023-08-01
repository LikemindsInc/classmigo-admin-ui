import { useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
import { useLocation } from "react-router-dom";
import {
  AudioPlayer,
  ButtonElement,
  TextAreaElement,
} from "../../../../Ui_elements";
import { Divider } from "antd";
import { MessageSection } from "./Components/MessageSection";

const Chat = () => {
  const { state } = useLocation();
  const { author, message, audioUrl, questionImage, topic } = state;
  const [respond, setRespond] = useState(false);
  const [messages, setMessages] = useState([
    {
      to: true,
      from: false,
      message:
        "There's and easy method you can use to solve this, just give me a call",
    },
    {
      to: false,
      from: true,
      message:
        "There's and easy method you can use to solve this, just give me a call",
    },
  ]);

  const handleSubmitMessage = (message: string) => {
    console.log("AHHHH!!!");
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        to: false,
        from: true,
        message: message,
      },
    ]);
  };

  return (
    <Container>
      <MessagesContainer>
        <InitialQuestion>
          <Header>
            <h5>{topic}</h5>
          </Header>
          <User>
            <h5>Posted by</h5>
            <img
              src="https://image.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg"
              alt=""
            />
            <h5>{author}</h5>
          </User>
          <Divider />
          <Content>
            <p>{message}</p>
            {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
            {questionImage && <img src={questionImage} alt="question" />}
          </Content>
        </InitialQuestion>
        <MessageSection messages={messages} />
      </MessagesContainer>

      {respond ? null : (
        <ButtonElement
          onClick={() => setRespond(true)}
          label={"Add Reply +"}
          width={150}
        />
      )}

      {respond && (
        <Messenger>
          <TextAreaElement
            messages={messages}
            wordCount={200}
            label="Submit a reply"
            onSend={handleSubmitMessage}
          />
        </Messenger>
      )}
    </Container>
  );
};

export default Chat;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 5% 10% !important;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1%;
  h5 {
    font-size: 1rem;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Content = styled.div`
  width: 100%;
  img {
    width: 25rem;
    height: 25rem;
    object-fit: contain;
    margin-top: 5%;
  }
  p {
    font-size: 1rem;
  }
`;

const InitialQuestion = styled.div`
  margin-bottom: 5%;
`;

const Messenger = styled.div`
  justify-self: flex-end;
  width: 100%;
`;

const MessagesContainer = styled.div``;

const Header = styled.div`
    margin-bottom: 2rem;
    h5{
        color: var(--primary-color);
    }
`;

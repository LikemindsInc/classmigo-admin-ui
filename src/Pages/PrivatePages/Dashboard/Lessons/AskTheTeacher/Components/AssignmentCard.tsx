import styled from "styled-components";
import { AudioPlayer } from "../../../../../../Ui_elements";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface AssignmentProps {
  image?: string;
  author: string;
  message: string;
  audioUrl?: any;
  questionImage?: string;
  read: boolean;
  topic: string;
}
export const AssignmentCard = ({
  image,
  author,
  message,
  audioUrl,
  questionImage,
  read,
  topic,
}: AssignmentProps) => {
  const navigate = useNavigate();

  const state = {
    author: author,
    message: message,
    audioUrl: audioUrl,
    questionImage: questionImage,
    topic: topic,
  };

  const [expand, setExpand] = useState(false);

  const handleDropDown = () => {
    setExpand(!expand);
  };

  return (
    <Container>
      <Header>
        <h5>{topic}</h5>
        {read ? null : <Unread />}
      </Header>
      <Message
        onClick={() => navigate(`${topic}/discussion`, { state: { ...state } })}
      >
        <p>{message}</p>
      </Message>
      <Content
        expand={expand}
        onClick={() => navigate(`${topic}/discussion`, { state: { ...state } })}
      >
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
        {questionImage && <img src={questionImage} alt="question" />}
      </Content>
      <Divider />
      <Footer expand={expand}>
        <User>
          <h5>Posted by</h5>
          <img
            src="https://image.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg"
            alt=""
          />
          <h5>{author}</h5>
        </User>
        <button onClick={handleDropDown}>⤵</button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  /* border: 1.2px solid darkgray; */
  border-radius: 12px;
  padding: 1rem 2rem;
  margin-bottom: 4rem;
  background-color: var(--dashboardBackground);
  transition: all ease 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #eaeaea;
    box-shadow: 2px 6px 8px -1px rgba(0, 0, 0, 0.14);
    -webkit-box-shadow: 2px 6px 8px -1px rgba(0, 0, 0, 0.14);
    -moz-box-shadow: 2px 6px 8px -1px rgba(0, 0, 0, 0.14);
  }
`;
const Unread = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--primary-color);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
  h5 {
    font-size: 0.8rem;
    color: var(--primary-color);
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h5 {
    font-size: 0.8rem;
  }
  img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Content = styled.div<{ expand: boolean }>`
  display: ${({ expand }) => (expand ? "block" : "none")};
  height: ${({ expand }) => (expand ? "100%" : "0%")};

  img {
    width: 30rem;
    height: 30rem;
    object-fit: contain;
    margin-top: 5%;
  }
`;

const Footer = styled.div<{ expand: boolean }>`
  display: flex;
  justify-content: space-between;
  p {
    font-weight: 800 !important;
    font-size: 1rem;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    outline: none;
    border-radius: 50%;
    transition: all 0.3s ease;
    transform: ${({ expand }) =>
      expand ? "rotate(180deg) scaleX(-1)" : "none"};
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Message = styled.div`
  p {
    font-size: 0.8rem;
  }
`;

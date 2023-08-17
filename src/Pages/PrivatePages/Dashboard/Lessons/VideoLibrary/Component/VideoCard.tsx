import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PlayVideoIcon } from "../../../../../../Assets/Svgs";
import { devices } from '../../../../../../utils/mediaQueryBreakPoints';

type VideoProps = {
  title?: string;
  index?: number;
};
export const VideoCard = ({ title, index }: VideoProps) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() =>
        navigate(`/video_library/${title}`, {
          state: {
            title: title,
            index: index,
          },
        })
      }
    >
      <MainContent>
        <PlayVideoIcon />
      </MainContent>
      <TopicContainer>
        <p>
          {index && `0${index + 1}.`} {title}
        </p>
      </TopicContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 20vw;
  height: 20vh;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 1px 3px 5px -1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 3px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 3px 5px -1px rgba(0, 0, 0, 0.1);

  @media ${devices.tabletL}{
    width:15rem;
  }
`;

const TopicContainer = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 0px 0px 12px 12px;
  background-color: white;
  padding: 1rem 2rem;
  p {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 12px 12px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PlayVideoIcon } from "../../../../../../Assets/Svgs";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { VideoPlayerElement } from "../../../../../../Ui_elements";

type VideoProps = {
  title?: string;
  index?: number;
  link?: any;
};
export const LiveSessionCard = ({ title, index, link }: VideoProps) => {
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
        <VideoPlayerElement source={link} />
      </MainContent>
      <TopicContainer>
        <p>{title}</p>
        <div>
          <p>21 Dec </p>
          <p>8:00PM</p>
        </div>
      </TopicContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 20vw;
  max-height: 29vh;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: column !important;
  justify-content: space-between;
  margin-bottom: 2rem;
  box-shadow: 1px 3px 5px -1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 1px 3px 5px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 3px 5px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }

  @media ${devices.tabletL} {
    width: 15rem;
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
  > div {
    margin-top: 0.4rem;
    display: flex;
    gap: 10px;
    align-items: center;
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

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PlayVideoIcon } from "../../../../../../Assets/Svgs";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { Tag, VideoPlayerElement } from "../../../../../../Ui_elements";
import { useFormattedDateTime } from "../../../../../../custom-hooks";
import dayjs from "dayjs";

type VideoProps = {
  title?: string;
  index?: number;
  link?: any;
  item?: any;
};
export const LiveSessionCard = ({ title, index, link, item }: VideoProps) => {
  const newTimeFormat = useFormattedDateTime(item?.date);


  return (
    <Container>
      <MainContent>
        <VideoPlayerElement source={link} />
      </MainContent>
      <TopicContainer>
        <div>
          <strong>{title}</strong>
          <TimeDetails>
            <p>{newTimeFormat?.formattedDate}</p>
            <p>{newTimeFormat?.formattedTime}</p>
          </TimeDetails>
        </div>
        <Tag>{item?.subject}</Tag>
      </TopicContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 22vw;
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
  height: 70px;
  border-radius: 0px 0px 12px 12px;
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  strong {
    font-size: 1rem;
  }
  p {
    font-size: 0.7rem;
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

const TimeDetails = styled.div`
  margin-top: 0.4rem;
  display: flex;
  gap: 10px;
  align-items: center;
`;

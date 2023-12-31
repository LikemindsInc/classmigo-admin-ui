import styled from "styled-components";
import { VideoPlayerElement } from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";

type VideoProps = {
    title?: string;
    index?: number;
    source?: string;
    details?:any
  };
  export const AddVideoCard = ({ title, index, source, details }: VideoProps) => {
    return (
      <Container>
        <MainContent>
          {/* <PlayVideoIcon /> */}
          <VideoPlayerElement source={"https://www.youtube.com/watch?v=sF9xYtouZjY&t=1s"} />
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
    width: 23vw;
    height: fit-content;
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
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
      height: 100%;
    }
  `;
  
  const MainContent = styled.div`
    width: 100%;
    height: fit-content;
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
  
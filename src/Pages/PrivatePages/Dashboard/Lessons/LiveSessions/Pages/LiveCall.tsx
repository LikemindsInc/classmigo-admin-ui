import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ArtBoardIcon,
  EndIcon,
  MicIcon,
  ShareIcon,
  VideosIcon,
} from "../../../../../../Assets/Svgs";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { LiveChat } from "../Components/Chat";
import { ParticipantCard } from "../Components/ParticipantCard";
import { VideoPlayerElement } from "../../../../../../Ui_elements";
import { useLocation } from "react-router-dom";

const LiveCall = () => {
  const [active, setActive] = useState(1);
  const [stream, setStream] = useState<any>(null);
  const teacher = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { state } = useLocation();

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: true,
  //       audio: true,
  //     })
  //     .then((stream) => {
  //       setStream(stream);
  //       if (teacher.current) {
  //         teacher.current.srcObject = stream;
  //       }
  //     })
  //     .catch((e) => console.log(alert(e)));
  // }, []);

  // useEffect(() => {
  //   const handleUnload = (e: any) => {
  //     if (stream) {
  //       stream.getTracks().forEach((track: any) => track.stop());
  //       setStream(null);
  //     }
  //     e.returnValue = "Are you sure you want to leave?";
  //   };

  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, [stream]);

  const toggleCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track: any) => {
        track.enabled = !track.enabled;
      });
    }
  };
  const toggleMute = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioTrack = audioTracks[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };
  return (
    <Container>
      <VideoLayout>
        <VideoSection>
          {/* {stream && (
            <InstructorVideo
              ref={teacher}
              muted={isMuted}
              autoPlay
              playsInline
            />
          )} */}
          <VideoPlayerElement source={state.item.liveUrl} height="50vh" />
          {/* <ToolBox>
            <ToolCircle onClick={toggleMute}>
              <i>
                <MicIcon />
              </i>
            </ToolCircle>
            <ToolCircle>
              <i>
                <VideosIcon onClick={toggleCamera} />
              </i>
            </ToolCircle>
            <ToolCircle>
              <i>
                <ShareIcon />
              </i>
            </ToolCircle>
            <ToolCircle>
              <i>
                <ArtBoardIcon />
              </i>
            </ToolCircle>
            <ToolCircle>
              <i>
                <EndIcon />
              </i>
            </ToolCircle>
          </ToolBox> */}
        </VideoSection>
        <Participants>
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
          <ParticipantCard />
        </Participants>
      </VideoLayout>
      <Messages>
        <Navigator>
          <MenuItem onClick={() => setActive(0)}>Chat</MenuItem>
          <MenuItem onClick={() => setActive(1)}>Participants</MenuItem>
        </Navigator>
        {active === 0 && <LiveChat />}
        {active === 1 && <Participants />}
      </Messages>
    </Container>
  );
};

export default LiveCall;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  gap: 10px;
  overflow-y: scroll;
  position: relative !important;
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;
const Messages = styled.aside`
  background-color: white;
  padding: 1rem;
  flex: 0.3;
`;
const MenuItem = styled.div`
  text-align: center;
  padding: 10px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dashboardBackground);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 3px;
  cursor: pointer;
`;
const Navigator = styled.nav`
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 0.3rem;
  display: flex;
  gap: 10px;
`;
const InstructorVideo = styled.video`
  height: 100%;
  border-radius: 5px;
  width: 100% !important;
`;

const Participants = styled.section`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  width: auto;
  margin-top: 2rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: gray lightgray;
`;

const VideoLayout = styled.main`
  flex: 0.7;
  max-width: 70%;
  background-color: white;
  padding: 0.5rem;
  position: relative;
  flex-direction: column;
  overflow-y: scroll;
`;
const ToolBox = styled.div`
  display: flex;
  width: fit-content;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  gap: 1rem;
`;
const ToolCircle = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--hover-color);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const VideoSection = styled.section`
  position: relative;
  height: 50vh;
  width: 100%;
`;

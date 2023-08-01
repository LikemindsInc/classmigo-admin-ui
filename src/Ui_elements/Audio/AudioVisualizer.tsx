import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import { PauseIcon, PlayIcon } from "../../Assets/Svgs";

interface AudioPlayerProps {
  audioUrl: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "gray",
      progressColor: "var(--primary-color)",
      barWidth: 4,
      barRadius: 12,
      height: 30,
      url: audioUrl,
    });

    waveSurferRef.current = wavesurfer;

    wavesurfer.once("interaction", () => {
      wavesurfer.play();
    });

    const updateTime = () => {
      setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
    };

    wavesurfer.on("audioprocess", updateTime);

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (waveSurferRef.current) {
      const handlePlayPause = () => {
        setIsPlaying(waveSurferRef.current!.isPlaying());
      };

      waveSurferRef.current.on("play", handlePlayPause);
      waveSurferRef.current.on("pause", handlePlayPause);

      return () => {
        waveSurferRef.current!.un("play", handlePlayPause);
        waveSurferRef.current!.un("pause", handlePlayPause);
      };
    }
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const onPlayClick = () => {
    if (waveSurferRef.current) {
      if (waveSurferRef.current.isPlaying()) {
        waveSurferRef.current.pause();
      } else {
        waveSurferRef.current.play();
      }
      setIsPlaying(waveSurferRef.current.isPlaying());
    }
  };

  return (
    <Container>
      <Controls>
        {isPlaying ? (
          <PauseIcon onClick={onPlayClick} style={{ fontSize: "20px", cursor: "pointer" }} />
        ) : (
          <PlayIcon onClick={onPlayClick} style={{ fontSize: "20px", cursor: "pointer" }} />
        )}
      </Controls>
      <div ref={containerRef} className="wavesurfer-element" style={{ flex: 1 }} />
      <p>{currentTime}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  margin-top: 5%;
  background-color: white;
  padding: 2%;
  border-radius: 12px;
`;

const Controls = styled.div`
  margin-right: 1rem;
`;

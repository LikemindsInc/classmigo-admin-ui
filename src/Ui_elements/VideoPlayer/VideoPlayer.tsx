import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

interface Props {
  source: string;
  height?: string;
}
export const VideoPlayerElement = ({ source, height }: Props) => {
  return (
    <ReactPlayer
      url={source}
      controls={true}
      width="100%"
      style={{
        borderRadius: "12px",
      }}
      height={height || "250"}
      pip={true}
      stopOnUnmount={false}
    />
  );
};

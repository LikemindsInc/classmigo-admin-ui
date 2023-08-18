import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

interface Props {
  source: string;
}
export const VideoPlayerElement = ({ source }: Props) => {
  return (
    <div>
      <ReactPlayer
        url={source}
        controls={true}
        width="100%"
        height="300"
        pip={true}
        stopOnUnmount={false}
      />
    </div>
  );
};

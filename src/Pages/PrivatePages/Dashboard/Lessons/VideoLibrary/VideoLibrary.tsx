import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { ButtonElement, Loader, SelectInput } from "../../../../../Ui_elements";
import { VideoCard } from "./Component/VideoCard";
import { useEffect, useState } from "react";
import { useApiGet } from "../../../../../custom-hooks";
import { getLessonVideosUrl } from "../../../../../Urls";
import { Skeleton } from "@mui/material";

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const handleSearchFilter = (value: string) => {};

  const classOptions = [
    {
      value: 0,
      label: "SSS 1",
    },
    {
      value: 1,
      label: "SSS 2",
    },
    {
      value: 2,
      label: "SSS 3",
    },
  ];

  const subjectOptions = [
    {
      value: 0,
      label: "Mathematics",
    },
    {
      value: 1,
      label: "Chemistry",
    },
    {
      value: 2,
      label: "Biology",
    },
    {
      value: 3,
      label: "Physics",
    },
    {
      value: 4,
      label: "English",
    },
    {
      value: 5,
      label: "Government",
    },
    {
      value: 6,
      label: "Economics",
    },
  ];

  const topicOptions = [
    {
      value: 0,
      label: "Surds",
    },
    {
      value: 1,
      label: "Matrices and Determinants",
    },
    {
      value: 2,
      label: "Logarithms",
    },
    {
      value: 3,
      label: "Geometry",
    },
  ];

  const { data: video } = useApiGet(["video"], () => getLessonVideosUrl(), {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (video) {
      setVideos(video?.data?.content);
    }
  }, [video]);

  return (
    <Container>
      <Header>
        <SelectInput
          options={classOptions}
          onChange={handleSearchFilter}
          defaultValue="Subject Class"
          width={200}
        />
        <SelectInput
          options={subjectOptions}
          onChange={handleSearchFilter}
          defaultValue="Select Subject"
          width={200}
        />
        <SelectInput
          options={classOptions}
          onChange={handleSearchFilter}
          defaultValue="Select Topic"
          width={200}
        />
        <ButtonElement label="View Video Lessons" />
      </Header>
      <VideosHolder>
        {videos ? (
          videos?.map((item: any, index: number) => (
            <VideoCard title={item?.title} index={index} key={index} />
          ))
        ) : (
          <Loader />
        )}
      </VideosHolder>
    </Container>
  );
};

export default VideoLibrary;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1%;
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
  @media ${devices.tabletL} {
    gap: 4%;
   
  }
`;

const VideosHolder = styled.section`
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  gap: 1rem;
`;

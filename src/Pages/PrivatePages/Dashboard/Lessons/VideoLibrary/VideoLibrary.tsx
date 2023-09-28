import styled from "styled-components";
import React from "react";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  Loader,
  SelectInput,
  Spinner,
} from "../../../../../Ui_elements";
import { VideoCard } from "./Component/VideoCard";
import { useEffect, useMemo, useState } from "react";
import { useApiGet } from "../../../../../custom-hooks";
import {
  getAllClassesUrl,
  getAllLessonsUrl,
  getAllSubjectsUrl,
  getAllVideosUrl,
} from "../../../../../Urls";
import { formatOptions } from "../../../../../utils/utilFns";
import { Controller, useForm } from "react-hook-form";
import noData from "../../../../../Assets/noData.png";
import { MenuItem } from "@mui/material";

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  const { handleSubmit, watch, control, setValue } = useForm({});

  let classValue = watch("class");
  let subjectValue = watch("subject");
  let topicValue = watch("topic");

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const {
    data: allVideos,
    isFetching: isFetchingVideos,
    refetch: getAllVideos,
  } = useApiGet(["videos"], () => getAllVideosUrl(topicValue?.value), {
    refetchOnWindowFocus: false,
    enabled: false,
    cacheTime: 0,
    keepPreviousData: false,
  });

  const {
    data: classes,
    isLoading: isLoadingClasses,
    isFetching: isFetchingClasses,
  } = useApiGet(["allClasses"], () => getAllClassesUrl(), {
    refetchOnWindowFocus: false,
    enabled: true,
  });
  const {
    data: subjects,
    // isLoading: isLoadingSubjects,
    isFetching: isFetchingSubjects,
    refetch: fetchSubject,
  } = useApiGet(["allSubjects"], () => getAllSubjectsUrl(classValue?.value), {
    refetchOnWindowFocus: false,
    enabled: !!classValue,
  });
  const {
    data: topics,
    // isLoading: isLoadingTopics,
    isFetching: isFetchingTopics,
    refetch: fetchTopic,
  } = useApiGet(["allTopics"], () => getAllLessonsUrl(subjectValue?.value), {
    refetchOnWindowFocus: false,
    enabled: !!subjectValue,
  });

  useEffect(() => {
    if (classValue) {
      fetchSubject();
    }
  }, [classValue, fetchSubject]);

  useEffect(() => {
    if (subjectValue) {
      setValue("topic", "");
      fetchTopic();
    }
  }, [fetchTopic, setValue, subjectValue]);

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);
  const activeSubjects = subjects?.data?.subjects.filter(
    (item: any) => item.isActive
  );
  const activeTopics = topics?.data?.content.filter(
    (item: any) => item.isActive
  );

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(activeSubjects, "name", "name");
  }, [activeSubjects]);

  const allTopics = useMemo(() => {
    return formatOptions(activeTopics, "lessonName", "_id");
  }, [activeTopics]);

  useEffect(() => {
    if (allVideos) {
      setVideos(allVideos?.data?.content);
    }
  }, [allVideos, videos]);

  const onSubmit = () => {
    getAllVideos();
  };

  if (isLoadingClasses) {
    return <Loader />;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  options={allClasses}
                  value={classValue}
                  defaultValue="Select Class"
                  isLoading={isLoadingClasses || isFetchingClasses}
                />
              </SelectContainer>
            )}
          />

          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  options={allSubjects}
                  defaultValue="Select Subject"
                  isLoading={isFetchingSubjects}
                />
              </SelectContainer>
            )}
          />

          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  value={topicValue}
                  options={allTopics}
                  defaultValue="Select Topic"
                  isLoading={isFetchingTopics}
                />
              </SelectContainer>
            )}
          />

          <ButtonElement
            label="View Video Lessons"
            type="submit"
            isLoading={isFetchingVideos}
          />
        </Header>
      </form>
      {videos?.length > 0 ? (
        <VideoIntro>
          {/* <Banner>
            <VideoPlayerElement
              height="100%"
              source={"https://www.youtube.com/watch?v=ImEr7Paglb0"}
            />
            <section>
              <h6>{topicValue?.label}</h6>

              <p id="basic-button" onClick={() => console.log("clicked")}>
                Replace Video
              </p>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Item onClick={() => null}>Edit</Item>
              </Menu>
            </section>

            <h4>Description</h4>
            <p>Topic Description</p>
          </Banner> */}
          <h5>Subtopic Videos</h5>
          <VideosHolder>
            {videos ? (
              videos?.map((item: any, index: number) => (
                <VideoCard
                  title={item?.title}
                  index={index}
                  key={index}
                  source={item?.videoUrl}
                  details={item}
                  classValue={classValue}
                />
              ))
            ) : (
              <Spinner color="var(--primary-color)" />
            )}
          </VideosHolder>
        </VideoIntro>
      ) : (
        <NoData>
          <img src={noData} alt="No data" />
          <p>You haven’t selected any videos yet.</p>
          <p>
            Select the class and subject categories, and use the view video
            lessons button to view videos.
          </p>
        </NoData>
      )}
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
  gap: 1%;
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 10vw !important;
  }

  @media ${devices.tabletL} {
    gap: 4%;
    flex-wrap: wrap;
    input {
      width: 100%;
    }
    button {
      width: 100% !important;
    }
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const VideosHolder = styled.section`
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  flex-wrap: wrap; */
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  gap: 1rem;
`;
const NoData = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
`;

const VideoIntro = styled.div`
  h5 {
    font-size: 2rem;
    margin: 1.5rem 0;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 40vh;
  margin-bottom: 20%;
  position: relative;

  h4 {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  & > section {
    position: absolute;
    width: fit-content;
    bottom: 20%;
    left: 2%;
    display: flex;
    align-items: center;
    gap: 20px;
    opacity: 0;
    position: relative;
    z-index: 3;
    transition: all 0.7s ease;
    p {
      color: white;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border: 1px solid white;
      border-radius: 8px;
      transition: all 0.4s ease;

      &:hover {
        background-color: white;
        color: black;
        cursor: pointer;
      }
    }
    h6 {
      color: white;
      font-size: 3rem;
      z-index: 4;
    }
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.3s ease-in;
  }

  &:hover {
    &::after {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.6) 30%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    & > section {
      opacity: 1;
      transform: translateY(-5px);
    }
  }
`;

const Item = styled(MenuItem)`
  font-size: 0.8rem;
  font-weight: 700;
`;

import styled from "styled-components";
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

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);

  const { handleSubmit, watch, control } = useForm({});

  const classValue = watch("class");
  const subjectValue = watch("subject");

  const {
    data: allVideos,
    isFetching: isFetchingVideos,
    refetch: getAllVideos,
  } = useApiGet(["videos"], () => getAllVideosUrl(classValue?.value), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  const { data: subjects, isLoading: isLoadingSubjects } = useApiGet(
    ["allSubjects"],
    () => getAllSubjectsUrl(classValue?.value),
    {
      refetchOnWindowFocus: false,
      enabled: !!classValue,
    }
  );
  const { data: topics, isLoading: isLoadingTopics } = useApiGet(
    ["allTopics"],
    () => getAllLessonsUrl(subjectValue?.value),
    {
      refetchOnWindowFocus: false,
      enabled: !!subjectValue,
    }
  );

  const allClasses = useMemo(
    () => formatOptions(classes?.data, "value", "name"),
    [classes?.data]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(subjects?.data?.subjects, "name", "name");
  }, [subjects?.data]);

  const allTopics = useMemo(() => {
    return formatOptions(topics?.data?.content, "lessonName", "lessonName");
  }, [topics?.data]);

  useEffect(() => {
    if (allVideos) {
      setVideos(allVideos?.data?.content);
    }
  }, [allVideos, videos]);

  const onSubmit = (data: any) => {
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
              <SelectInput
                {...field}
                options={allClasses}
                value={classValue}
                defaultValue="Subject Class"
                width={200}
              />
            )}
          />

          {classValue && isLoadingSubjects ? (
            <Spinner color={"var(--primary-color)"} />
          ) : (
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={allSubjects}
                  defaultValue="Subject Subject"
                  width={200}
                />
              )}
            />
          )}

          {subjectValue && isLoadingTopics ? (
            <Spinner color={"var(--primary-color)"} />
          ) : (
            <Controller
              name="topic"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={allTopics}
                  defaultValue="Subject Topic"
                  width={200}
                />
              )}
            />
          )}

          <ButtonElement
            label="View Video Lessons"
            type="submit"
            isLoading={isFetchingVideos}
          />
        </Header>
      </form>
      {videos?.length > 0 ? (
        <VideosHolder>
          {videos ? (
            videos?.map((item: any, index: number) => (
              <VideoCard
                title={item?.title}
                index={index}
                key={index}
                source={item?.videoUrl}
                details={item}
              />
            ))
          ) : (
            <Spinner color="var(--primary-color)" />
          )}
        </VideosHolder>
      ) : (
        <NoData>
          <img src={noData} alt="No data" />
          <p>You haven’t selected any videos yet.</p>
          <p>Use the view video lessons to view videos.</p>
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
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

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

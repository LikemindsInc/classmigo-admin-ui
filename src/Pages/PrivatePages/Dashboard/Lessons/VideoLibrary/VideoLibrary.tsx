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
  const [topic, setTopic] = useState([]);

  const { handleSubmit, watch, control, setValue } = useForm({});

  let classValue = watch("class");
  let subjectValue = watch("subject");
  let topicValue = watch("topic");

  const {
    data: allVideos,
    isFetching: isFetchingVideos,
    refetch: getAllVideos,
  } = useApiGet(["videos"], () => getAllVideosUrl(topicValue?.value), {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    refetch: fetchSubject,
  } = useApiGet(["allSubjects"], () => getAllSubjectsUrl(classValue?.value), {
    refetchOnWindowFocus: false,
    enabled: !!classValue,
  });
  const {
    data: topics,
    isLoading: isLoadingTopics,
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
  const activeSubjects  =  subjects?.data?.subjects.filter((item: any) => item.isActive);
  const activeTopics  =  topics?.data?.content.filter((item: any) => item.isActive);


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
    console.log(topicValue, "lakaka");
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
                classValue={classValue}
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

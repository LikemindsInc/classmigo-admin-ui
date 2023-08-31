import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  ButtonElement,
  InputElement,
  Loader,
  SelectInput,
} from "../../../../../Ui_elements";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { ScheduleCard } from "./Components/ScheduleCard";
import { useApiGet } from "../../../../../custom-hooks";
import {
  getAllClassesUrl,
  getAllLessonsUrl,
  getAllSubjectsUrl,
} from "../../../../../Urls";
import { Controller, useForm } from "react-hook-form";
import { formatOptions } from "../../../../../utils/utilFns";
import noData from "../../../../../Assets/noData.png";
import { Skeleton } from "@mui/material";

const ScheduleLessons = () => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [topic, setTopic] = useState([]);
  let classValue: any = watch("class");
  let subjectValue: any = watch("subject");
  const { data: classes, isFetching: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  const {
    data: subjects,
    isFetching: isLoadingSubjects,
    refetch: fetchSubject,
  } = useApiGet(["allSubjects"], () => getAllSubjectsUrl(classValue?.value), {
    refetchOnWindowFocus: false,
    enabled: !!classValue,
  });

  const {
    data: topics,
    isFetching: isLoadingTopics,
    refetch: fetchTopic,
  } = useApiGet(["lessonTopic"], () => getAllLessonsUrl(subjectValue?.label), {
    refetchOnWindowFocus: false,
    enabled: !!subjectValue,
    staleTime: 0,
    onSuccess: (data: any) => {
      setTopic(data?.content);
    },
  });

  useEffect(() => {
    if (classValue) {
      fetchSubject();
    }
  }, [classValue, fetchSubject]);


  const activeClasses = classes?.data?.filter((item: any) => item.isActive);
  const activeSubjects  =  subjects?.data?.subjects.filter((item: any) => item.isActive);
  // const activeTopics = topics?.data?.content.filter((item: any) => item.isActive);
  
  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(activeSubjects, "name", "name");
  }, [activeSubjects]);

  useEffect(() => {
    if (topics?.data?.content) {
      setTopic(topics.data.content);
    }
  }, [topics]);
  const onSubmit = () => {
    fetchTopic();
  };

  return (
    <Container>
      <Header>
        <div>
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={allClasses}
                defaultValue={"Subject Class"}
                width={200}
                error={errors?.class}
                isLoading={isLoadingClasses}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={allSubjects}
                defaultValue={"Select Subject"}
                width={200}
                error={errors?.subject}
                isLoading={isLoadingSubjects}
              />
            )}
          />
          <ButtonElement
            label="View Lessons"
            isLoading={isLoadingTopics}
            onClick={onSubmit}
          />
        </div>
        {/* <WeekContainer>
          <p>Set Week No</p>
          <InputElement />
        </WeekContainer> */}
      </Header>
      <Body>
        {/* <SelectInput
          options={[]}
          onChange={() => {}}
          defaultValue="Assign Week"
          width={150}
        /> */}

        {topic && topic.length > 0 ? (
          isLoadingTopics ? (
            <Loader />
          ) : (
            topic.map((item: any, index: number) => (
              <ScheduleCard key={index} item={item} />
            ))
          )
        ) : (
          <NoData>
            <img src={noData} alt="No data" />
            <p>You haven’t added any classes yet.</p>
            <p>Use the create class above to add classes.</p>
          </NoData>
        )}
      </Body>
    </Container>
  );
};

export default ScheduleLessons;

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
  padding: 0 12%;
  justify-content: space-between;
  gap: 1%;
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
  > div {
    gap: 10px;
    display: flex;
    align-items: center;
  }
  @media ${devices.tabletL} {
    gap: 4%;
  }
`;

const WeekContainer = styled.div`
  align-items: center;
  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-top: 5px;
  }
  input {
    width: 40px;
    padding: 5px;
    text-align: center;
  }
`;

const Body = styled.section`
  width: 100%;
  padding: 0 12%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ButtonElement, Loader, SelectInput } from "../../../../../Ui_elements";
import noData from "../../../../../Assets/noData.png";
import { useNavigate } from "react-router-dom";
import { UpcomingCard } from "./Components/UpomingCard";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { useApiGet } from "../../../../../custom-hooks";
import { getLiveLessons } from "../../../../../Urls/LiveSessions";
import { Controller, useForm } from "react-hook-form";
import { getAllClassesUrl, getAllSubjectsUrl } from "../../../../../Urls";
import { formatOptions, generateQueryKey } from "../../../../../utils/utilFns";
import { useQueryClient } from "@tanstack/react-query";

const LiveSessions = () => {
  const { control, watch } = useForm();
  const [filter, setFilter] = useState({
    subjectId: null,
    className: null,
  });
  const [classValue, setClassValue] = useState<any>("");
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  // let classValue: any = watch("class");

  const changeClass = (value: any) => {
    setFilter((prev: any) => ({
      ...prev,
      className: value?.value,
    }));
    setClassValue(value?.value);
  };

  const changeSubject = (value: any) => {
    setFilter((prev: any) => ({
      ...prev,
      subjectId: value?.value,
    }));
  };

  const {
    data: liveLessons,
    isFetching: isFetchingLiveLessons,
    isLoading: isLoadingLiveLessons,
    refetch: getLiveSessions,
  } = useApiGet(["lesson"], () => getLiveLessons(filter), {
    refetchOnWindowFocus: false,
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    getLiveSessions();
  }, []);

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const handleSearch = () => {
    getLiveSessions();
    // queryClient.invalidateQueries(["live-session"]);
  };

  const { data: subjects, isFetching: isLoadingSubjects } = useApiGet(
    ["subject"],
    () => getAllSubjectsUrl(classValue && classValue),
    {
      refetchOnWindowFocus: false,
      enabled: !!classValue,
    }
  );

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);

  const activeSubjects = subjects?.data?.subjects.filter(
    (item: any) => item.isActive
  );

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const allSubjects = useMemo(() => {
    return formatOptions(activeSubjects, "name", "name");
  }, [activeSubjects]);

  return (
    <Container>
      <Body>
        {isFetchingLiveLessons ? (
          <Loader />
        ) : liveLessons ? (
          <>
            <Upcoming>
              <CreateContainer>
                <h4>Upcoming Live Lessons</h4>
                <aside>
                  <Controller
                    name="class"
                    control={control}
                    render={({ field }) => (
                      <SelectContainer>
                        <SelectInput
                          {...field}
                          options={allClasses}
                          defaultValue="Select a class"
                          isLoading={isLoadingClasses}
                          onChange={changeClass}
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
                          defaultValue="Select a subject"
                          isLoading={isLoadingSubjects}
                          onChange={changeSubject}
                        />
                      </SelectContainer>
                    )}
                  />
                  <ButtonElement
                    label="View Videos"
                    isLoading={isLoadingLiveLessons}
                    onClick={handleSearch}
                  />
                </aside>
              </CreateContainer>

              {liveLessons?.data?.length > 0 ? (
                <UpcomingSection>
                  {liveLessons?.data.map((item: any, index: number) => {
                    if (item?.isActive) {
                      return (
                        <UpcomingCard
                          topic={item?.title}
                          item={item}
                          time={item?.time}
                        />
                      );
                    }
                    return null;
                  })}
                </UpcomingSection>
              ) : (
                <Error>
                  <img src={noData} alt="No data" />
                  <p>You don't have any scheduled or previous live lessons.</p>
                </Error>
              )}
            </Upcoming>
            <Utilities>
              <PastHeader>Past Live Lessons</PastHeader>
            </Utilities>
            {liveLessons?.data.some((item: any) => !item?.isActive) ? (
              <LiveSection>
                {liveLessons?.data.map((item: any, index: number) => {
                  if (!item?.isActive) {
                    return (
                      <UpcomingCard
                        topic={item?.title}
                        item={item}
                        time={item?.time}
                        key={index}
                      />
                    );
                  }
                  return null;
                })}
              </LiveSection>
            ) : (
              <Error>
                <img src={noData} alt="No data" />
                <p>You don't have any scheduled or previous live lessons.</p>
              </Error>
            )}
          </>
        ) : (
          <NoData>
            <img src={noData} alt="No data" />
            <p>You don't have any scheduled or previous live lessons.</p>
            <p>Use the schedule live lesson below to schedule a lesson.</p>
            <ButtonElement
              onClick={() => navigate("/live_lessons/schedule_session")}
              width={200}
              label="Schedule Live Lesson"
            />
          </NoData>
        )}
      </Body>

      <FabContainer onClick={() => navigate("/live_lessons/schedule_session")}>
        +
      </FabContainer>
    </Container>
  );
};

export default LiveSessions;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
  @media ${devices.tabletL} {
    overflow-y: scroll;
  }
`;

const Body = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10rem;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const NoData = styled.div`
  width: fit-content;
  margin: 0 auto;
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
  button {
    margin-top: 1rem;
  }
`;

const Upcoming = styled.div`
  width: 100%;
  h4 {
    font-size: 1.3rem;
  }
  > div {
    display: flex;
    gap: 5%;
    width: 70%;
    margin-top: 2rem;
  }

  @media ${devices.tabletL} {
    margin: 40px 0;
  }
`;

const FabContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: 700;
  bottom: 10%;
  right: 5%;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: var(--hover-color);
  box-shadow: 1px 2px 25px -10px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 2px 25px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 25px -10px rgba(0, 0, 0, 0.75);
`;

const LiveSection = styled.section`
  margin-top: 2rem;
  width: 100%;
  > h4 {
    font-size: 1.5vw;
  }
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-template-columns: repeat(1, 1fr);

  @media ${devices.tabletL} {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const UpcomingSection = styled.section`
  width: 100%;
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const PastHeader = styled.h4`
  text-align: left;
  font-size: 1.3rem;
`;

const Utilities = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 2%;
  > aside {
    display: flex;
    gap: 10px;
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }
`;

const CreateContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 2%;

  h4 {
    font-size: 1.5vw;
  }
  @media ${devices.tabletL} {
    h4 {
      margin-bottom: 10px;
      font-size: 1rem;
    }
    flex-direction: column;
    align-items: center;
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
    @media ${devices.tabletL} {
      width: 100%;
    }
  }

  aside {
    display: flex;
    align-items: center;
    gap: 10px;
    @media ${devices.tabletL} {
      flex-direction: column;
      width: inherit;
      button {
        width: 100%;
      }
    }
  }
`;

const Error = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  p {
    font-size: 0.8rem;
    text-align: center;
  }
`;

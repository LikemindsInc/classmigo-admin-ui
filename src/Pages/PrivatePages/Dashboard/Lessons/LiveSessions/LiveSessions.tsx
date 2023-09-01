import React, { useMemo } from "react";
import styled from "styled-components";
import {
  ButtonElement,
  InputElement,
  Loader,
  SelectInput,
} from "../../../../../Ui_elements";
import noData from "../../../../../Assets/noData.png";
import { useNavigate } from "react-router-dom";
import { UpcomingCard } from "./Components/UpomingCard";
import { LiveSessionCard } from "./Components/liveSessionCard";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import zIndex from "@mui/material/styles/zIndex";
import { useApiGet } from "../../../../../custom-hooks";
import { getLiveLessons } from "../../../../../Urls/LiveSessions";
import { Controller, useForm } from "react-hook-form";
import { getAllClassesUrl } from "../../../../../Urls";
import { formatOptions } from "../../../../../utils/utilFns";
import { Fab } from "@mui/material";
const LiveSessions = () => {
  const navigate = useNavigate();

  const { control, getValues } = useForm();
  const { data: liveLessons, isFetching: isLoadingLiveLessons } = useApiGet(
    ["live-sessions"],
    () => getLiveLessons(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  if (isLoadingLiveLessons) {
    return <Loader />;
  }
  return (
    <Container>
      <Body>
        {liveLessons ? (
          <>
            <Upcoming>
              <CreateContainer>
                <h4>Upcoming Live Lessons</h4>
                <aside>
                  <Controller
                    name="class"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        options={allClasses}
                        defaultValue="Select a class"
                        isLoading={isLoadingClasses}
                        width={200}
                      />
                    )}
                  />
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        {...field}
                        options={allClasses}
                        defaultValue="Select a subject"
                        isLoading={isLoadingClasses}
                        width={200}
                      />
                    )}
                  />
                  <ButtonElement label="View Videos" />
                </aside>
              </CreateContainer>

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
            </Upcoming>
            <Utilities>
              <PastHeader>Past Live Lessons</PastHeader>
              {/* <aside>
                <Controller
                  name="class"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      options={allClasses}
                      defaultValue="Select a class"
                      isLoading={isLoadingClasses}
                      width={200}
                    />
                  )}
                />
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      options={allClasses}
                      defaultValue="Select a subject"
                      isLoading={isLoadingClasses}
                      width={200}
                    />
                  )}
                />
                <ButtonElement label="View Videos" />
              </aside> */}
            </Utilities>
            <LiveSection>
              {liveLessons?.data.map((item: any, index: number) => {
                if (!item?.isActive) {
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
            </LiveSection>
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
`;

const Body = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10rem;
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
  h4 {
    font-size: 1.3rem;
  }
  margin-top: 2rem;
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const UpcomingSection = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin: 3rem 0;

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
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 200px;
  }

  aside {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

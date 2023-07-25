import React from "react";
import styled from "styled-components";
import {
  AdminIcon,
  AskIcon,
  HomeIcon,
  LessonIcon,
  Logo,
  PaymentIcon,
  QuizIcon,
  ScheduleIcon,
  UserIcon,
  VideoIcon,
} from "../../../Assets/Svgs";
import { SideBarMenuItem } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";

export const DashboardSidebar = () => {

  const userMenus = [
    {
      path: "/students",
      title: "Students",
      icon: <UserIcon />,
    },
    {
      path: "/parents",
      title: "Parents",
      icon: <UserIcon />,
    },
    {
      path: "/payments",
      title: "Payments",
      icon: <PaymentIcon />,
    },
  ];

  const lessonMenus = [
    {
      path: "/lessons_criteria",
      title: "Lesson Criteria",
      icon: <LessonIcon />,
    },
    {
      path: "/video_library",
      title: "Video Library",
      icon: <VideoIcon />,
    },
    {
      path: "/quiz_library",
      title: "Quiz Library",
      icon: <QuizIcon />,
    },
    {
      path: "/schedule_lessons",
      title: "Schedule Weekly Lessons",
      icon: <ScheduleIcon />,
    },
    {
      path: "/ask_the_teacher",
      title: "Ask The Teacher",
      icon: <VideoIcon />,
    },
    {
      path: "/quiz_library",
      title: "Quiz Library",
      icon: <AskIcon />,
    },
    {
      path: "/schedule_lessons",
      title: "Schedule Live Lessons",
      icon: <ScheduleIcon />,
    },
  ];

  const extrasMenus = [
    {
      path: "/assignment_help",
      title: "Assignment Help",
      icon: <UserIcon />,
    },
    {
      path: "/general_knowledge",
      title: "General Knowledge",
      icon: <UserIcon />,
    },
  ];
  return (
    <Container>
      <div>
        <SideLogo />
        <section>
          <SideBarMenuItem icon={<HomeIcon />} path="/" title="Home" />
        </section>
        <section>
          <h6>USERS</h6>
          {userMenus.map((item, index) => {
            return (
              <SideBarMenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            );
          })}
        </section>
        <section>
          <h6>LESSONS</h6>
          {lessonMenus.map((item, index) => {
            return (
              <SideBarMenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            );
          })}
        </section>
        <section>
          <h6>EXTRAS</h6>
          {extrasMenus.map((item, index) => {
            return (
              <SideBarMenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            );
          })}
        </section>
      </div>

      <div>
        <SideBarMenuItem
          icon={<AdminIcon />}
          title="Admin Access"
          path={"/admin"}
        />
      </div>
    </Container>
  );
};

const Container = styled.aside`
  max-height: 100vh;
  padding: 1.5rem 0 3.4rem 0;
  width: clamp(15rem, 100vw, 24.5rem) !important;
  background-color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${devices.tablet}{
    display: none;
  }


  h6 {
    font-size: 1rem;
    font-weight: 700;
    padding-left: 3.4rem;
  }
  section {
    margin-bottom: 2.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const SideLogo = styled(Logo)`
  width: clamp(6rem, 50vw, 11rem);
  height: clamp(1rem, 50vw, 1.5rem);
  margin-bottom: 2.8rem;
  margin-left: 3.4rem;
`;

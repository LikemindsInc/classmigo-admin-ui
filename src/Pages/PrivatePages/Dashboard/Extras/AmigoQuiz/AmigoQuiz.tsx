import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { Tab, Tabs } from "@mui/material";
import { Loader, TabNavigation } from "../../../../../Ui_elements";
import {
  Outlet,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Leaderboard } from "./Pages/LeaderboardPage/Leaderboard";
import { PracticeQuiz } from "./Pages/PracticePage/PracticeQuiz";
import { ScheduleQuiz } from "./Pages/MainPage/ScheduleQuiz";
import { PracticePageRouter } from "./Pages/PracticePage/RouteBuilder";
import { LeaderboardRouter } from "./Pages/LeaderboardPage/Routebuilder";
import { ViewQuestions } from "./Pages/MainPage/ViewQuestions";
import { EditQuizQuestion } from "./Pages/MainPage/EditQuestion";
import { QuizLeaderboard } from "./Pages/MainPage/Leaderboard";
import { AddPracticeQuizQuestion } from "./Pages/PracticePage/AddQuestion";
import { getAllClassesUrl } from "../../../../../Urls";
import { useApiGet } from "../../../../../custom-hooks";
import { formatOptions } from "../../../../../utils/utilFns";
import { AddQuizQuestion } from "./Pages/MainPage/AddQuestion";

const AmigoQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState<any>(() => {
    const storedPage = localStorage.getItem("page");
    return storedPage ? Number(storedPage) : undefined;
  });

  const { data: classes, isLoading: isLoadingClassOptions } = useApiGet(
    ["allClassesAmigo"],
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

  useEffect(() => {
    if (location.hash === "") {
      navigate("#quiz");
    } else if (location.hash) {
      const route = routes.find(
        (item) => item.route === location.hash.substring(1)
      );
      if (route) {
        setPage(route.id);
        localStorage.setItem("page", String(route.id));
      }
    }
  }, [location.hash, navigate]);

  const routes = [
    {
      id: 0,
      name: "Amigo Quiz",
      route: "quiz",
    },
    {
      id: 1,
      name: "Practice Quiz",
      route: "practice",
    },
    {
      id: 2,
      name: "Leader board",
      route: "leaderboard",
    },
  ];

  if (isLoadingClassOptions) {
    return <Loader />;
  }
  const handleChange = (event: any, newValue: any) => {
    navigate(`#${routes[newValue].route}`);
    setPage(newValue);
    localStorage.setItem("page", String(newValue));
  };
  return (
    <Container>
      <TabContainer>
        <TabNavigation
          routes={routes}
          page={page}
          handleChange={handleChange}
        />
      </TabContainer>
      {location.hash === "#quiz" && (
        <MainPage
          isLoadingClassOptions={isLoadingClassOptions}
          classOptions={allClasses}
        />
      )}
      {location.hash === "#practice" && <PracticeQuiz />}
      {location.hash === "#leaderboard" && <Leaderboard />}
      {location.hash === "#quiz/schedule_quiz" && <ScheduleQuiz />}
      {location.hash === "#quiz/edit_question" && <EditQuizQuestion />}
      {location.hash === "#quiz/quiz_leaderboard" && <QuizLeaderboard />}
      {location.hash === "#quiz/schedule_quiz/view_questions" && (
        <ViewQuestions />
      )}
      {location.hash === "#quiz/schedule_quiz/add_quiz_question" && (
        <AddQuizQuestion />
      )}
      {location.hash === "#practice/add_question" && (
        <AddPracticeQuizQuestion />
      )}
    </Container>
  );
};

export default AmigoQuiz;

const Container = styled.section`
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
    padding: 1rem;
  }
`;

const TabContainer = styled.section`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

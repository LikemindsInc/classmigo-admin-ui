import React from "react";
import { useLocation } from "react-router-dom";
import { Leaderboard } from "./Pages/LeaderboardPage/Leaderboard";
import { AddQuizQuestion } from "./Pages/MainPage/AddQuestion";
import { EditQuizQuestion } from "./Pages/MainPage/EditQuestion";
import { QuizLeaderboard } from "./Pages/MainPage/Leaderboard";
import { ScheduleQuiz } from "./Pages/MainPage/ScheduleQuiz";
import { ViewQuestions } from "./Pages/MainPage/ViewQuestions";

export const AmigoRouter = () => {
  const location = useLocation();

  switch (location.hash) {
    case "#leaderboard":
      return <Leaderboard />;
    case "#quiz/schedule_quiz":
      return <ScheduleQuiz />;
    case "#quiz/schedule_quiz/edit_question":
      return <EditQuizQuestion />;
    case "#quiz/quiz_leaderboard":
      return <QuizLeaderboard />;
    case "#quiz/schedule_quiz/view_questions":
      return <ViewQuestions />;
    case "#quiz/schedule_quiz/add_quiz_question":
      return <AddQuizQuestion />;
    default:
      return null;
  }
};

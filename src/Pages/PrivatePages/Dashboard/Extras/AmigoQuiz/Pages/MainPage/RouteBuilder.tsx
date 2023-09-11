import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./MainPage";
import { ScheduleQuiz } from "./ScheduleQuiz";

export const MainPageRouter = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="#quiz/schedule" element={<ScheduleQuiz />} />
    </Routes>
  );
};

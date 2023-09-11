import { Route, Routes } from "react-router-dom";
import { PracticeQuiz } from "./PracticeQuiz";

export const PracticePageRouter = () => {
  return (
    <Routes>
      <Route index element={<PracticeQuiz />} />
    </Routes>
  );
};

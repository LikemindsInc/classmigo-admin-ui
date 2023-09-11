import { Route, Routes } from "react-router-dom";
import { Leaderboard } from "./Leaderboard";

export const LeaderboardRouter = () => {
  return (
    <Routes>
      <Route index element={<Leaderboard />} />
    </Routes>
  );
};

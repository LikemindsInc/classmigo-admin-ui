import { useLocation } from "react-router-dom";
import { ReferalTable } from "./Pages/ReferalTable/ReferalTable";
import { ViewAgent } from "./Pages/ViewAgent/ViewAgent";

export const ReferalRouter = () => {
  const location = useLocation();

  switch (location.hash) {
    case "#viewAgents":
      return <ReferalTable/>;
    default:
      return <ViewAgent/>;
  }
};

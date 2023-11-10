import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TabNavigation } from "../../../../../Ui_elements";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { ViewAgent } from "./Pages/ViewAgent/ViewAgent";
import { ReferalRouter } from "./ReferalRouter";

const Referals = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState<any>(() => {
    const storedPage = localStorage.getItem("page");
    return storedPage ? Number(storedPage) : undefined;
  });

  const routes = useMemo(
    () => [
      {
        id: 0,
        name: "Create Agent",
        route: "createAgent",
      },
      {
        id: 1,
        name: "View Agents",
        route: "viewAgents",
      },
    ],
    []
  );

  useEffect(() => {
    if (location.hash === "") {
      navigate("#createAgent");
    } else if (location.hash) {
      const route = routes.find(
        (item) => item.route === location.hash.substring(1)
      );
      if (route) {
        setPage(route.id);
        localStorage.setItem("page", String(route.id));
      }
    }
  }, [location.hash, navigate, routes]);

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
      {/* {location.hash === "#createAgent" && <ViewAgent />} */}
      <ReferalRouter/>
    </Container>
  );
};

export default Referals;

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

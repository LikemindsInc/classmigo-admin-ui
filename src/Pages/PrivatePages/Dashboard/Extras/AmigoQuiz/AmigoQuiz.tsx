import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { Loader, TabNavigation } from "../../../../../Ui_elements";
import { useLocation, useNavigate } from "react-router-dom";
import { MainPage } from "./Pages/MainPage/MainPage";
import { getAllClassesUrl } from "../../../../../Urls";
import { useApiGet } from "../../../../../custom-hooks";
import { formatOptions } from "../../../../../utils/utilFns";
import { AmigoRouter } from "./AmigoRouter";

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

  const routes = useMemo(
    () => [
      {
        id: 0,
        name: "Amigo Quiz",
        route: "quiz",
      },
      {
        id: 1,
        name: "General Leaderboard",
        route: "leaderboard",
      },
    ],
    []
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
  }, [location.hash, navigate, routes]);

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
      <AmigoRouter/>
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

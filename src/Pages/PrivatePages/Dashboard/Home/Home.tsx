import styled from "styled-components";
import { Card } from "./Components/Card";
import { PaymentData } from "./Components/PaymentData";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
import { useApiGet } from "../../../../custom-hooks";
import { getDashboardAnalytics } from "../../../../Urls/Home";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { getSubscriptionAnalytics } from "../../../../Urls";
import { generateQueryKey } from "../../../../utils/utilFns";
const Home = () => {
  const [analyticsData, setAnalyticsData] = useState<any>("");
  const [chartData, setChartData] = useState<any>(null);
  const [filter, setFilter] = useState({
    period:""
  });
  const { data: analytics } = useApiGet(
    ["Analytics"],
    () => getDashboardAnalytics(),
    {
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );
  const { data: chartAnalytics, refetch: fetchChart, isFetching } = useApiGet(
    [generateQueryKey("Chart-data", filter)],
    () => getSubscriptionAnalytics(filter),
    {
      refetchOnWindowFocus: true,
      enabled: true,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  useEffect(() => {
    analytics && setAnalyticsData(analytics?.data);
  }, [analytics, setAnalyticsData]);

  useEffect(() => {
    chartAnalytics && setChartData(chartAnalytics?.data);
  }, [chartAnalytics]);

  return (
    <Container>
      <ScrollCap>
        <p> </p>
      </ScrollCap>
      {analyticsData ? (
        <CardGrid>
          {Object.keys(analyticsData).map((title, index) => (
            <Card
              key={index}
              value={analyticsData[title]}
              description={title}
            />
          ))}
        </CardGrid>
      ) : (
        <CardGrid>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={118}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={118}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={118}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={118}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={118}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={118}
          />
        </CardGrid>
      )}

      <Details>
        {chartData ? (
          <PaymentData
            data={chartData}
            filter={filter}
            setFilter={setFilter}
            fetchAction={fetchChart}
            isFetching={isFetching}
          />
        ) : (
          <>
            {" "}
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={118}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={118}
            />
          </>
        )}
      </Details>
    </Container>
  );
};

export default Home;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 3.5rem 2.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  gap: 1rem;
`;

const ScrollCap = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.2rem;
  background-color: white;
  color: white;
  p {
    display: hidden;
  }

  @media ${devices.tablet} {
    height: 0.8rem;
    margin-bottom: 0 !important;
  }
`;

const Details = styled.div`
  width: auto;
`;

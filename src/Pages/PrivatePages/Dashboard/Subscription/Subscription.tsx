import React from "react";
import styled from "styled-components";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
import { ButtonElement } from "../../../../Ui_elements";
import noData from "../../../../Assets/noData.png";
import { useNavigate } from "react-router-dom";
import { useApiGet } from "../../../../custom-hooks";
import { getSubscriptions } from "../../../../Urls";
import { SubscriptionCard } from "./Component/SubcsriptionCard";
import { Skeleton } from "@mui/material";

const Subscription = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useApiGet(
    ["subscription"],
    () => getSubscriptions(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  return (
    <Container>
      {data?.data?.length > 0 && (
        <Header>
          <ButtonElement
            label="Create Subscription Plan"
            onClick={() => navigate("/subscription/create_plan")}
          />
        </Header>
      )}

      {data?.data?.length > 0 ? (
        data.data.map((item: any) => (
          <SubscriptionCard
            subName={item?.friendlyName}
            isActive={item?.isActive}
            isPublic={item.isPublic}
            price={item?.price}
            discount={item?.discountedPrice}
            planName={item?.label}
            key={item?._id}
            id={item?._id}
            item={item}
          />
        ))
      ) : isLoading ? (
        <div>
          {[...Array(4)].map((_, index) => (
            <SkeletonContainer key={index}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={118}
              />
            </SkeletonContainer>
          ))}
        </div>
      ) : (
        <NoData>
          <img src={noData} alt="No data" />
          <p>You don't have any subscription plan currently.</p>
          <p>Use the create subscription plan below to start a plan.</p>
          <ButtonElement
            onClick={() => navigate("/subscription/create_plan")}
            width={200}
            label="Create Subscription Plan"
          />
        </NoData>
      )}
    </Container>
  );
};

export default Subscription;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 2rem 15%;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;
  @media ${devices.tablet} {
    padding: 1rem 1rem;
  }
`;

const NoData = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
  button {
    margin-top: 1rem;
  }
`;

const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    width: 200px;
  }
`;

const SkeletonContainer = styled.div`
  margin-bottom: 10px;
`;

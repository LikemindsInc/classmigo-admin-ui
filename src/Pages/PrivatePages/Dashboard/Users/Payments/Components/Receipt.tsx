import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useApiGet } from "../../../../../../custom-hooks";
import { getSubscriptionDataUrl } from "../../../../../../Urls/Payments";
import { convertKoboToNaira } from "../../../../../../utils/utilFns";
import dayjs from "dayjs";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { Loader } from "../../../../../../Ui_elements";
import { AxiosError } from "axios";

export const Receipt = ({ id }: any) => {
  const [details, setDetails] = useState<any>([]);
  const { data, isLoading, error } = useApiGet(
    [`receipt${id}`],
    () => getSubscriptionDataUrl(id),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  useEffect(() => {
    if (data?.data) {
      setDetails(data?.data?.data);
    }
  }, [data?.data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error as any}</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <Container>
      <TransactionHeader>
        <p>{details?.metadata?.user}</p>
        <p>
          Transaction <span>&gt;</span> {details?.id}
        </p>
      </TransactionHeader>
      <Divider />
      <TransactionDetailsContainer>
        <ReceiptContainer>
          <ReceiptHeader>
            <div>
              <h6>Amount</h6>
            </div>
            <ReceiptHeaderTag>
              ₦{convertKoboToNaira(details?.amount)}
            </ReceiptHeaderTag>
          </ReceiptHeader>
          <Divider />
          <ReceiptElements>
            <p>Reference</p>
            <h6>{details?.reference}</h6>
          </ReceiptElements>
          <Divider />
          <ReceiptElements>
            <p>Channel</p>
            <h6>Card</h6>
          </ReceiptElements>
          <Divider />
          <ReceiptElements>
            <p>Fees</p>
            <h6>₦{convertKoboToNaira(details?.fees)}</h6>
          </ReceiptElements>
          <Divider />
          {/* <ReceiptElements>
            <p>Your Account</p>
            <h6>NGN 3,700.00</h6>
          </ReceiptElements> */}
          {/* <Divider /> */}
          {/* <ReceiptElements>
            <p>Your balance</p>
            <h6>NGN 1,600</h6>
          </ReceiptElements> */}
          {/* <Divider /> */}
          <ReceiptElements>
            <p>Paid At</p>
            <h6>
              {dayjs(details?.paid_at).format("MMMM D, YYYY h:mm A [UTC]")}
            </h6>
          </ReceiptElements>
          <Divider />
          <ReceiptElements>
            <p>Message</p>
            <h6>{data?.data?.message}</h6>
          </ReceiptElements>
          <Divider />
          {/* <ReceiptElements>
            <p>WhatsApp number</p>
            <h6>+234 810 000 0000</h6>
          </ReceiptElements> */}
        </ReceiptContainer>
        <ReceiptTimeline>
          {/* <Timeline
            items={[
              {
                children: "Created a payment request",
              },
              {
                children: "Initiated a payment process at 2015-09-01",
              },
              {
                children: "Technical testing 2015-09-01",
              },
              {
                children: "Network problems being solved 2015-09-01",
              },
            ]}
          /> */}
        </ReceiptTimeline>
      </TransactionDetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  overflow-y: auto;
`;

const TransactionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  p,
  span {
    color: gray;
    font-size: 0.8rem;
  }
  p:first-child {
    font-weight: 800;
  }
  span {
    margin: 0 5px;
  }
`;

const TransactionDetailsContainer = styled.div`
  /* display: flex; */
  p,
  h6 {
    font-size: 0.8rem !important;
  }import { AxiosError } from 'axios';

`;

const ReceiptContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;
`;

const ReceiptHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h6 {
    color: gray;
    font-weight: 600;
  }
`;

const ReceiptHeaderTag = styled.p`
  padding: 0.3rem 1rem;
  color: white;
  background-color: green;
  border-radius: 20px;
  font-weight: 700;
`;

const ReceiptElements = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: gray;
    font-weight: 600;
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ReceiptTimeline = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

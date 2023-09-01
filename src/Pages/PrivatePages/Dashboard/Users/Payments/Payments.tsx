import { Divider, Timeline } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ExportIcon } from "../../../../../Assets/Svgs";
import {
  DatePickerInput,
  ModalOptions,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";
import { TableElement } from "../../../../../Ui_elements/Table/Table";
import { columns, data } from "../../../../../utils/dummyDataPayments";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { ModalContext } from "../../../../../Contexts/Contexts";
import { getPaymentDataUrl } from "../../../../../Urls/Payments";
import { useApiGet } from "../../../../../custom-hooks";
import { ColumnsType } from "antd/es/table";
import { UserDetails } from "./Components/UserDetails";
import { ToolTipElement } from "./Components/ToolTip";
import { formatDate } from "../../../../../utils/utilFns";
import moment from "moment";

const Payments = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [payment, setPayment] = useState<DataType[]>([]);


  const headerStyle = {
    color: "gray",
    fontSize: "12px",
    fontWeight: 700,
  };


  interface DataType {
    key: string;
    name: string;
    image: string;
    username: string;
    class: string;
    plan: string;
    amount: number;
    datePurchased: string;
  }


  const columns: ColumnsType<DataType> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: DataType) => (
        <UserDetails image={record.image} name={name} />
      ),
    },
    {
      title: "USERNAME",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "CLASS",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "PLAN",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "AMOUNT (NGN)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "DATE PURCHASED",
      render: (record: DataType) => (
        <ToolTipElement paymentDetails={record}>{record.datePurchased}</ToolTipElement>
      ),
    },
    {
      title: "",
      dataIndex: "options",
      key: "options",
      render: () => <ModalOptions />,
    },
  ];
  
  const updatedColumns = columns.map((column: any) => {
    let updatedColumn = { ...column };

    switch (column.dataIndex) {
      case "name":
        updatedColumn.width = "30%";
        break;
      case "username":
        updatedColumn.width = "15%";
        break;
      case "datePurchased":
        updatedColumn.width = "15%";
        break;
      case "class":
        updatedColumn.width = "10%";
        break;
      case "plan":
        updatedColumn.width = "10%";
        break;
      case "amount":
        updatedColumn.width = "15%";
        break;
      default:
        break;
    }
    updatedColumn.title = <h5 style={headerStyle}>{column.title}</h5>;
    return updatedColumn;
  });

  const classOptions = [
    {
      value: 0,
      label: "Primary 1",
    },
    {
      value: 1,
      label: "Primary 2",
    },
    {
      value: 2,
      label: "Primary 3",
    },
    {
      value: 3,
      label: "Primary 4",
    },
    {
      value: 4,
      label: "Primary 5",
    },
    {
      value: 5,
      label: "Primary 6",
    },
    {
      value: 6,
      label: "Primary 2",
    },
    {
      value: 7,
      label: "JSS1",
    },
    {
      value: 8,
      label: "JSS2",
    },
    {
      value: 9,
      label: "JSS3",
    },
    {
      value: 10,
      label: "SS1",
    },
    {
      value: 11,
      label: "SS2",
    },
    {
      value: 12,
      label: "SS3",
    },
  ];

  const planOptions = [
    {
      value: 0,
      label: "1 Month",
    },
    {
      value: 1,
      label: "2 Months",
    },
    {
      value: 2,
      label: "3 Months",
    },
  ];

  const handleSearchFilter = (value: string) => {};

  // const handleOk = () => {
  //   setOpenModal(false);
  // };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const {
    data: paymentData,
    isLoading: isLoadingPaymentData,
    refetch: fetchPayment,
  } = useApiGet(["Payment-data"], () => getPaymentDataUrl(), {
    refetchOnWindowFocus: false,
    enabled: true,
  });


  useEffect(() => {
    if (paymentData) {
      const newData = paymentData?.data?.map((item: any) => ({
        key: item?._id,
        name: `${item?.student?.firstName} ${item?.student?.lastName}`,
        username: item?.student?.userName,
        class: item?.className,
        datePurchased: moment(item?.dateSubscribed).format("DD, MMM, YYYY"),
        plan: item?.subscription?.friendlyName,
        amount: item?.amount,
        image: item?.student?.profileImageUrl,
        subStart: moment(item?.dateSubscribed).format("DD, MMM, YYYY"),
        subStop: moment(item?.nextDueDate).format("DD, MMM, YYYY"),
      }))
      setPayment(newData)
    }
  },[paymentData])


  return (
    <Container>
      <UtilsHolder>
        <div>
          <SearchInput />
          <SelectInput
            options={classOptions}
            onChange={handleSearchFilter}
            defaultValue="Class"
            width={200}
          />
          <SelectInput
            options={planOptions}
            onChange={handleSearchFilter}
            defaultValue="Status"
            width={200}
          />
          <DatePickerInput width={400} label={"Sort By Date"} />
          <h6>2,500 Results</h6>
        </div>
        <Button>
          Export
          <ExportIcon />
        </Button>
      </UtilsHolder>
      <TableElement
        columns={updatedColumns}
        data={payment}
        loading={isLoadingPaymentData}
        
      />
      <Modal cancel={handleCancel} width={"80%"}>
        <TransactionHeader>
          <p>
            Transaction <span>&gt;</span> 841951890
          </p>
        </TransactionHeader>
        <Divider />
        <TransactionDetailsContainer>
          <ReceiptContainer>
            <ReceiptHeader>
              <div>
                <p>Split Payment</p>
                <h6>NGN 2,000.00</h6>
              </div>
              <ReceiptHeaderTag>Success</ReceiptHeaderTag>
            </ReceiptHeader>
            <Divider />
            <ReceiptElements>
              <p>Reference</p>
              <h6>37492-71853-32684</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>Channel</p>
              <h6>Card</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>Fees</p>
              <h6>NGN 30.00</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>Your Account</p>
              <h6>NGN 3,700.00</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>Your balance</p>
              <h6>NGN 1,600</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>Paid At</p>
              <h6>November 14, 2020 2:05 PM UTC</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>Message</p>
              <h6>Approved</h6>
            </ReceiptElements>
            <Divider />
            <ReceiptElements>
              <p>WhatsApp number</p>
              <h6>+234 810 000 0000</h6>
            </ReceiptElements>
          </ReceiptContainer>
          <ReceiptTimeline>
            <Timeline
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
            />
          </ReceiptTimeline>
        </TransactionDetailsContainer>
      </Modal>
    </Container>
  );
};

export default Payments;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: auto;
  align-items: center;
  justify-content: space-between;
  @media ${devices.tabletL} {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    width:80%;

    @media ${devices.tabletL} {
      flex-direction: column;
      align-self: center;
      width: 100%;
    }

    h6 {
      font-size: clamp(1rem, 1vw, 1rem);
      font-weight: 700;
      width: 100%;
      @media ${devices.tabletL} {
        text-align: center;
      }
    }
  }
`;

const Modal = styled(CenteredDialog)``;
const TransactionHeader = styled.div`
  width: 100%;
  p,
  span {
    color: gray;
    font-size: 0.8rem;
  }
  span {
    margin: 0 5px;
  }
`;
const TransactionDetailsContainer = styled.div`
  display: flex;
  p,
  h6 {
    font-size: 0.8rem !important;
  }
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
`;
const ReceiptHeaderTag = styled.p`
  padding: 0.3rem 1rem;
  color: white;
  background-color: green;
  border-radius: 20px;
`;
const ReceiptElements = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: gray;
  }
`;

const ReceiptTimeline = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  padding: 0.6rem;
  color: white;
  display: flex;
  font-size: 0.8rem;
  outline: none;
  border: none;
  border-radius: 12px;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  @media ${devices.tabletL} {
    margin-top: 5%;
  }
`;

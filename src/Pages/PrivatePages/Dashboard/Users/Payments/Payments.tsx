import { Divider, Timeline } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ExportIcon } from "../../../../../Assets/Svgs";
import {
  ModalOptions,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";
import { TableElement } from "../../../../../Ui_elements/Table/Table";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { ModalContext } from "../../../../../Contexts/Contexts";
import { getPaymentDataUrl } from "../../../../../Urls/Payments";
import { useApiGet } from "../../../../../custom-hooks";
import { ColumnsType } from "antd/es/table";
import { UserDetails } from "./Components/UserDetails";
import { ToolTipElement } from "./Components/ToolTip";
import { formatOptions, generateQueryKey } from "../../../../../utils/utilFns";
import moment from "moment";
import { getAllClassesUrl } from "../../../../../Urls";
import { debounce } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { SUBSCRIPTION_TYPES } from "../../../../../utils/constants";

const Payments = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [payment, setPayment] = useState<DataType[]>([]);
  const [searchFilter, setSearchFilter] = useState<any>({
    page: 0,
    search: null,
    className: null,
    planType: null,
    sort: null,
  });

  const { control, setValue } = useForm();

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      search: value,
    }));
  }, 1500);

  const handleSearchFilter = (e: any) => {
    const searchValue = e.target.value;
    debouncedSearchFilterUpdate(searchValue.trim());
  };

  const onSelectClassname = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      className: value?.value,
    }));
  };

  const onSelectSubscription = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      planType: value?.value,
    }));
  };

  const handleClearClass = () => {
    setValue("className", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      className: null,
    }));
  };

  const handleClearSubscription = () => {
    setValue("subscription", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      planId: null,
    }));
  };

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
        <ToolTipElement paymentDetails={record}>
          {record.datePurchased}
        </ToolTipElement>
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

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
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

  const handleCancel = () => {
    setOpenModal(false);
  };

  const {
    data: paymentData,
    isLoading: isLoadingPaymentData,
    isFetching: isFetchingPayments,
    refetch: fetchPayment,
  } = useApiGet(
    [generateQueryKey("Payment-data", searchFilter)],
    () => getPaymentDataUrl(searchFilter),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  useEffect(() => {
    if (paymentData) {
      const newData = paymentData?.data?.content.map((item: any) => ({
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
      }));
      setPayment(newData);
    }
  }, [paymentData]);

  return (
    <Container>
      <UtilsHolder>
        <div>
          <SearchInput onSearch={handleSearchFilter} />
          <Controller
            name="className"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  id="className"
                  options={allClasses}
                  onChange={onSelectClassname}
                  defaultValue="Class"
                  isLoading={isLoadingClasses}
                />
                {typeof searchFilter?.className === "string" && (
                  <CancelIcon onClick={handleClearClass}>&#8855;</CancelIcon>
                )}
              </SelectContainer>
            )}
          />

          <Controller
            name="subscription"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  id="planId"
                  options={SUBSCRIPTION_TYPES}
                  onChange={onSelectSubscription}
                  defaultValue="Subscription"
                  // width={200}
                />
                {typeof searchFilter?.isSubscribed === "boolean" && (
                  <CancelIcon onClick={handleClearSubscription}>
                    &#8855;
                  </CancelIcon>
                )}
              </SelectContainer>
            )}
          />

          {/* <DatePickerInput width={400} label={"Sort By Date"} /> */}
          {/* <h6>2,500 Results</h6> */}
        </div>
        <Button>
          Export
          <ExportIcon />
        </Button>
      </UtilsHolder>
      <TableElement
        columns={updatedColumns}
        data={payment || null}
        loading={isLoadingPaymentData || isFetchingPayments}
        pagination
        paginationData={paymentData?.data?.pagination}
        fetchFunction={getPaymentDataUrl}
        fetchAction={fetchPayment}
        setSearchFilter={setSearchFilter}
        searchFilter={searchFilter}
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
    input {
      width: fill !important;
    }
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 80%;

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

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const CancelIcon = styled.div`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
`;

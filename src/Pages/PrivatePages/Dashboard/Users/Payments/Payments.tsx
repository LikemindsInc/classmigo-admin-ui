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
import { Receipt } from "./Components/Receipt";

const Payments = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [payment, setPayment] = useState<DataType[]>([]);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<any>({
    page: 0,
    search: null,
    className: null,
    planType: null,
    sort: null,
  });

  const hasFilter = () => {
    const { search, className, planType, sort } = searchFilter;
    return [search, className, planType, sort].some((value) => value !== null);
  };

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
      planType: null,
    }));
  };

  const clearFilters = () => {
    setValue("className", null);
    setValue("subscription", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      planType: null,
      className: null,
      search: null,
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
      render: (_, row) => (
        <div onClick={() => handleRowClick(row)}>
          <ModalOptions />
        </div>
      ),
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

  const handleRowClick = (data: DataType) => {
    setPaymentId(data?.key);
  };

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
      const newData = paymentData?.data?.content
        .filter((item: any) => item?.amount > 0)
        .map((item: any) => {
          return {
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
          };
        });

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
                {searchFilter?.planType !== null && (
                  <CancelIcon onClick={handleClearSubscription}>
                    &#8855;
                  </CancelIcon>
                )}
              </SelectContainer>
            )}
          />

          {/* <DatePickerInput width={400} label={"Sort By Date"} /> */}
          {searchFilter?.search !== "" && payment?.length > 0 && (
            <h6>
              {payment?.length} {payment?.length > 1 ? "Results" : "Result"}
            </h6>
          )}
        </div>

        {hasFilter() && <h5 onClick={clearFilters}>Clear filters</h5>}

        {/* <Button>
          Export
          <ExportIcon />
        </Button> */}
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
      <Modal
        cancel={handleCancel}
        width={window.innerWidth < 768 ? "80%" : "50%"}
      >
        <Receipt id={paymentId} />
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

  h5 {
    font-size: 0.8rem;
    font-weight: 600;
    color: red;
    transition: all 0.3s ease;
    &:hover {
      cursor: pointer;
      color: white;
      padding: 5px 10px;
      background-color: red;
      text-align: center;
      border-radius: 6px;
    }
  }

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

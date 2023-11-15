import { useEffect, useMemo, useState } from "react";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import styled from "styled-components";
import {
  DatePickerInput,
  SearchInput,
  SelectInput,
} from "../../../../../../../Ui_elements";
import { TableElement } from "../../../../../../../Ui_elements/Table/Table";
import { ColumnsType } from "antd/es/table";
import { getAllClassesUrl, getLeaderboardUrl } from "../../../../../../../Urls";
import { useApiGet } from "../../../../../../../custom-hooks";
import { UserDetails } from "../MainPage/Components/UserDetails";
import { debounce } from "lodash";
import {
  formatOptions,
  generateQueryKey,
} from "../../../../../../../utils/utilFns";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

interface DataType {
  key: string;
  name: string;
  username: string;
  class: string;
  phoneNumber: number;
  image: string;
  _id: string;
  index: number;
}

export const Leaderboard = () => {
  const [student, setStudent] = useState<any>([]);
  const [winner, setWinner] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<any>({
    page: 0,
    pageSize: 10,
    query: null,
    className: null,
    endDate: null,
    startDate: null,
  });

  const { control, setValue } = useForm();
  const hasFilter = () => {
    const { query, className, endDate, startDate } = searchFilter;
    return [query, className, endDate, startDate].some(
      (value) => value !== null
    );
  };

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      query: value,
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

  const handleFromDateChange = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      startDate: dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    }));
  };

  const handleToDateChange = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      endDate: dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    }));
  };

  const handleClearClass = () => {
    setSearchFilter((prev: any) => ({
      ...prev,
      className: null,
    }));
  };
  const handleClearFromDate = () => {
    setSearchFilter((prev: any) => ({
      ...prev,
      startDate: null,
    }));
  };

  const handleClearEndDate = () => {
    setSearchFilter((prev: any) => ({
      ...prev,
      endDate: null,
    }));
  };

  const clearFilters = () => {
    setSearchFilter((prev: any) => ({
      ...prev,
      query: null,
      className: null,
      fromDate: null,
      endDate: null,
    }));
  };

  const {
    data: leaderboardData,
    isLoading: isLoadingLeaderboardData,
    isFetching: isFetchingLeaderboardData,
    refetch: fetchLeader,
  } = useApiGet(
    [generateQueryKey("Leaderboard-data", searchFilter)],
    () => getLeaderboardUrl(searchFilter),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      // cacheTime: 0,
    }
  );

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

  useEffect(() => {
    if (leaderboardData) {
      setStudent(() =>
        leaderboardData?.data?.content.map((item: any, index: number) => ({
          key: item?.student?._id,
          index: index,
          name: `${item?.student?.firstName} ${item?.student?.lastName}`,
          username: item?.student?.userName,
          phoneNumber: item?.student?.phoneNumber,
          points: item?.score,
          class: item?.className,
          image: item?.student?.profileImageUrl,
        }))
      );
      setWinner(() => leaderboardData?.data?.winner?.student?._id);
    }
  }, [leaderboardData]);

  const headerStyle = {
    color: "gray",
    fontSize: "12px",
    fontWeight: 700,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (name: string, record: DataType) => {
        return (
          <UserDetails
            winner={winner}
            index={record?.index}
            image={record.image}
            name={name}
            id={record.key}
          />
        );
      },
    },
    {
      title: "POINTS",
      dataIndex: "points",
      key: "points",
      ellipsis: true,
    },
    {
      title: "USERNAME",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    {
      title: "CLASS",
      dataIndex: "class",
      key: "class",
      ellipsis: true,
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
  ];

  const updatedColumns = columns.map((column: any) => {
    let updatedColumn = { ...column };
    switch (column.dataIndex) {
      case "name":
        updatedColumn.width = "25%";
        break;
      case "points":
        updatedColumn.width = "15%";
        break;
      case "username":
        updatedColumn.width = "15%";
        break;
      case "class":
        updatedColumn.width = "10";
        break;
      default:
        break;
    }
    updatedColumn.title = <h5 style={headerStyle}>{column.title}</h5>;
    return updatedColumn;
  });

  return (
    <Container>
      <UtilHolder>
        <div>
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
                  defaultValue={"Select a class"}
                  isLoading={isLoadingClasses}
                />
                {typeof searchFilter?.className === "string" && (
                  <CancelIcon onClick={handleClearClass}>&#8855;</CancelIcon>
                )}
              </SelectContainer>
            )}
          />

          <SelectContainer>
            <DatePickerInput
              hint={"From Date"}
              onChange={handleFromDateChange}
            />
            {typeof searchFilter?.startDate === "string" && (
              <CancelIcon onClick={handleClearFromDate}>&#8855;</CancelIcon>
            )}
          </SelectContainer>

          <SelectContainer>
            <DatePickerInput hint={"To Date"} onChange={handleToDateChange} />

            {typeof searchFilter?.endDate === "string" && (
              <CancelIcon onClick={handleClearEndDate}>&#8855;</CancelIcon>
            )}
          </SelectContainer>
        </div>

        <div>
          <SearchInput onSearch={handleSearchFilter} />
        </div>

        {hasFilter() && <h5 onClick={clearFilters}>Clear filters</h5>}
      </UtilHolder>

      <Content>
        <TableElement
          data={student || null}
          loading={isLoadingLeaderboardData || isFetchingLeaderboardData}
          pagination
          columns={updatedColumns}
          paginationData={leaderboardData?.data?.pagination}
          fetchFunction={getLeaderboardUrl}
          fetchAction={fetchLeader}
          setSearchFilter={setSearchFilter}
          searchFilter={searchFilter}
        />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const UtilHolder = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    &::last-child {
      width: 50%;
    }
    @media ${devices.tabletL} {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-top: 15px;
    }
  }

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
    input {
      width: fill !important;
    }
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Content = styled.section``;

const CancelIcon = styled.div`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
`;

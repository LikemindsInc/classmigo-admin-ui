import { Divider } from "@mui/material";
import { ColumnsType } from "antd/es/table";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { DatePickerInput } from "../../../../../../Ui_elements";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import { TableElement } from "../../../../../../Ui_elements/Table/Table";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import dayjs from "dayjs";

export const RefDetails = ({
  refData,
  user,
  block,
  unblock,
  isFetchingRefs,
  isActive,
  setRefFilter,
  setSearchFilter,
  searchFilter,
  setUser,
  setIsActive,
  setCode,
}: any) => {
  const headerStyle = {
    color: "gray",
    fontSize: "12px",
    fontWeight: 700,
  };

  interface DataType {
    key: string;
    code: string;
    email: string;
    fullName: string;
    isActive: boolean;
    isVerified: boolean;
    lga: string;
    phoneNumber: string;
    state: string;
    studentReferred: any;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "NAME",
      dataIndex: "fullName",
      key: "fullName",
      ellipsis: true,
      render(_, row) {
        return (
          <p>
            {row?.studentReferred?.firstName} {row?.studentReferred?.lastName}
          </p>
        );
      },
    },
    {
      title: "REWARD POINTS",
      dataIndex: "rewardPoints",
      key: "rewardPoints",
      ellipsis: true,
      render(_, row) {
        return <p>{row?.studentReferred?.rewardPoint}</p>;
      },
    },
    {
      title: "LEADERBOARD SCORE",
      dataIndex: "leaderBoardScore",
      key: "leaderBoardScore",
      ellipsis: true,
      render(_, row) {
        return <p>{row?.studentReferred?.leaderBoardScore}</p>;
      },
    },
  ];

  const updatedColumnns = columns.map((column: any) => {
    let updatedColumn = { ...column };
    switch (column.dataIndex) {
      case "fullName":
        updatedColumn.width = "33%";
        break;
      case "rewardPoints":
        updatedColumn.width = "33%";
        break;
      case "leaderBoardScore":
        updatedColumn.width = "33%";
        break;
      default:
        break;
    }
    updatedColumn.title = <h5 style={headerStyle}>{column.title}</h5>;
    return updatedColumn;
  });

  const handleClearEndDate = () => {
    setSearchFilter((prev: any) => ({
      ...prev,
      endDate: null,
    }));
  };

  const handleFromDateChange = (value: any) => {
    setRefFilter((prev: any) => ({
      ...prev,
      startDate: dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    }));
  };

  const handleClearFromDate = () => {
    setRefFilter((prev: any) => ({
      ...prev,
      startDate: null,
    }));
  };

  const handleToDateChange = (value: any) => {
    setRefFilter((prev: any) => ({
      ...prev,
      endDate: dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    }));
  };

  return (
    <Container>
      <UserInfo>
        <h6>{user?.fullName}</h6>
        <Divider />
        <div>
          <div>
            <Title>Email:</Title>
            <p>{user?.email}</p>
          </div>
          <div>
            <Title>Phone number:</Title>
            <p>{user?.phoneNumber}</p>
          </div>
          <div>
            <Title>Country:</Title>
            <p>{user?.country}</p>
          </div>
          <div>
            <Title>State:</Title>
            <p>{user?.state}</p>
          </div>
          <div>
            <Title>LGA:</Title>
            <p>{user?.lga}</p>
          </div>
          <div>
            <Title>Ref code:</Title>
            <p>{user?.code}</p>
          </div>
        </div>
      </UserInfo>

      <Details>
        <div>
          <h4>All referrals</h4>

          <SelectHolder>
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
          </SelectHolder>

          <div>
            <TableElement
              loading={isFetchingRefs}
              data={refData?.content}
              columns={updatedColumnns}
              pagination
              paginationData={refData?.data?.pagination}
              // fetchFunction={() => getUserReferalsUrl(code)}
              // fetchAction={fetchData}
              setSearchFilter={setSearchFilter}
              searchFilter={searchFilter}
              setUser={setUser}
              setUserId={setCode}
              setIsActive={setIsActive}
              //   paginationData={pagination}
            />
          </div>
        </div>

        <div>
          <h4>Status</h4>
          <SwitchContainer>
            <p>{isActive ? "Block" : "Unblock"}</p>
            <SwitchElement
              activeState={isActive}
              handleChange={() => (isActive ? block() : unblock())}
            />
          </SwitchContainer>
        </div>
      </Details>
    </Container>
  );
};

const Container = styled.div``;
const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2rem;
  > div {
    width: 100%;
    background-color: var(--hover-color);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    div {
      p {
        font-size: 1.1rem;
        margin-top: 1rem;

        @media ${devices.tabletL} {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1rem;
  @media ${devices.tabletL} {
    font-size: 0.8rem;
  }
`;

const Details = styled.div`
  > div {
    margin-top: 2rem;
    h6 {
      font-weight: 600;
      font-size: 0.9rem;
    }
    span {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  h4 {
    margin-bottom: 0.6rem;
  }

  > div:first-child {
    div {
      margin-top: 1rem;
    }
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center !important;
  gap: 10px;
  label{
    margin-top: 10px !important;
  }
`;

const SelectHolder = styled.div`
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

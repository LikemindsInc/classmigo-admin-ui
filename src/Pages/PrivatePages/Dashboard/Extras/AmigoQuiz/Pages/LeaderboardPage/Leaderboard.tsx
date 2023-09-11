import React, { useEffect, useState } from "react";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import styled from "styled-components";
import {
  DatePickerInput,
  SearchInput,
  SelectInput,
} from "../../../../../../../Ui_elements";
import { TableElement } from "../../../../../../../Ui_elements/Table/Table";
import { ColumnsType } from "antd/es/table";
import { getStudentDataUrl } from "../../../../../../../Urls";
import { useApiGet } from "../../../../../../../custom-hooks";
import { UserDetails } from "../MainPage/Components/UserDetails";
import { IParent, ISubscription } from "@appModel";

interface DataType {
  key: string;
  name: string;
  username: string;
  class: string;
  phoneNumber: number;
  status: string;
  subscription: ISubscription[];
  image: string;
  _id: string;
  isActive: boolean;
  parent?: IParent | null;
}

export const Leaderboard = () => {
  const [student, setStudent] = useState<any>([]);

  const {
    data: studentData,
    isLoading: isLoadingStudentData,
    isFetching: isFetchingStudentData,
    refetch: fetchStudent,
  } = useApiGet(["lala"], () => getStudentDataUrl(), {
    refetchOnWindowFocus: false,
    enabled: true,
    cacheTime: 0,
  });

  useEffect(() => {
    if (studentData) {
      setStudent(() =>
        studentData?.data?.content.map((item: any) => ({
          key: item._id,
          name: `${item.firstName} ${item.lastName}`,
          username: item.userName,
          phoneNumber: item.phoneNumber,
          class:
            (item.class && item.class.length > 0
              ? item.class.map((classItem: any) => classItem.name)
              : "" || null) || "",
          status: item.isActive ? "Active" : "Inactive",
          isActive: item.isActive,
          subscription: item.subcription,
          parent: item.parent,
          image: item.image,
        }))
      );
    }
  }, [studentData]);

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
      render: (name: string, record: DataType) => (
        <UserDetails image={record.image} name={name} />
      ),
    },
    {
      title: "USERNAME",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
  ];

  const updatedColumns = columns.map((column: any) => {
    let updatedColumn = { ...column };
    switch (column.dataIndex) {
      case "name":
        updatedColumn.width = "25%";
        break;
      case "phoneNumber":
        updatedColumn.width = "15%";
        break;
      case "subscription":
        updatedColumn.width = "15%";
        break;
      case "status":
        updatedColumn.width = "10%";
        break;
      case "username":
        updatedColumn.width = "15";
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
          <SelectContainer>
            <SelectInput
              options={[]}
              defaultValue={"Select a class"}
              width={200}
              isLoading={false}
            />
          </SelectContainer>

          <SelectContainer>
            <DatePickerInput />
          </SelectContainer>
        </div>

        <SearchContainer>
          <SearchInput />
        </SearchContainer>
      </UtilHolder>

      <Content>
        <TableElement
          data={student || null}
          pagination
          paginationData={studentData?.data?.pagination}
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
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 300px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const Content = styled.section``;

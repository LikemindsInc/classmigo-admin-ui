import { IParent, ISubscription } from "@appModel";
import { ColumnsType } from "antd/es/table";
import React from "react";
import styled from "styled-components";
import { Options } from "../../../../../../Ui_elements";
import { TableElement } from "../../../../../../Ui_elements/Table/Table";
import { UserDetails } from "./UserDetails";

interface TableProps {
  columns: any;
  data: any;
  paginationData: any;
  loading: boolean;
  pagination: number;
  setUser: () => void;
  setIsActive: () => void
  setUserId:()=>void
  fetchFunction?: () => void;
  fetchAction?: () => void;
}

const headerStyle = {
  color: "gray",
  fontSize: "12px",
  fontWeight: 700,
};


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




export const Table = ({
  loading,
  columns,
  data,
  pagination,
  paginationData,
  setUser,
  setUserId,
  setIsActive,
  fetchFunction,
  fetchAction,
}: TableProps) => {



  const handleRowClick = (data: DataType) => {
  // setUser(data);
  // setUserId(data?.key);
  // setIsActive(data?.isActive);
  };


  const column: ColumnsType<DataType> = [
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
    {
      title: "SUBSCRIPTION",
      dataIndex: "subscription",
      key: "subscription",
      ellipsis: true,
      render: (data: ISubscription[]) => {
        return (
          <div style={{ maxWidth: 300 }}>
            {data.map((item) => (
              <SubTag>{item.className} </SubTag>
            ))}
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "options",
      key: "options",
      ellipsis: true,
      render: (data, row) => (
        <div onClick={() => handleRowClick(row)}>
          <Options />
        </div>
      ),
    },
  ];
  const updatedColumns = column.map((column: any) => {
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
    <TableElement
      loading={loading}
      columns={columns}
      data={data}
      pagination={pagination}
      paginationData={paginationData}
      fetchFunction={fetchFunction}
      fetchAction={fetchAction}
    />
  );
};


const SubTag = styled.div`
  background-color: var(--hover-color);
  width: fit-content;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.7rem;
  display: inline;
  margin: 0 5px;
`;

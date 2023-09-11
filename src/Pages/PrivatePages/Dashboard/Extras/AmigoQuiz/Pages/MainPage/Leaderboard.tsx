import React, { useEffect, useState } from "react";
import { TableElement } from "../../../../../../../Ui_elements/Table/Table";
import { useApiGet } from "../../../../../../../custom-hooks";
import { getStudentDataUrl } from "../../../../../../../Urls";
import { ColumnsType } from "antd/es/table";
import { IParent, ISubscription } from "@appModel";
import { UserDetails } from "./Components/UserDetails";




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




export const QuizLeaderboard = () => {
  const [student, setStudent] = useState<any>([]);

  const {
    data: studentData,
    isLoading: isLoadingStudentData,
    isFetching: isFetchingStudentData,
    refetch: fetchStudent,
  } = useApiGet(
    ["lala"],
    () => getStudentDataUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      cacheTime:0
    }
    );
  


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
  return <TableElement
    data={student || null}
    pagination
    paginationData={studentData?.data?.pagination}
  />;
};

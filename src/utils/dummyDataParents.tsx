import { ColumnsType } from "antd/es/table";
import { UserDetails } from "../Pages/PrivatePages/Dashboard/Users/Parents/Components/UserDetails";
import { Options } from "../Ui_elements";

interface DataType {
  key: string;
  name: string;
  email: string;
  phoneNumber: number;
  status: string;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <UserDetails name={name} />
    ),
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "PHONE NUMBER",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "",
    dataIndex: "options",
    key: "options",
    render: () => (
      <Options/>
    ),
  },
];

export const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "2",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "3",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "4",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "5",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "6",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "7",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "8",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "9",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "10",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "11",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
  {
    key: "12",
    name: "John Brown",
    email: "john@classmigo.com",
    phoneNumber: 8089773098,
    status: "Verified",
  },
];

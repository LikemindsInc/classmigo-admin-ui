import { Table } from "antd";

interface TableProps {
  columns: any;
  data: any;
}

export const TableElement = ({ columns, data }: TableProps) => {
  return (
    <Table
      sortDirections={["ascend"]}
      size="large"
      // sticky={true}
      columns={columns}
      dataSource={data}
      scroll={{x:"max-content"}}
    />
  );
};

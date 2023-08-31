import React from "react";
import { TableElement } from "../../../../../../Ui_elements/Table/Table";

interface TableProps {
  columns: any;
  data: any;
  paginationData: any;
  loading: boolean;
  pagination: number;
  fetchFunction?: () => void;
  fetchAction?: () => void;
}
export const Table = ({
  loading,
  columns,
  data,
  pagination,
  paginationData,
  fetchFunction,
  fetchAction,
}: TableProps) => {
  
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

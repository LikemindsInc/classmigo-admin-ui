import { Table } from "antd";
import { useEffect, useState } from "react";

interface TableProps {
  columns: any;
  data: any;
  paginationData: any;
  loading: boolean;
  searchFilter: any
  setSearchFilter:any
  fetchFunction?: () => void;
  fetchAction?:()=>void
}

export const TableElement = ({
  columns,
  data,
  paginationData,
  loading,
  fetchFunction,
  searchFilter,
  setSearchFilter,
  fetchAction
}: TableProps | any) => {
  const [pagination, setPagination] = useState<any>();

  useEffect(() => {
    if (paginationData) {
      setPagination({
        current: paginationData?.page,
        pageSize: paginationData?.perPage,
        total: paginationData?.totalDocs
      });
    }
  }, [paginationData]);

  const handlePagination = (page: number) => {
    setSearchFilter((prev: any) => (
      {
        ...prev,
        page: page,
        pageSize: pagination?.pageSize
      }));
  };

  useEffect(() => {
    if (fetchFunction) {
      fetchAction();
      fetchFunction(searchFilter);
    }
  },[fetchAction, fetchFunction, searchFilter])

  return (
    <Table
      sortDirections={["ascend"]}
      pagination={pagination && {
        total: pagination.total,
        pageSize: pagination.pageSize,
        current: pagination.current,
        onChange: (page) => { handlePagination(page); },
      }}
      size="large"
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
    />
  );
};

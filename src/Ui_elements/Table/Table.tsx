import { Table } from "antd";
import { useEffect, useState } from "react";

interface TableProps {
  columns: any;
  data: any;
  paginationData: any;
  loading: boolean;
  fetchFunction?: () => void;
  fetchAction?:()=>void
}

export const TableElement = ({
  columns,
  data,
  paginationData,
  loading,
  fetchFunction,
  fetchAction
}: TableProps | any) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total:paginationData?.numberOfPages
  });

  useEffect(() => {
    if (paginationData) {
      setPagination((prevPagination: any) => ({
        ...prevPagination,
        pageSize: paginationData.totalDocs,
      }));
    }
  }, [paginationData]);

  const handlePagination = (page: number) => {
    console.log(page,"page")
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
    }));

    if (fetchFunction) {
      fetchAction()
      fetchFunction(page, pagination.pageSize);
    }
  };

  return (
    <Table
      sortDirections={["ascend"]}
      pagination={{
        total: pagination.total,
        pageSize: 10,
        current: pagination.current,
        onChange: (page) => {handlePagination(page)},
      }}
      size="large"
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
    />
  );
};

import { useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { DrawerContext } from "../../../../../../../Contexts/Contexts";
import { useApiGet, useApiPost } from "../../../../../../../custom-hooks";
import {
  Options,
  SearchInput,
} from "../../../../../../../Ui_elements";
import { TableElement } from "../../../../../../../Ui_elements/Table/Table";
import {
  blockReferalsUrl,
  getReferalDataUrl,
  getUserReferalsUrl,
  unblockReferalsUrl,
} from "../../../../../../../Urls";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { generateQueryKey } from "../../../../../../../utils/utilFns";
import { RefDetails } from "../../Components/RefDetails";

interface DataType {
  key: string;
  code: string;
  country: string;
  email: string;
  fullName: string;
  isActive: boolean;
  isVerified: boolean;
  lga: string;
  phoneNumber: string;
  state: string;
}

export const ReferalTable = () => {
  //drawer handler
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const [referals, setReferals] = useState<DataType | any>([]);
  const [user, setUser] = useState<DataType | null>(null);
  const [code, setCode] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [searchFilter, setSearchFilter] = useState<any>({
    page: 0,
    pageSize: 10,
    state: null,
  });
  const [refFilter, setRefFilter] = useState<any>({
    startDate: null,
    endDate:null,
    page: 0,
    pageSize: 10,
    state: null,
  });
  const queryClient = useQueryClient();

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter({
      ...searchFilter,
      state: value,
    });
  }, 1500);

  const handleSearchFilter = (e: any) => {
    const searchValue = e.target.value;
    debouncedSearchFilterUpdate(searchValue.trim());
  };

  useEffect(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);

  const handleSuccess = () => {
    toast.success(
      isActive ? `Successfully blocked` : `Successfully unblocked`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      }
    );

    queryClient.invalidateQueries([
      generateQueryKey("Referal-data", searchFilter),
    ]);
    setIsActive(!isActive);
  };

  const handleError = () => {
    toast.error(`Something went wrong, could not update`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const {
    data: referalData,
    isLoading: isLoadingReferalData,
    isFetching: isFetchingReferalData,
    refetch: fetchStudent,
  } = useApiGet(
    [generateQueryKey("Referal-data", searchFilter)],
    () => getReferalDataUrl(searchFilter),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const {
    data: refData,
    isFetching: isFetchingRefs,
    isLoading: isLoadingRefs,
    isError,
    refetch: fetchData,
  } = useApiGet(
    [generateQueryKey("ref-user", refFilter) ],
    () => getUserReferalsUrl(code, refFilter), {
    refetchOnWindowFocus: false,
    enabled: !!code,
  });

  const { mutate: block } = useApiPost(
    () => blockReferalsUrl(code),
    handleSuccess,
    handleError
  );

  const { mutate: unblock } = useApiPost(
    () => unblockReferalsUrl(code),
    handleSuccess,
    handleError
  );

  useEffect(() => {
    if (referalData) {
      setReferals(() =>
        referalData?.data?.content.content.map((item: any) => ({
          key: item._id,
          code: item.code,
          country: item.country,
          email: item.email,
          fullName: item.fullName,
          isActive: item.isActive,
          isVerified: item.isVerified,
          lga: item.lga,
          phoneNumber: item.phoneNumber,
          state: item.state,
        }))
      );
    }
  }, [searchFilter, referalData]);

  useEffect(() => {
    if (code) {
      fetchData();
    }
  }, [code, fetchData]);

  const headerStyle = {
    color: "gray",
    fontSize: "12px",
    fontWeight: 700,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "NAME",
      dataIndex: "fullName",
      key: "fullName",
      ellipsis: true,
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "STATE",
      dataIndex: "state",
      key: "state",
      ellipsis: true,
    },
    {
      title: "LGA",
      dataIndex: "lga",
      key: "lga",
      ellipsis: true,
    },
    {
      title: "STATUS",
      dataIndex: "isActive",
      key: "isActive",
      ellipsis: true,
      render(row) {
        return (
          <p style={{ fontSize: "14px" }}>{row ? "Active" : "Inactive"}</p>
        );
      },
    },
    {
      title: "VERIFICATION",
      dataIndex: "isVerified",
      key: "isVerified",
      ellipsis: true,
      render(row) {
        return (
          <p style={{ fontSize: "14px" }}>
            {row ? "Verified" : "Not verified"}
          </p>
        );
      },
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "CODE",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "options",
      key: "options",
      ellipsis: true,
      render: (_, row) => (
        <div onClick={() => handleRowClick(row)}>
          <Options />
        </div>
      ),
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

  const handleRowClick = (data: DataType) => {
    setUser(data);
    setCode(data?.code);
    setIsActive(data?.isActive);
    setOpenDrawer(true);
  };

  return (
    <Container>
      <UtilsHolder>
        <div>
          <SearchInput onSearch={handleSearchFilter} />
          {searchFilter?.state !== "" && referals?.length > 0 && (
            <h6>
              {referals?.length} {referals?.length > 1 ? "Results" : "Result"}
            </h6>
          )}
        </div>
      </UtilsHolder>
      <TableElement
        loading={isLoadingReferalData || isFetchingReferalData}
        columns={updatedColumns}
        data={referals || null}
        pagination
        paginationData={referalData?.data?.pagination}
        fetchFunction={getReferalDataUrl}
        fetchAction={fetchStudent}
        setSearchFilter={setSearchFilter}
        searchFilter={searchFilter}
        setUser={setUser}
        setUserId={setCode}
        setIsActive={setIsActive}
      />
      <Drawer
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closeIcon={false}
        width={window.innerWidth < 768 ? "80%" : "80%"}
      >
        <DrawerContentContainer>
          {isError ? (
            <div>
              <p>Something went wrong, could not fetch user</p>
            </div>
          ) : (
            <RefDetails
              refData={refData?.data}
              code={code}
              user={user}
              block={block}
              unblock={unblock}
              isFetchingRefs={isFetchingRefs}
              isLoadingRefs={isLoadingRefs}
              isActive={isActive}
                fetchData={fetchData}
  
                setRefFilter={setRefFilter}
              setSearchFilter={setSearchFilter}
              searchFilter={searchFilter}
              setUser={setUser}
              setUserId={setCode}
              setIsActive={setIsActive}
              setCode={setCode}
            />
          )}
        </DrawerContentContainer>
      </Drawer>
    </Container>
  );
};

export const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;
  margin-top: -3rem;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: auto;
  align-items: center;
  justify-content: space-between;

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
    flex-wrap: wrap;

    input {
      width: fill !important;
    }
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 80%;

    @media ${devices.tabletL} {
      flex-direction: column;
      width: 100%;
    }

    h6 {
      font-size: clamp(1rem, 1vw, 1rem);
      font-weight: 700;
      width: 100%;
    }
  }
  button {
    background-color: var(--primary-color);
    padding: 0.6rem;
    color: white;
    display: flex;
    font-size: 0.8rem;
    outline: none;
    border: none;
    border-radius: 12px;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    cursor: pointer;

    @media ${devices.tabletL} {
      margin-top: 5%;
      width: 100%;
    }
  }
`;

const DrawerContentContainer = styled.aside``;

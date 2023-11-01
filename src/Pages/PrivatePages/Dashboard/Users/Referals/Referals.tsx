import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  Options,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { Drawer, Empty } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { TableElement } from "../../../../../Ui_elements/Table/Table";
import { DrawerContext } from "../../../../../Contexts/Contexts";
import { useAPiPut, useApiGet } from "../../../../../custom-hooks";
import { UserDetails } from "./Components/UserDetails";
import { ColumnsType } from "antd/es/table";
import { IParent, ISubscription } from "@appModel";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { getAllClassesUrl, getReferalDataUrl } from "../../../../../Urls";
import { formatOptions, generateQueryKey } from "../../../../../utils/utilFns";
import { Avatar } from "@mui/material";
import { SwitchElement } from "../../../../../Ui_elements/Switch/Switch";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";

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

const Students = () => {
  //drawer handler
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const [referals, setReferals] = useState<any>([]);
  const [user, setUser] = useState<DataType | null>(null);
  const [userId, setUserId] = useState<any>(null);
  const [isActive, setIsActive] = useState(user?.isActive);
  const [openModal, setOpenModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState<any>({
    page: 0,
    // pageSize: 10,
    search: null,
    className: null,
    isSubscribed: null,
    isActive: null,
  });
  const hasFilter = () => {
    const { search, className, isSubscribed, isActive } = searchFilter;
    return [search, className, isSubscribed, isActive].some(
      (value) => value !== null
    );
  };
  const { control, setValue } = useForm();

  //util functions

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      search: value,
    }));
  }, 1500);

  const handleSearchFilter = (e: any) => {
    const searchValue = e.target.value;
    debouncedSearchFilterUpdate(searchValue.trim());
  };

  const onSelectVerified = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      isActive: value?.value,
    }));
  };

  const onSelectSubscription = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      isSubscribed: value?.value,
    }));
  };

  const onSelectClassname = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      className: value?.value,
    }));
  };

  const handleClearClass = () => {
    setValue("className", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      className: null,
    }));
  };

  const handleClearStatus = () => {
    setValue("status", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      isActive: null,
    }));
  };

  const handleClearSubscription = () => {
    setValue("subscription", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      isSubscribed: null,
    }));
  };

  const clearFilters = () => {
    setValue("className", null);
    setValue("status", null);
    setValue("subscription", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      search: null,
      className: null,
      isSubscribed: null,
      isActive: null,
    }));
  };

  // const onToggleActive = () => {
  //   const requestBody = {
  //     isActive: isActive ? false : true,
  //   };
  //   toggleStudent(requestBody);
  // };

  useEffect(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);

  //Api Call

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const handleSuccess = () => {
    toast.success(
      isActive ? `Successfully deactivated` : `Successfully activated`,
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

  // const { mutate: toggleStudent } = useAPiPut(
  //   (_: any) => toggleStudentUrl(_, userId),
  //   handleSuccess,
  //   handleError,
  //   ["Referal-data"]
  // );

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

  // const { refetch: link, isLoading: isUnlinking } = useApiGet(
  //   ["unlink-parent"],
  //   () => unlinkParentUrl(user?.key, user?.parent?._id),
  //   {
  //     enabled: false,
  //     refetchOnWindowFocus: false,
  //     onSuccess: () => {
  //       toast.success(`Successfully unlinked Parent`, {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         theme: "light",
  //       });
  //       setOpenDrawer(false);
  //       fetchStudent();
  //     },
  //     onError: () => {
  //       toast.error(`Something went wrong, could not unlink parent`, {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //         theme: "light",
  //       });
  //     },
  //   }
  // );

  useEffect(() => {
    setIsActive(user?.isActive || false);
  }, [user]);

  useEffect(() => {
    if (referalData) {
      setReferals(() =>
        referalData?.data?.content.map((item: any) => ({
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
  }, [searchFilter, referalData]);

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
    {
      title: "SUBSCRIPTION",
      dataIndex: "subscription",
      key: "subscription",
      ellipsis: true,
      render: (data: ISubscription[]) => {
        return (
          <div
            style={{
              maxWidth: 300,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
    setUserId(data?.key);
    setIsActive(data?.isActive);
  };

  const confirmUnlink = () => {
    setOpenModal(true);
  };

  const statusOptions = [
    {
      value: true,
      label: "Active",
    },
    {
      value: false,
      label: "Inactive",
    },
  ];

  const subscribeOptions = [
    {
      value: true,
      label: "Subscribed",
    },
    {
      value: false,
      label: "Unsubscribed",
    },
  ];

  return (
    <Container>
      <UtilsHolder>
        <div>
          {/* <SearchInput onSearch={handleSearchFilter} /> */}
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  id="state"
                  options={statusOptions}
                  onChange={onSelectVerified}
                  defaultValue="Select State"
                  // width={200}
                />
                {typeof searchFilter?.isActive === "boolean" && (
                  <CancelIcon onClick={handleClearStatus}>&#8855;</CancelIcon>
                )}
              </SelectContainer>
            )}
          />

          <Controller
            name="lga"
            control={control}
            render={({ field }) => (
              <SelectContainer>
                <SelectInput
                  {...field}
                  id="lga"
                  options={statusOptions}
                  onChange={onSelectVerified}
                  defaultValue="Select LGA"
                  // width={200}
                />
                {typeof searchFilter?.isActive === "boolean" && (
                  <CancelIcon onClick={handleClearStatus}>&#8855;</CancelIcon>
                )}
              </SelectContainer>
            )}
          />

          {searchFilter?.search !== "" && referals?.length > 0 && (
            <h6>
              {referals?.length} {referals?.length > 1 ? "Results" : "Result"}
            </h6>
          )}
        </div>
        {hasFilter() && <h5 onClick={clearFilters}>Clear filters</h5>}

        {/* <button>
          Export
          <ExportIcon />
        </button> */}
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
        setUserId={setUserId}
        setIsActive={setIsActive}
      />
      <Drawer
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closeIcon={false}
        width={window.innerWidth < 768 ? "80%" : "25%"}
      >
        <DrawerContentContainer>
          {/* <CancelContainer>
            <CancelIcon />
          </CancelContainer> */}
          <UserInfo>
            <Avatar
              sx={{
                backgroundColor: "var(--hover-color)",
                color: "black",
              }}
              alt={`${user?.name}`}
            />
            <div>
              <p>{user?.name}</p>
              <p>
                {user?.subscription.map((item, i) => (
                  <span key={i} style={{ paddingLeft: 4 }}>
                    {item.className}
                  </span>
                ))}
              </p>
            </div>
          </UserInfo>

          <Details>
            <div>
              <h4>Subscription Details</h4>

              {user?.subscription.map((item, i) => (
                <div key={i}>
                  <h6>{item.className}</h6>

                  <div>
                    <p>
                      Subscription Started:{" "}
                      {moment(item.dateSubscribed).format("DD/MM/YYYY")}
                    </p>
                    <p>
                      Subscription End:{" "}
                      {moment(item.nextDueDate).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h4>Status</h4>
              <SwitchContainer>
                <p>{isActive ? "Deactivate User" : "Activate User"}</p>
                <SwitchElement
                  activeState={isActive}
                  // handleChange={onToggleActive}
                />
              </SwitchContainer>
            </div>

            <ParentContainer>
              <h4>Parent</h4>
              {user?.parent ? (
                <>
                  <h5>{user?.parent?.fullName}</h5>
                  <p>{user?.parent?.email}</p>
                  <p>{user?.parent?.phoneNumber}</p>
                  <ButtonElement
                    outline
                    width={84}
                    label={"Unlink"}
                    onClick={confirmUnlink}
                  />
                </>
              ) : (
                <Empty />
              )}
            </ParentContainer>
          </Details>
        </DrawerContentContainer>
      </Drawer>

      <Modal
        title="Delete Quiz?"
        okText="Delete"
        cancelText="Cancel"
        cancel={() => setOpenModal(false)}
        openState={openModal}
      >
        <ModalContent>
          <p>Are you sure you want to unlink?</p>
          <div>
            <ButtonElement
              outline
              label="Cancel"
              onClick={() => setOpenModal(false)}
            />
            <ButtonElement
              label="Unlink"
              // onClick={() => link()}
              // isLoading={isUnlinking}
            />
          </div>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Students;

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

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const Modal = styled(CenteredDialog)``;

const ModalContent = styled.div`
  text-align: center;
  p {
    margin: 10% 0;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 50%;
  }
  div {
    margin-top: 1rem;
    span {
      font-size: 0.8rem;
    }
    p {
      font-weight: 700;
      font-size: 1rem;
    }
  }
`;

const Details = styled.div`
  > div {
    margin-top: 2rem;
    h6 {
      font-weight: 600;
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

const ParentContainer = styled.div`
  margin-top: 2rem;

  h5 {
    margin-bottom: 0.6rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubTag = styled.div`
  background-color: var(--hover-color);
  width: fit-content;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.7rem;
  display: inline;
  margin: 3px 5px;
`;

const SelectContainer = styled.div`
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

import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  InputElement,
  Options,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { CancelIcon, ExportIcon } from "../../../../../Assets/Svgs";
import { Drawer, Empty, Switch, Tag } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { TableElement } from "../../../../../Ui_elements/Table/Table";
import { DrawerContext } from "../../../../../Contexts/Contexts";
import {
  getStudentDataUrl,
  toggleStudentUrl,
} from "../../../../../Urls/Students";
import { useAPiPut, useApiGet, useApiPost } from "../../../../../custom-hooks";
import { UserDetails } from "./Components/UserDetails";
import { ColumnsType } from "antd/es/table";
import { IParent, ISubscription } from "@appModel";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import {
  activateSubjectUrl,
  deactivateSubjectUrl,
  getAllClassesUrl,
} from "../../../../../Urls";
import { formatOptions } from "../../../../../utils/utilFns";
import { Avatar } from "@mui/material";
import { SwitchElement } from "../../../../../Ui_elements/Switch/Switch";
import { toast } from "react-toastify";
const Students = () => {
  //drawer handler
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const [student, setStudent] = useState<any>([]);
  const [user, setUser] = useState<DataType | null>(null);
  const [userId, setUserId] = useState<any>(null);
  const [isActive, setIsActive] = useState(user?.isActive);

  const { control, watch } = useForm();

  useEffect(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const allClasses = useMemo(
    () => formatOptions(classes?.data, "value", "name"),
    [classes?.data]
  );

  const handleSuccess = () => {
    toast.success(isActive ? `Successfully deactivated` : `Successfully activated`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
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
  const { mutate: toggleStudent, isLoading: isTogglingStudent } =
    useAPiPut(
      (_: any) => toggleStudentUrl(_, userId),
      handleSuccess,
      handleError,
      ["Student-data"]
    );

  const {
    data: studentData,
    isLoading: isLoadingStudentData,
    refetch: fetchStudent,
  } = useApiGet(["Student-data"], () => getStudentDataUrl(), {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    setIsActive(user?.isActive || false);
  }, [user]);

  useEffect(() => {
    if (studentData) {
      const newData = studentData?.data?.content.map((item: any) => ({
        key: item._id,
        name: `${item.firstName} ${item.lastName}`,
        username: item.userName,
        phoneNumber: item.phoneNumber,
        class:
          (item.class && item.class.length > 0
            ? item.class.map((classItem: any) => classItem.name)
            : "" || null) || "",
        status: item.isActive ? "Verified" : "Unverified",
        isActive: item.isActive,
        subscription: item.subcription,
        parent: item.parent,
        image: item.image,
      }));
      setStudent(newData);
    }
  }, [studentData]);

  const onToggleActive = () => {
    const requestBody = {
      isActive: isActive ? false : true,
    };
    toggleStudent(requestBody);
  };

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

  const statusOptions = [
    {
      value: 0,
      label: "Verified",
    },
    {
      value: 1,
      label: "Unverified",
    },
  ];

  const subscribeOptions = [
    {
      value: 0,
      label: "Subscribed",
    },
    {
      value: 1,
      label: "Unsubscribed",
    },
  ];

  //   <UtilsHolder>
  //   <div>
  //     <SearchInput />
  //     <Controller
  //       name="className"
  //       control={control}
  //       render={({ field }) => (
  //         <SelectInput
  //           {...field}
  //           options={allClasses}
  //           onChange={handleSearchFilter}
  //           defaultValue="Class"
  //           width={300}
  //         />
  //       )}
  //     />
  //     <Controller
  //       name="status"
  //       control={control}
  //       render={({ field }) => (
  //         <SelectInput
  //           {...field}
  //           options={statusOptions}
  //           onChange={handleSearchFilter}
  //           defaultValue="Status"
  //           width={300}
  //         />
  //       )}
  //     />

  //     <Controller
  //       name="className"
  //       control={control}
  //       render={({ field }) => (
  //         <SelectInput
  //           {...field}
  //           options={subscribeOptions}
  //           onChange={handleSearchFilter}
  //           defaultValue="Subscription"
  //           width={300}
  //         />
  //       )}
  //     />

  //     {/* <h6>2,500 Results</h6> */}
  //   </div>
  //   <button>
  //     Export
  //     <ExportIcon />
  //   </button>
  // </UtilsHolder>
  return (
    <Container>
      <TableElement
        loading={isLoadingStudentData}
        columns={updatedColumns}
        data={student || null}
        pagination
        paginationData={studentData?.data?.pagination}
        fetchFunction={getStudentDataUrl}
        fetchAction={fetchStudent}
      />

      <Drawer
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closeIcon={false}
        width={"25%"}
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
          {/* <UpdateDetails>
            <div>
              <InputElement placeholder="John Chukwuemeka" label="Name" />
              <ButtonElement width={84} outline label={"Update"} />
            </div>
            <div>
              <InputElement placeholder="08000000000" label="Phone number" />
              <ButtonElement label={"Update"} outline width={84} />
            </div>
          </UpdateDetails> */}

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
                  handleChange={onToggleActive}
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
                  <ButtonElement outline width={84} label={"Unlink"} />
                </>
              ) : (
                <Empty />
              )}
            </ParentContainer>
          </Details>
        </DrawerContentContainer>
      </Drawer>
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

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: auto;
  align-items: center;
  justify-content: space-between;

  @media ${devices.tabletL} {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 65%;

    @media ${devices.tabletL} {
      flex-direction: column;
      width: 100%;
    }

    h6 {
      font-size: clamp(1rem, 1vw, 1rem);
      font-weight: 700;
      width: fit-content;
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
    }
  }
`;

const DrawerContentContainer = styled.aside``;
// const CancelContainer = styled.section`
//   display: flex;
//   justify-content: flex-end;
// `;
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
const UpdateDetails = styled.div`
  width: 100%;
  > div {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-bottom: 2rem;
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
  margin: 0 5px;
`;

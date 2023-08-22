import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { Drawer, Empty, Switch } from "antd";
import { TableElement } from "../../../../../Ui_elements/Table/Table";
import { CancelIcon, ExportIcon } from "../../../../../Assets/Svgs";
import { ColumnsType } from "antd/es/table";
import {
  ButtonElement,
  InputElement,
  Options,
  SearchInput,
} from "../../../../../Ui_elements";
import { DrawerContext } from "../../../../../Contexts/Contexts";
import { useApiGet } from "../../../../../custom-hooks";
import { getParentDataUrl } from "../../../../../Urls";
import { UserDetails } from "./Components/UserDetails";
import { IStudent } from "@appModel";

const Parents = () => {
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const [parent, setParent] = useState<any>([]);

  const [user, setUser] = useState<DataType | null>(null);

  interface DataType {
    key: string;
    name: string;
    email: string;
    phoneNumber: number;
    status: string;
    dependents?: IStudent[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <UserDetails name={name} />,
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
      render: (value, data) => (
        <div onClick={() => handleRowItemClick(data)}>
          <Options />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const handleRowItemClick = (data: DataType) => {
    setUser(data);
  };

  const {
    data: parentData,
    isLoading: isLoadingParentData,
    refetch: fetchParent,
  } = useApiGet(["Parent data"], () => getParentDataUrl(), {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (parentData) {
      const newData = parentData?.data?.content.map((item: any) => ({
        key: item._id,
        name: item.fullName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        status: item.role,
        dependents: item.dependents,
      }));
      setParent(newData);
    }
  }, [parentData]);

  const headerStyle = {
    color: "gray",
    fontSize: "12px",
    fontWeight: 700,
  };
  const updatedColumns = columns.map((column: any) => {
    let updatedColumn = { ...column };

    switch (column.dataIndex) {
      case "name":
        updatedColumn.width = "25%";
        break;
      case "phoneNumber":
        updatedColumn.width = "25%";
        break;
      case "status":
        updatedColumn.width = "25%";
        break;
      case "email":
        updatedColumn.width = "25%";
        break;

      default:
        break;
    }
    updatedColumn.title = <h5 style={headerStyle}>{column.title}</h5>;
    return updatedColumn;
  });

  return (
    <Container>
      <UtilsHolder>
        <div>
          <SearchInput />
          <h6>2,500 Results</h6>
        </div>
        <button>
          Export
          <ExportIcon />
        </button>
      </UtilsHolder>
      <TableElement
        columns={updatedColumns}
        data={parent || null}
        loading={isLoadingParentData}
        pagination
        paginationData={parentData?.data?.pagination}
        fetchFunction={getParentDataUrl}
        fetchAction={fetchParent}
      />

      <Drawer
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closeIcon={false}
        width={"25%"}
      >
        <DrawerContentContainer>
          <CancelContainer>
            <CancelIcon />
          </CancelContainer>
          <UserInfo>
            <img
              src="https://media.istockphoto.com/id/1168369629/photo/happy-smiling-african-american-child-girl-yellow-background.webp?b=1&s=170667a&w=0&k=20&c=E0vD2JewKSB11Kq-pJVaBmMBJRNQu1Fuwodffs1d87o="
              alt=""
            />
            <div>
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </div>
          </UserInfo>
          <UpdateDetails>
            <div>
              <InputElement placeholder="John Chukwuemeka" label="Name" />
              <ButtonElement width={84} outline label={"Update"} />
            </div>
          </UpdateDetails>

          <Details>
            <StudentContainer>
              <h4>Dependents</h4>
              {user && user.dependents && user.dependents.length > 0 ? (
                user?.dependents?.map((item) => (
                  <div>
                    <h5>
                      {item.firstName} {item.lastName}
                    </h5>
                    <p>{item.phoneNumber}</p>
                    <ButtonElement outline width={84} label={"Unlink"} />
                  </div>
                ))
              ) : (
                <Empty />
              )}
            </StudentContainer>
          </Details>
        </DrawerContentContainer>
      </Drawer>
    </Container>
  );
};

export default Parents;

const Container = styled.section`
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
import { data } from '../../../../../utils/dummyDataStudents';

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
    width: 50%;

    @media ${devices.tabletL} {
      flex-direction: column;
      align-self: center;
      width: 100%;
    }

    h6 {
      font-size: clamp(1rem, 1vw, 1rem);
      font-weight: 700;
      width: 100%;

      @media ${devices.tabletL} {
        text-align: center;
      }
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
const CancelContainer = styled.section`
  display: flex;
  justify-content: flex-end;
`;
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
    button {
      margin-bottom: 7px;
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

const StudentContainer = styled.div`
  margin-top: 2rem;

  h5 {
    margin-bottom: 0.6rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

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
import { Drawer, Switch } from "antd";
import { useContext, useEffect, useState } from "react";
import { TableElement } from "../../../../../Ui_elements/Table/Table";
import { DrawerContext } from "../../../../../Contexts/Contexts";
import { getStudentDataUrl } from "../../../../../Urls/Students";
import { useApiGet } from "../../../../../custom-hooks";
import { UserDetails } from "./Components/UserDetails";
import { ColumnsType } from "antd/es/table";
const Students = () => {
  const handleSearchFilter = (value: string) => {};
  //drawer handler
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const [student, setStudent] = useState<any>([]);

  useEffect(() => {
    setOpenDrawer(false);
  }, [setOpenDrawer]);


  const {
    data: studentData,
    isLoading: isLoadingStudentData,
    refetch:fetchStudent
  } = useApiGet(
    ["Student data"],
    () => getStudentDataUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  useEffect(() => {
    if (studentData) {
      const newData = studentData?.data?.content.map((item: any) => ({
        key: item._id,
        name: `${item.firstName} ${item.lastName}`,
        username: item.userName,
        phoneNumber:item.phoneNumber,
        class: (item.class &&item.class.length > 0
          ? item.class.map((classItem: any) => classItem.name)
          : "" || null) || "",
        status: item.role,
        subscription: item.subcription,
        image:
          item.image ||
          "https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg?w=2000",
      }));
      setStudent(newData);
    }
  }, [studentData]);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
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
    subscription: string;
    image: string;
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
      title: "CLASS",
      dataIndex: "class",
      key: "class",
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
    },
    {
      title: "",
      dataIndex: "options",
      key: "options",
      ellipsis: true,
      render: () => <Options />,
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

  const classOptions = [
    {
      value: 0,
      label: "Primary 1",
    },
    {
      value: 1,
      label: "Primary 2",
    },
    {
      value: 2,
      label: "Primary 3",
    },
    {
      value: 3,
      label: "Primary 4",
    },
    {
      value: 4,
      label: "Primary 5",
    },
    {
      value: 5,
      label: "Primary 6",
    },
    {
      value: 6,
      label: "Primary 2",
    },
    {
      value: 7,
      label: "JSS1",
    },
    {
      value: 8,
      label: "JSS2",
    },
    {
      value: 9,
      label: "JSS3",
    },
    {
      value: 10,
      label: "SS1",
    },
    {
      value: 11,
      label: "SS2",
    },
    {
      value: 12,
      label: "SS3",
    },
  ];

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
  return (
    <Container>
      <UtilsHolder>
        <div>
          <SearchInput />
          <SelectInput
            options={classOptions}
            onChange={handleSearchFilter}
            defaultValue="Class"
            width={200}
          />
          <SelectInput
            options={statusOptions}
            onChange={handleSearchFilter}
            defaultValue="Status"
            width={200}
          />
          <SelectInput
            options={subscribeOptions}
            onChange={handleSearchFilter}
            defaultValue="Subscription"
            width={150}
          />
          <h6>2,500 Results</h6>
        </div>
        <button>
          Export
          <ExportIcon />
        </button>
      </UtilsHolder>

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
          <CancelContainer>
            <CancelIcon />
          </CancelContainer>
          <UserInfo>
            <img
              src="https://media.istockphoto.com/id/1168369629/photo/happy-smiling-african-american-child-girl-yellow-background.webp?b=1&s=170667a&w=0&k=20&c=E0vD2JewKSB11Kq-pJVaBmMBJRNQu1Fuwodffs1d87o="
              alt=""
            />
            <div>
              <p>John Chukwuemeka</p>
              <p>SSS3</p>
            </div>
          </UserInfo>
          <UpdateDetails>
            <div>
              <InputElement placeholder="John Chukwuemeka" label="Name" />
              <ButtonElement width={84} outline label={"Update"} />
            </div>
            <div>
              <InputElement placeholder="08000000000" label="Phone number"/>
              <ButtonElement label={"Update"} outline width={84} />
            </div>
          </UpdateDetails>

          <Details>
            <div>
              <h4>Subscription Details</h4>

              <div>
                <h6>
                  SSS1 <span>-</span> <span>3 Months</span>
                </h6>

                <div>
                  <p>Subscription Started: 01/01/2023</p>
                  <p>Subscription End: 31/06/2023</p>
                </div>
              </div>

              <div>
                <h6>
                  SSS1 <span>-</span> <span>3 Months</span>
                </h6>
                <div>
                  <p>Subscription Started: 01/01/2023</p>
                  <p>Subscription End: 31/06/2023</p>
                </div>
              </div>
            </div>
            <div>
              <h4>Verification</h4>
              <SwitchContainer>
                <p>Unverified</p>
                <Switch defaultChecked onChange={onChange} />
              </SwitchContainer>
            </div>

            <ParentContainer>
              <h4>Parent</h4>
              <h5>John Chukwuemeka</h5>
              <p>0808994637</p>
              <ButtonElement outline width={84} label={"Unlink"} />
            </ParentContainer>
          </Details>
        </DrawerContentContainer>
      </Drawer>
    </Container>
  );
};

export default Students;










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

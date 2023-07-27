import { useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
import { Drawer } from "antd";
import { TableElement } from "../../../../Ui_elements/Table/Table";
import { ExportIcon } from "../../../../Assets/Svgs";
import { SearchInput } from "../../../../Ui_elements";
import { columns, data } from "../../../../utils/dummyData";

const Parents = () => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const headerStyle = {
    color: "gray",
    fontSize: "12px",
    fontWeight: 700,
  };
  const updatedColumns = columns.map((column: any) => {
    let updatedColumn = { ...column };

    switch (column.dataIndex) {
      case "name":
        updatedColumn.width = 400;
        break;
      case "phoneNumber":
        updatedColumn.width = 200;
        break;
      case "subscription":
        updatedColumn.width = 150;
        break;
      case "status":
        updatedColumn.width = 100;
        break;
      case "username":
        updatedColumn.width = 150;
        break;
      case "class":
        updatedColumn.width = 100;
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
        <button onClick={showDrawer}>
          Export
          <ExportIcon />
        </button>
      </UtilsHolder>
      <TableElement columns={updatedColumns} data={data} />
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
        closeIcon={false}
      ></Drawer>
    </Container>
  );
};

export default Parents;


const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 1rem;
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
  width: 100%;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    h6 {
      font-size: 1rem;
      font-weight: 700;
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
  }
`;


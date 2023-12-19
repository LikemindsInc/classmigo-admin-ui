import { useEffect, useState } from "react";
import { TableElement } from "../../../../../../../Ui_elements/Table/Table";
import { useApiGet } from "../../../../../../../custom-hooks";
import { getSingleLeaderboardUrl } from "../../../../../../../Urls";
import { ColumnsType } from "antd/es/table";
import { UserDetails } from "./Components/UserDetails";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import noData from "../../../../../../../Assets/noData.png";
import { roundNumberDown } from "../../../../../../../utils/utilFns";
import { Loader } from "../../../../../../../Ui_elements";
import dayjs from "dayjs";

interface DataType {
  key: string;
  name: string;
  username: string;
  class: string;
  phoneNumber: number;
  image: string;
  _id: string;
  index: number;
}

export const QuizLeaderboard = () => {
  const [boardData, setBoardData] = useState<any>([]);
  const [winner, setWinner] = useState<string>("");
  const [newState, setNewState] = useState<any>(null);

  const navigate = useNavigate();

  const { state } = useLocation();

  if (!state) {
    navigate("/amigo_quiz");
  }

  useEffect(() => {
    const storedState = sessionStorage.getItem("quizLeaderboardState");

    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setNewState(parsedState); 
    }
  }, []);

  const { data, isLoading, isInitialLoading, refetch } = useApiGet(
    ["lala"],
    () => getSingleLeaderboardUrl(state._id),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (data) {
      setBoardData(() =>
        data?.data?.content.map((item: any, index: number) => ({
          key: item._id,
          index: index,
          name: `${item?.student?.firstName} ${item?.student?.lastName}`,
          username: item?.student?.userName,
          phoneNumber: item?.student?.phoneNumber,
          points: roundNumberDown(item?.score),
          image: item?.student?.profileImageUrl,
        }))
      );
      setWinner(() => data?.data?.winner?.student?._id);
    }
  }, [data?.data?.content, data]);

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
      render: (name: string, record: DataType) => {
        return (
          <UserDetails
            winner={winner}
            index={record?.index}
            image={record.image}
            name={name}
            id={record.key}
          />
        );
      },
    },
    {
      title: "POINTS",
      dataIndex: "points",
      key: "points",
      ellipsis: true,
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
  ];

  const updatedColumns = columns.map((column: any) => {
    let updatedColumn = { ...column };
    switch (column.dataIndex) {
      case "name":
        updatedColumn.width = "25%";
        break;
      case "points":
        updatedColumn.width = "15%";
        break;
      case "username":
        updatedColumn.width = "15%";
        break;
      default:
        break;
    }
    updatedColumn.title = <h5 style={headerStyle}>{column.title}</h5>;
    return updatedColumn;
  });

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <>
      <h3>
        {state?.tag.replace(/_/g, " ")} leaderboard |{" "}
        {dayjs(state?.createdAt).format("MMMM D, YYYY")}
      </h3>
      {boardData.length > 0 ? (
        <TableElement
          data={boardData}
          loading={isLoading}
          pagination
          columns={updatedColumns}
          paginationData={data?.data?.pagination}
          fetchFunction={getSingleLeaderboardUrl}
          fetchAction={refetch}
        />
      ) : (
        <NoData>
          <img src={noData} alt="No data" />
          <p>No Student Has Taken This Quiz.</p>
        </NoData>
      )}
    </>
  );
};

const NoData = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    margin-bottom: 1rem;
  }
  p {
    text-align: center;
    font-size: 0.8rem;
  }
  button {
    margin-top: 1rem;
    width: fit-content;
  }
`;

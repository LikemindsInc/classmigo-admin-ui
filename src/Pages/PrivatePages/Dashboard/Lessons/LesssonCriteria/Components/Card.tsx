import React, { useState } from "react";
import styled from "styled-components";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import { MoveIcon } from "../../../../../../Assets/Svgs";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { DeleteOutlined } from "@ant-design/icons";
import { useApiDelete, useApiPost } from "../../../../../../custom-hooks";
import {
  activateUrl,
  deactivateUrl,
  deleteClassUrl,
} from "../../../../../../Urls";
import { Loader, Spinner } from "../../../../../../Ui_elements";
import { toast } from "react-toastify";

interface CardProps {
  subjects?: string[];
  id: number;
  topics?: string[];
  classname: string;
  active: boolean;
  index: number;
  isDraggedOver?: any;
  item: any;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}

export const Card = ({
  classname,
  subjects,
  topics,
  index,
  item,
  active,
  id,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  isDraggedOver,
  ...otherProps
}: CardProps) => {
  const navigate = useNavigate();
  let isActive = active;
  const onSuccess = () => {
    toast.success("Successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const onError = (error: any) => {
    toast.error(`Something went wrong ${error.message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const toggleActive = () => {
    isActive ? deactivateClass() : activateClass();
  };
  // const { mutate: deleteClass, isLoading: isDeleting } = useApiDelete(
  //   () => deleteClassUrl(id),
  //   onSuccess,
  //   onError,
  //   ["class"]
  // );

  const { mutate: deactivateClass, isLoading: isDeactivating } = useApiPost(
    () => deactivateUrl(item),
    onSuccess,
    onError,
    ["class"]
  );

  const { mutate: activateClass, isLoading: activating } = useApiPost(
    () => activateUrl(item),
    onSuccess,
    onError,
    ["class"]
  );

  return (
    <OuterContainer
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      isDraggedOver={isDraggedOver}
      {...otherProps}
    >
      <>
        <Container>
          <DetailsContainer
            onClick={() => {
              navigate(`/lessons_criteria/${classname}`, {
                state: {
                  title: classname,
                  scope: item,
                },
              });
            }}
          >
            <h6>{classname}</h6>
            <ToolsContainer>
              <Tools>{subjects} Subjects</Tools>
            </ToolsContainer>
          </DetailsContainer>
          <SwitchContainer>
            <SwitchElement activeState={isActive} handleChange={toggleActive} />
          </SwitchContainer>
        </Container>
        <MoveIcon style={{ cursor: "move" }} />
        {/* {isDeleting ? <Spinner color="var(--primary-color)" /> : <Delete onClick={() => deleteClass()} />} */}
      </>
    </OuterContainer>
  );
};

const Container = styled.div`
  background-color: var(--dashboardBackground);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 14px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    box-shadow: -1px 6px 13px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: -1px 6px 13px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 6px 13px -8px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const Tools = styled.p`
  padding: 0.5rem 0.7rem;
  font-size: 0.7rem;
  width: 114px;
  border-radius: 25px;
  background-color: white;
  border: 1px solid gray;
  text-align: center;
`;

const ToolsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const DetailsContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  h6 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
`;
export const SwitchContainer = styled.div`
  @media ${devices.mobileXS} {
    display: none;
  }
`;

const OuterContainer = styled.div<{ isDraggedOver: boolean }>`
  width: 100% !important;
  display: flex;
  align-items: center;
  gap: 5%;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isDraggedOver ? "translateY(10px)" : "translateY(0)"};
`;

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;

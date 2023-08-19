import React from "react";
import styled from "styled-components";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import { MoveIcon } from "../../../../../../Assets/Svgs";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  activateSubjectUrl,
  deactivateSubjectUrl,
} from "../../../../../../Urls";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import { useQueryClient } from "@tanstack/react-query";

interface CardProps {
  subjects?: string[];
  topics?: string[];
  id: number;
  classname: string;
  classTitle: string;
  active?: boolean;
  index: number;
  isDraggedOver?: any;
  item: any;
  title: string;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}

export const SubjectCard = ({
  classname,
  classTitle,
  subjects,
  topics,
  index,
  item,
  id,
  active,
  title,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  isDraggedOver,
  ...otherProps
}: CardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();



  const toggleActive = () => {
    if (active) {
      deactivateSubject();
      queryClient.invalidateQueries(["subjects"]);
    } else {
      activateSubject();
      queryClient.invalidateQueries(["subjects"]);
    }
  };
  const { refetch: deactivateSubject } = useApiGet(
    [`subject${id}`],
    () => deactivateSubjectUrl(id),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const { refetch: activateSubject } = useApiGet(
    [`subject${id}`],
    () => activateSubjectUrl(id),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  // const { mutate: activateSubject } = useApiPost(
  //   () => activateSubjectUrl(id),
  //   onSuccess,
  //   onError,
  //   ["subject"]
  // );

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
      <Container>
        <DetailsContainer
          onClick={() =>
            navigate(`/lessons_criteria/${title}/${classname}`, {
              state: {
                title: classname,
                scope: item,
                classTitle: classTitle,
              },
            })
          }
        >
          {/* <ImageContainer>
            <ImageInput />
          </ImageContainer> */}
          {/* <img src={placeholder} alt="Icon" /> */}
          <h6>{classname}</h6>
        </DetailsContainer>
        <SwitchContainer>
          <SwitchElement activeState={active} handleChange={toggleActive} />
        </SwitchContainer>
      </Container>
      <MoveIcon style={{ cursor: "move" }} />
      <Delete />
    </OuterContainer>
  );
};

const Container = styled.div`
  background-color: var(--dashboardBackground);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 2rem;
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

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  /* gap:10%; */
  width: 100%;

  h6 {
    font-size: 1rem;
    font-weight: 700;
    margin-left: 5%;
  }
`;
const SwitchContainer = styled.div`
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
  transition: transform 0.3s ease-in-out; /* Add transition for smooth animation */
  transform: ${(props) =>
    props.isDraggedOver
      ? "translateY(10px)"
      : "translateY(0)"}; /* Apply transform when dragged over */
`;

const ImageContainer = styled.div`
  width: 8rem;
  height: auto;
  margin-right: 1rem;
  /* border: 1px solid gray; */
  img {
    width: 8rem;
    height: auto;
  }
`;

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;

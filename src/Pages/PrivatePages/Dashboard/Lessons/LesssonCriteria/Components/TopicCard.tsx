import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import { MoveIcon, ToggleIcon } from "../../../../../../Assets/Svgs";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import {
  activateTopicUrl,
  deactivateTopicUrl,
  getSubTopicsUrl,
} from "../../../../../../Urls";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../../../../../../Ui_elements";
import { useNavigate } from "react-router-dom";
import { SubtopicCard } from "./SubtopicCard";

interface CardProps {
  subjects?: string[];
  topics?: string[];
  classname: string;
  classTitle?: any;
  subjectTitle?: any;
  index: number;
  id: number;
  item: any;
  track: number;
  active?: boolean;
  isDraggedOver?: any;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}

export const TopicCard = ({
  classname,
  subjects,
  topics,
  index,
  item,
  id,
  track,
  active,
  classTitle,
  subjectTitle,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  isDraggedOver,
  ...otherProps
}: CardProps) => {
  const [subtopic, setSubtopic] = useState<any>([]);
  const [showSubtopic, setShowSubtopic] = useState(false);
  const [isActive, setIsActive] = useState(active);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleActivateSuccess = (data: any) => {
    queryClient.invalidateQueries(["lessons-get-all"]);
    setIsActive(!isActive);
  };
  const handleActivationError = (error: any) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const handleDeactivateSuccess = (data: any) => {
    if (data) {
      queryClient.invalidateQueries(["lessons-get-all"]);
      setIsActive(false);
    }
  };
  const handleDeactivationError = (error: any) => {
    toast.error(error, {
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
    if (isActive) {
      deactivateTopic();
    } else {
      activateTopic();
    }
  };

  const { refetch: deactivateTopic } = useApiGet(
    [`subject${id}`],
    () => deactivateTopicUrl(id),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: handleDeactivateSuccess,
      onError: handleDeactivationError,
    }
  );

  const { refetch: activateTopic } = useApiGet(
    [`subject${id}`],
    () => activateTopicUrl(id),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: handleActivateSuccess,
      onError: handleActivationError,
    }
  );

  const { data: subtopics } = useApiGet(
    [`sub_topic${item?._id}`],
    () => getSubTopicsUrl(item?._id),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  useEffect(() => {
    if (track === index && subtopics) {
      setSubtopic(subtopics?.data?.content);
    }
  }, [index, subtopics, track]);

  return (
    <MainContainer
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      isDraggedOver={isDraggedOver}
      {...otherProps}
    >
      <OuterContainer>
        <Container>
          <DetailsContainer>
            <Details>
              <h6>{classname}</h6>
              <ToolsContainer>
                <Tools>{subtopic?.length} subtopics</Tools>
                <AddSub
                  onClick={() =>
                    navigate(
                      `/lessons_criteria/${classTitle}/${subjectTitle}/${classname}`,
                      { state: id }
                    )
                  }
                >
                  Add Subtopic
                </AddSub>
                <DropIcon
                  open={showSubtopic}
                  onClick={() => setShowSubtopic(!showSubtopic)}
                >
                  <ToggleIcon />
                </DropIcon>
              </ToolsContainer>
            </Details>
          </DetailsContainer>
          <SwitchContainer>
            <SwitchElement activeState={isActive} handleChange={()=>toggleActive()} />
          </SwitchContainer>
        </Container>
        <MoveIcon style={{ cursor: "move" }} />
        {/* <Delete /> */}
      </OuterContainer>{" "}
      {showSubtopic &&
        subtopic.map((items: any, index: number) => (
          <SubtopicCard
            indexCount={index}
            title={items?.topic}
            active={items?.isActive}
            parentItem={item?._id}
            id={items?._id}
            key={index}
          />
        ))}
    </MainContainer>
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
  @media ${devices.tablet} {
    padding: 0.6rem 0rem;
    flex-direction: column;
    align-items: flex-start;
    width: fill;
  }

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
  height: 100%;
  @media ${devices.tabletL} {
    width: 100vw;
  }

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

const MainContainer = styled.div<{ isDraggedOver: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isDraggedOver ? "translateY(10px)" : "translateY(0)"};
  position: relative;
`;

const OuterContainer = styled.div`
  width: 100% !important;
  display: flex;
  align-items: center;
  gap: 5%;
  margin-bottom: 2.5rem;
`;

const Tools = styled.p`
  padding: 0.5rem 0.7rem;
  font-size: 0.7rem;
  width: 114px;
  font-weight: 600;
  border-radius: 25px;
  background-color: white;
  border: 1px solid gray;
  text-align: center;
`;

const ToolsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const AddSub = styled.p`
  color: var(--primary-color);
  text-decoration: underline;
  cursor: pointer;
  position: relative;
`;

const DropIcon = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background-color: white;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid gray;
  transition: all 0.3s ease;
  transform: ${({ open }) => (open ? "rotate(0deg)" : "rotate(180deg)")};
  cursor: pointer;
`;
const Details = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  p {
    font-size: 0.7rem;
    font-weight: 600;
  }
`;

const SubtopicContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;

const Move = styled(MoveIcon)`
  cursor: move;
  @media ${devices.tabletL} {
    display: none;
  }
`;

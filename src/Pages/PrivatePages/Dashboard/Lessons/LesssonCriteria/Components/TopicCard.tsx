import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import { MoveIcon, ToggleIcon } from "../../../../../../Assets/Svgs";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import { addSubTopicUrl, getSubTopicsUrl } from "../../../../../../Urls";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

interface CardProps {
  subjects?: string[];
  topics?: string[];
  classname: string;
  index: number;
  id: number;
  item: any;
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
  active,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  isDraggedOver,
  ...otherProps
}: CardProps) => {
  const [displayInput, setDisplayInput] = useState(false);
  const [subtopic, setSubtopic] = useState<any>([]);
  const [showSubtopic, setShowSubtopic] = useState(false);
  const [title, setTitle] = useState("");
  let isActive = active;

  const handleSubmit = () => {
    const requestBody: any = {
      topic: title,
      topicDescription: "This is a description",
      shortNote: "This is a short note",
    };
    addSubTopic(requestBody);
    setTitle("");
    setDisplayInput(false);
  };

  const handleSubTopicSuccess = () => {
    toast.success("Successfully Add Subtopic", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const handleSubTopicError = (error: any) => {
    toast.error(error?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  // const toggleActive = () => {
  //   isActive ? deactivateClass() : activateClass();
  // };

  // const { mutate: deactivateClass, isLoading: isDeactivating } = useApiPost(
  //   () => deactivateUrl(item),
  //   onSuccess,
  //   onError,
  //   ["class"]
  // );

  // const { mutate: activateClass, isLoading: activating } = useApiPost(
  //   () => activateUrl(item),
  //   onSuccess,
  //   onError,
  //   ["class"]
  // );

  const { data: subtopics } = useApiGet(
    [`sub_topic${item?._id}`],
    () => getSubTopicsUrl(item?._id),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const { mutate: addSubTopic, isLoading: isAddingSubTopic } = useApiPost(
    (_: any) => addSubTopicUrl(_, item?._id),
    handleSubTopicSuccess,
    handleSubTopicError,
    [`sub_topic${item?._id}`]
  );
  useEffect(() => {
    if (id === index && subtopics) {
      setSubtopic(subtopics?.data?.content);
    }
  }, [id, index, subtopics]);

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
            {/* <ImageContainer>
              <ImageInput />
            </ImageContainer> */}
            <Details>
              <h6>{classname}</h6>
              <ToolsContainer>
                <Tools>{subtopic?.length} subtopics</Tools>
                <AddSub onClick={() => setDisplayInput(!displayInput)}>
                  Add Subtopic
                  {displayInput && (
                    <AddInputContainer>
                      <p onClick={() => setDisplayInput(false)}>&#127335;</p>
                      <AddInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSubmit();
                            setShowSubtopic(true);
                          }
                        }}
                        autoFocus
                      />
                    </AddInputContainer>
                  )}
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
            <SwitchElement activeState={isActive} />
          </SwitchContainer>
        </Container>
        <MoveIcon style={{ cursor: "move" }} />
        <Delete />
      </OuterContainer>{" "}
      {showSubtopic &&
        subtopic.map((item: any, index: number) => (
          <SubtopicContainer>
            <SubtopicCard>
              <div>
                <p>0{index}.</p>
                <h6>{item?.topic}</h6>
              </div>
              <SwitchContainer>
                <SwitchElement />
              </SwitchContainer>
            </SubtopicCard>
            <MoveIcon style={{ cursor: "move" }} />
          </SubtopicContainer>
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

const ImageContainer = styled.div`
  width: 8rem;
  height: auto;
  /* border: 1px solid gray; */
  img {
    width: 8rem;
    height: auto;
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

const AddInput = styled.input`
  background-color: white;
  border: none;
  outline: none;
  font-size: 0.8rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 10px;
  height: 100%;
`;

const AddInputContainer = styled.div`
  padding: 5px;
  margin-bottom: 30px !important;
  position: absolute;
  left: 0;
  background-color: white;
  box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  width: 478px;
  height: 50px;
  display: flex;
  align-items: center;
  p {
    position: absolute;
    top: 10px;
    right: 10px;
    float: right;
    font-weight: 700;
    font-size: 0.8rem;
    color: gray;
    cursor: pointer;
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
const SubtopicCard = styled.div`
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 90%;
  border-radius: 12px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  > div {
    display: flex;
    align-items: center;
    gap: 20px;
    h6 {
      font-size: 1rem;
    }
  }
`;

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;

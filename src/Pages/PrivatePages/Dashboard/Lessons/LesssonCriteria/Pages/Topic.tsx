import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../../Assets/noData.png";
import { useLocation} from "react-router-dom";
import {
  ButtonElement,
} from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { TopicCard } from "../Components/TopicCard";
import { addTopicUrl, getAllLessonsUrl } from "../../../../../../Urls";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import { Skeleton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const SelectTopic = () => {
  const [selectTopic, setSelecttopic] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const location = useLocation();
  const { state } = location;
  const { scope, classTitle } = state;
  const [topic, setTopic] = useState<any>({
    lessonName: "",
    lessonDescription: "",
    lessonWeek: "",
  });

  const dragTopic = useRef<any>(null);
  const dragOverTopic = useRef<any>(null);

  const handleDragSort = () => {
    let items = [...selectTopic];
    const draggedItem = items.splice(dragTopic.current, 1)[0];
    items.splice(dragOverTopic.current, 0, draggedItem);
    dragTopic.current = null;
    dragOverTopic.current = null;
    setSelecttopic(items);
  };

  const { data: topics, isLoading: isLoadingTopics } = useApiGet(
    ["topic"],
    () => getAllLessonsUrl(scope),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const handleSuccess = () => {
    toast.success("Successfully added topic", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });

    setTopic({
      lessonName: "",
      lessonDescription: "",
      lessonWeek: "",
    });
  };
  const handleError = (error: any) => {
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

  const { mutate: addTopic, isLoading: isAddingTopic } = useApiPost(
    addTopicUrl,
    handleSuccess,
    handleError,
    ["topic"]
  );

  useEffect(() => {
    if (topics) {
      setSelecttopic(topics?.data?.content);
    }
  }, [topics]);

  const onSubmit = (data: any) => {
    addTopic({
      ...data,
      schoolSubject: scope,
      studentClass: classTitle,
      lessonWeek: "1",
    });
  };

  return (
    <Container>
      <Header>
        <div>
          <div>
            <label>Create a subject</label>
            <Input
              placeholder="Enter a subject name"
              value={topic.lessonName}
              onChange={(e) =>
                setTopic({ ...topic, lessonName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Add a description</label>
            <Input
              placeholder="Enter a description"
              value={topic.lessonDescription}
              onChange={(e) =>
                setTopic({ ...topic, lessonDescription: e.target.value })
              }
            />
          </div>

          <ButtonElement
            isLoading={isAddingTopic}
            type="submit"
            label="Add Subject +"
            width={200}
            onClick={() => onSubmit(topic)}
          />
        </div>
      </Header>
      <Body>
        {selectTopic.length > 0 ? (
          selectTopic.map((item: any, index: number) => (
            <TopicCard
              item={item}
              classname={item?.lessonName}
              key={index}
              id={index}
              index={index}
              onDragStart={() => (dragTopic.current = index)}
              onDragEnter={() => (dragOverTopic.current = index)}
              onDragEnd={handleDragSort}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggedOver(true);
              }}
              isDraggedOver={isDraggedOver}
              // onClick={() => navigate(`/lessons_criteria`)}
            />
          ))
        ) : isLoadingTopics ? (
          <div>
            <SkeletonContainer>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={118}
              />
            </SkeletonContainer>
            <SkeletonContainer>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={118}
              />
            </SkeletonContainer>

            <SkeletonContainer>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={118}
              />
            </SkeletonContainer>

            <SkeletonContainer>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={"100%"}
                height={118}
              />
            </SkeletonContainer>
          </div>
        ) : (
          <NoData>
            <img src={noData} alt="No data" />
            <p>You haven’t added any classes yet.</p>
            <p>Use the create class above to add classes.</p>
          </NoData>
        )}
      </Body>
      <ToastContainer />
    </Container>
  );
};

export default SelectTopic;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 10%;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const Header = styled.div`
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    width: fill !important;

    @media ${devices.tabletL} {
      flex-wrap: wrap;
      width: 100%;
    }
    label {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 10px;
      @media ${devices.tabletL} {
        margin-right: 10px;
      }
    }
    input {
      width: 23vw;
      height: 40px;
      @media ${devices.tabletL} {
        width: 100%;
      }
    }
    button {
      margin-top: 25px;
      height: 40px;
      font-size: 1vw;
      @media ${devices.tabletL} {
        width: 200px !important;
        font-size: 1rem;
      }
    }
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: flex-end;
  }
`;

const Body = styled.section`
  width: 100%;
  height: 100%;
`;

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
`;

const Input = styled.input`
  width: fill;
  border-color: var(--primary-color);
  border-width: 1px;
  padding: clamp(0.5rem, 30vw, 1rem);
  outline: none;
  border: 1px solid #7b31b2;
  border-radius: 5px;
  &:focus {
    border: 1px solid #7b31b2;
    -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

// const InputHolder = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;

//   label {
//     font-weight: 600;
//   }
//   div {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//   }
//   p {
//     font-size: 0.8rem;
//     color: red;
//   }
// `;

const SkeletonContainer = styled.div`
  margin-bottom: 10px;
`;

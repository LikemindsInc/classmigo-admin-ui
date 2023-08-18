import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../../Assets/noData.png";
import { useLocation } from "react-router-dom";
import { ButtonElement, InputElement } from "../../../../../../Ui_elements";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { TopicCard } from "../Components/TopicCard";
import { addTopicUrl, getAllLessonsUrl } from "../../../../../../Urls";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import { Pagination, Skeleton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { AddIcon } from "../../../../../../Assets/Svgs";

const SelectTopic = () => {
  const [selectTopic, setSelecttopic] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { state } = location;
  const { scope, classTitle } = state;
  const [topic, setTopic] = useState<any>("");

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

  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    getLessons();
  };

  const {
    data: topics,
    isLoading: isLoadingTopics,
    refetch: getLessons,
  } = useApiGet(["topic"], () => getAllLessonsUrl(scope, page), {
    refetchOnWindowFocus: false,
    enabled: true,
  });

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

    setTopic("");
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
      setTotalPages(topics?.data?.pagination?.numberOfPages);
    }
  }, [topics]);

  const onSubmit = () => {
    const requestBody: any = {
      lessonName: topic,
      schoolSubject: scope,
      studentClass: classTitle,
    };
    addTopic(requestBody);
  };
  return (
    <Container>
      <Header>
        <InputElement
          label="Create Topic"
          placeholder="Enter Topic"
          onChange={(e: any) => setTopic(e.target.value)}
        />
        <ButtonElement
          label="Add Topic"
          icon={<AddIcon />}
          onClick={onSubmit}
          isLoading={isAddingTopic}
        />
      </Header>
      <Body>
        {selectTopic.length > 0 ? (
          <CardContainer>
            {selectTopic.map((item: any, index: number) => (
              <TopicCard
                item={item}
                classname={item?.lessonName}
                key={index}
                id={index}
                index={index}
                active={item?.schoolSubject?.isActive}
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
            ))}
            <PaginationContainer>
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </PaginationContainer>
          </CardContainer>
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
  max-height: 85vh;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 10%;
  display: flex;
  flex-direction: column;
  /* gap: 10%; */
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  margin-bottom: 2rem;

  input {
    width: 350px;
    margin-right: 1rem;
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 150px;
    align-self: flex-end !important;
  }

  @media ${devices.tabletL} {
    gap: 4%;
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

const CardContainer = styled.section``;
const PaginationContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

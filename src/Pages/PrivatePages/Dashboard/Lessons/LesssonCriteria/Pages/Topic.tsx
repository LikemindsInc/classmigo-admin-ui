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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { topicSchema } from "../LessonCriteriaSchema";

const SelectTopic = () => {
  const [selectTopic, setSelecttopic] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const { state } = location;
  const { scope, classTitle } = state;
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

  const PAGE_SIZE = 6;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(topicSchema),
  });
  const handlePageChange = (e: any, p: number) => {
    setPage(p);
  };

  const {
    data: topics,
    isLoading: isLoadingTopics,
    refetch: getLessons,
  } = useApiGet(["topic"], () => getAllLessonsUrl(scope, page, PAGE_SIZE), {
    refetchOnWindowFocus: true,
    enabled: false,
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
    if (page !== null) {
      getLessons();
    }
  }, [page, getLessons]);

  useEffect(() => {
    if (topics) {
      setSelecttopic(topics?.data?.content);
      setTotalPages(topics?.data?.pagination?.numberOfPages);
    }
  }, [topics]);

  const onSubmit = (data: any) => {
    const requestBody: any = {
      lessonName: data?.topic,
      schoolSubject: scope,
      studentClass: classTitle,
    };
    addTopic(requestBody);
  };
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <InputElement
          label="Create Topic"
          placeholder="Enter Topic"
          register={register}
          id="topic"
          error={errors}
        />
        <ButtonElement
          label="Add Topic"
          icon={<AddIcon />}
          isLoading={isAddingTopic}
        />
      </Header>
      <Body>
        {isLoadingTopics ? (
          <div>
            {[...Array(4)].map((_, index) => (
              <SkeletonContainer key={index}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"100%"}
                  height={118}
                />
              </SkeletonContainer>
            ))}
          </div>
        ) : selectTopic.length === 0 ? (
          <NoData>
            <img src={noData} alt="No data" />
            <p>You haven’t added any classes yet.</p>
            <p>Use the create class above to add classes.</p>
          </NoData>
        ) : (
          <CardContainer>
            {selectTopic.map((item: any, index: number) => (
              <TopicCard
                item={item}
                classname={item?.lessonName}
                key={index}
                classTitle={scope}
                subjectTitle={classTitle}
                id={item?._id}
                index={index}
                track={index}
                active={item?.schoolSubject?.isActive}
                onDragStart={() => (dragTopic.current = index)}
                onDragEnter={() => (dragOverTopic.current = index)}
                onDragEnd={handleDragSort}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggedOver(true);
                }}
                isDraggedOver={isDraggedOver}
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
        )}
      </Body>
    </Container>
  );
};

export default SelectTopic;

const Container = styled.form`
  width: 100%;
  max-height: 85vh;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 10%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  margin-bottom: 2rem;
  @media ${devices.tabletL} {
    flex-direction: column;
    gap: 10px !important;
  }

  input {
    width: 350px;
    margin-right: 1rem;
    @media ${devices.tabletL} {
      width: 100%;
      margin-right: 0;
    }
  }
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 150px;
    align-self: flex-end !important;
    @media ${devices.tabletL} {
      width: 100%;
    }
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
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

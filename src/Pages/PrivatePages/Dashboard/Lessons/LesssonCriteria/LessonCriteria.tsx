import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../Assets/noData.png";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { Card } from "./Components/Card";
import { useApiGet} from "../../../../../custom-hooks";
import { Skeleton } from "@mui/material";
import { getAllClassesUrl } from "../../../../../Urls";

const LessonCriteria = () => {
  const [selectClass, setSelectClass] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["classes"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  useEffect(() => {
    if (classes) {
      setSelectClass(classes?.data);
    }
  }, [classes]);

  const dragClass = useRef<any>(null);
  const dragOverClass = useRef<any>(null);

  const handleDragSort = () => {
    let items = [...selectClass];
    const draggedItem = items.splice(dragClass.current, 1)[0];
    items.splice(dragOverClass.current, 0, draggedItem);
    dragClass.current = null;
    dragOverClass.current = null;
    setSelectClass(items);
  };

  return (
    <form>
      <Container>
        <Body>
          {selectClass?.length > 0 ? (
            selectClass.map((item: any, index: number) => (
              <Card
                item={item?.name}
                classname={item?.value}
                key={index}
                index={index}
                topicNumber={0}
                subjectNumber={0}
                onDragStart={() => (dragClass.current = index)}
                onDragEnter={() => (dragOverClass.current = index)}
                onDragEnd={handleDragSort}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggedOver(true);
                }}
                isDraggedOver={isDraggedOver}
              />
            ))
          ) : isLoadingClasses ? (
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
      </Container>
    </form>
  );
};

export default LessonCriteria;

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
    padding: 1rem;
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

const SkeletonContainer = styled.div`
  margin-bottom: 10px;
`;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../Assets/noData.png";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { Card } from "./Components/Card";
import { useApiGet, useApiPost } from "../../../../../custom-hooks";
import { Skeleton } from "@mui/material";
import { createClassUrl, getAllClassesUrl } from "../../../../../Urls";
import { ButtonElement, InputElement } from "../../../../../Ui_elements";
import { AddIcon } from "../../../../../Assets/Svgs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { classSchema } from "./LessonCriteriaSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const LessonCriteria = () => {
  const [selectClass, setSelectClass] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(classSchema),
  });

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["classes"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const onSuccess = () => {
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
  const onError = (e: any) => {
    toast.error(e, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const { mutate: createClass, isLoading: isCreatingClass } = useApiPost(
    createClassUrl,
    onSuccess,
    onError,
    ["classes"]
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

  const onSubmit = (data: any) => {
    createClass(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Header>
            <InputElement
              label="Create Class"
              placeholder="Enter Class"
              register={register}
              id="name"
              error={errors}
            />
            <ButtonElement
              label="Add Class"
              icon={<AddIcon />}
              isLoading={isCreatingClass}
            />
          </Header>
          <Body>
            {selectClass?.length > 0 ? (
              <div>
                {selectClass.map((item: any, index: number) => (
                  <Card
                    item={item?.name}
                    id={item?._id}
                    classname={item?.value}
                    active={item?.isActive}
                    key={index}
                    index={index}
                    subjects={item?.subjects.length}
                    onDragStart={() => (dragClass.current = index)}
                    onDragEnter={() => (dragOverClass.current = index)}
                    onDragEnd={handleDragSort}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggedOver(true);
                    }}
                    isDraggedOver={isDraggedOver}
                  />
                ))}
              </div>
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
    </>
  );
};

export default LessonCriteria;

const Container = styled.section`
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
    padding: 1rem;
  }
`;

const Body = styled.section`
  width: 100%;
  height: 100%;
  margin-bottom: 2rem;
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

export const SkeletonContainer = styled.div`
  margin-bottom: 10px;
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

const PaginationContainer = styled.div`
  /* margin: 2rem 0; */
`;

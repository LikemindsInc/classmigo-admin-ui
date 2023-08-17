import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../../Assets/noData.png";
import { useLocation } from "react-router-dom";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { SubjectCard } from "../Components/SubjectCard";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import { Skeleton } from "@mui/material";
import { createSubjectUrl, getAllSubjectsUrl } from "../../../../../../Urls";
import { ButtonElement, InputElement } from "../../../../../../Ui_elements";
import { AddIcon } from "../../../../../../Assets/Svgs";
import { useForm } from "react-hook-form";

const SelectSubject = () => {
  const location = useLocation();
  const { state } = location;
  const { title, scope } = state;
  const [selectSubject, setSelectSubject] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const { data: subjects, isLoading: isLoadingSubjects } = useApiGet(
    ["subject"],
    () => getAllSubjectsUrl(scope),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );


  const onSuccess = () => {};
  const onError = () => {};
  const { mutate: createSubject, isLoading: isCreatingSubject } = useApiPost(
    createSubjectUrl,
    onSuccess,
    onError,
    ["subject"]
  );

  const dragClass = useRef<any>(null);
  const dragOverClass = useRef<any>(null);

  const handleDragSort = () => {
    let items = [...selectSubject];
    const draggedItem = items.splice(dragClass.current, 1)[0];
    items.splice(dragOverClass.current, 0, draggedItem);
    dragClass.current = null;
    dragOverClass.current = null;
    setSelectSubject(items);
  };

  useEffect(() => {
    if (subjects) {
      setSelectSubject(subjects?.data);
    }
  }, [subjects]);

  const onSubmit = (data: any) => {
    createSubject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Header>
          <InputElement
            label="Create Subject"
            placeholder="Enter Subject"
            register={register}
            id="name"
          />
          <ButtonElement label="Add Class" icon={<AddIcon />} isLoading={isCreatingSubject} />
        </Header>
        <Body>
          {selectSubject?.subjects?.length > 0 ? (
            selectSubject?.subjects?.map((item: any, index: number) => (
              <SubjectCard
                classname={item?.name}
                key={index}
                item={item?.name}
                classTitle={scope}
                title={title}
                id={item?._id}
                index={index}
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
          ) : isLoadingSubjects ? (
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

export default SelectSubject;

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

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;

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

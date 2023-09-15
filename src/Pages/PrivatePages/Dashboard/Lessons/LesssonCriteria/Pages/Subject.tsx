import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import noData from "../../../../../../Assets/noData.png";
import { useLocation } from "react-router-dom";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { SubjectCard } from "../Components/SubjectCard";
import { useApiGet, useApiPost } from "../../../../../../custom-hooks";
import { Skeleton } from "@mui/material";
import { createSubjectUrl, getAllClassesUrl } from "../../../../../../Urls";
import { ButtonElement, InputElement } from "../../../../../../Ui_elements";
import { AddIcon } from "../../../../../../Assets/Svgs";
import { useForm } from "react-hook-form";
import { subjectSchema } from "../LessonCriteriaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { LessonCriteriaContext } from "../../../../../../Contexts/Contexts";
import Error from "../../../Error/Error";

const SelectSubject = () => {
  const location = useLocation();
  const { state } = location;
  const [selectSubject, setSelectSubject] = useState<any>([]);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const { className } = useContext(LessonCriteriaContext);
  const [fromClass, setFromClass] = useState(false);

  console.log(className, "className....");

  useEffect(() => {
    if (state) {
      setFromClass(state?.fromClass);
    }
  }, [state]);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subjectSchema),
  });

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

  const { data: subjects, isLoading: isLoadingSubjects } = useApiGet(
    ["subjects"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      onError: handleError,
    }
  );

  const subject = watch("name");
  const onSuccess = () => {
    toast.success(`Successfully Added ${subject}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });

    setValue("name", "");
  };

  const onError = (error: any) => {
    toast.error(`Something went wrong, couldn't add ${subject}. ${error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

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
    const requestBody: any = {
      name: data?.name.trim().trimLeft().toString(),
    };
    createSubject({ ...requestBody, className: className?.value });
  };

  if (className === null) {
    return <Error />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Header>
          <InputElement
            label="Create Subject"
            placeholder="Enter Subject"
            register={register}
            id="name"
            error={errors}
          />
          <ButtonElement
            label="Add Subject"
            icon={<AddIcon />}
            isLoading={isCreatingSubject}
          />
        </Header>
        <Body>
          {selectSubject?.length > 0 ? (
            <>
              {selectSubject?.map(
                (item: any, index: number) =>
                  item?.name === className?.value &&
                  item?.subjects?.map((item: any) => (
                    <SubjectCard
                      // subjectname={item?.name}
                      key={index}
                      item={item?.name}
                      // classTitle={className?.label}
                      // title={className?.value}
                      active={item?.isActive}
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
              )}
              {/* <PaginationContainer>
                <Pagination count={10} shape="rounded" />
              </PaginationContainer> */}
            </>
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

const PaginationContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

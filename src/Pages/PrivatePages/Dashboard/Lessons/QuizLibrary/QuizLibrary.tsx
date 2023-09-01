import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddIcon, CsvIcon } from "../../../../../Assets/Svgs";
import { ModalContext } from "../../../../../Contexts/Contexts";
import { useApiGet } from "../../../../../custom-hooks";
import {
  ButtonElement,
  Loader,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";
import { getAllClassesUrl, getAllQuizUrl } from "../../../../../Urls";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { CreateQuiz } from "./Components/CreateQuiz";
import { Card } from "./Components/QuizCard";
import { Skeleton } from "@mui/material";
import noData from "../../../../../Assets/noData.png";
import { formatOptions } from "../../../../../utils/utilFns";
import { Controller, useForm } from "react-hook-form";

const QuizLibrary = () => {
  const navigate = useNavigate();
  const { setOpenModal } = useContext(ModalContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [quiz, setQuiz] = useState<any>([]);
  const handleCancel = () => {
    setOpenModal(false);
  };


  const { control, watch } = useForm();


  let classValue : any = watch("className")

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );


  const activeClasses = classes?.data?.filter((item: any) => item.isActive);

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );


  const { data: quizes, isLoading: isLoadingQuizes, refetch:fetchQuiz } = useApiGet(
    ["quizes"],
    () => getAllQuizUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );


  useEffect(() => {
    if (classValue) {
      fetchQuiz()
    }
  },[classValue, fetchQuiz])

  useEffect(() => {
    if (quizes) {
      setQuiz(quizes?.data?.content);
    }
  }, [quizes]);


  return (
    <>
      <Container>
        <Body>
          <ToolsContainer>
            <SearchContainer>
              <SearchInput width={300} />
              <p>250 Results</p>
            </SearchContainer>
            <Utility>
              <Controller
                name="className"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    {...field}
                    options={allClasses}
                    defaultValue="Filter with class"
                    isLoading={isLoadingClasses}
                  />
                )}
              />
              <ButtonElement
                label="Create a quiz"
                icon={<AddIcon />}
                onClick={() => setOpenModal(true)}
              />
            </Utility>
          </ToolsContainer>

          <QuestionsContainer>
            {quiz?.length > 0 ? (
              <div>
                {quiz.map((item: any, index: number) => (
                  <Card details={item} key={index} quizId={item?._id} />
                ))}
              </div>
            ) : isLoadingQuizes ? (
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
            ) : (
              <NoData>
                <img src={noData} alt="No data" />
                <p>You haven’t added any quiz yet.</p>
                <p>Use the create quiz above to add a quiz.</p>
              </NoData>
            )}
          </QuestionsContainer>
        </Body>
      </Container>
{/* 
      <Modal cancel={handleCancel} width={"35%"}>
        <CreateQuiz />
      </Modal> */}

      <Modal cancel={handleCancel} width={"35%"}>
        <CreateQuiz />
      </Modal>
    </>
  );
};

export default QuizLibrary;

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  p {
    font-weight: 600;
  }
`;

const Body = styled.section`
  width: 100%;
  padding: 0 15%;
`;

const ToolsContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Utility = styled.aside`
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: 250px;
  }
  display: flex;
  gap: 10px;
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
const QuestionsContainer = styled.section``;
const Modal = styled(CenteredDialog)``;

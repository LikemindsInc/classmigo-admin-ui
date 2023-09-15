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
import { formatOptions, generateQueryKey } from "../../../../../utils/utilFns";
import { Controller, useForm } from "react-hook-form";
import { debounce } from "lodash";

const QuizLibrary = () => {
  // const { setOpenModal } = useContext(ModalContext);
  const [openModal, setOpenModal] = useState(false);
  const [quiz, setQuiz] = useState<any>([]);

  const { control, watch, setValue } = useForm();

  const [searchFilter, setSearchFilter] = useState<any>({
    search: null,
    className: null,
  });

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      search: value,
    }));
  }, 1500);

  const handleClearClass = () => {
    setValue("className", null);
    setSearchFilter((prev: any) => ({
      ...prev,
      className: null,
    }));
  };

  const onSelectClassname = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      className: value?.value,
    }));
  };

  const handleSearchFilter = (e: any) => {
    const searchValue = e.target.value;
    debouncedSearchFilterUpdate(searchValue.trim());
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  let classValue: any = watch("className");

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      cacheTime: 0,
    }
  );

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);

  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  const {
    data: quizes,
    isLoading: isLoadingQuizes,
    refetch: fetchQuiz,
  } = useApiGet(
    [generateQueryKey("quizes", searchFilter)],
    () => getAllQuizUrl(searchFilter),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  useEffect(() => {
    if (classValue) {
      fetchQuiz();
    }
  }, [classValue, fetchQuiz]);

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
              <SearchInput onSearch={handleSearchFilter} />
            </SearchContainer>
            <Utility>
              <Controller
                name="className"
                control={control}
                render={({ field }) => (
                  <SelectContainer>
                    <SelectInput
                      {...field}
                      id={"className"}
                      options={allClasses}
                      onChange={onSelectClassname}
                      defaultValue="Fitler By Class"
                      isLoading={isLoadingClasses}
                    />
                    {typeof searchFilter?.className === "string" && (
                      <CancelIcon onClick={handleClearClass}>
                        &#8855;
                      </CancelIcon>
                    )}
                  </SelectContainer>
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
            {quiz?.length > 0 && !isLoadingQuizes ? (
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

      <Modal
        openState={openModal}
        cancel={() => setOpenModal(false)}
        width={"35%"}
      >
        <CreateQuiz setModal={setOpenModal}  />
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

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  align-self: center;
  p {
    font-weight: 600;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const Body = styled.section`
  width: 100%;
  padding: 0 15%;
  @media ${devices.tabletL} {
    padding: 0;
  }
`;

const ToolsContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* align-items: center; */
  @media ${devices.tabletL} {
    flex-direction: column;
  }
`;

const Utility = styled.aside`
  button {
    font-size: 0.8rem;
    height: 38px !important;
    width: fit-content;
  }
  display: flex;
  gap: 10px;
  @media ${devices.tabletL} {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
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
const QuestionsContainer = styled.section`
  margin-top: 2rem;
`;
const Modal = styled(CenteredDialog)``;

const CancelIcon = styled.div`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
`;

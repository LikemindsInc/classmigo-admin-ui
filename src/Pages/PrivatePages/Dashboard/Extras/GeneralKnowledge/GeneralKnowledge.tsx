import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  SearchInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { AddIcon, CsvIcon, UploadTick } from "../../../../../Assets/Svgs";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";
import { ModalContext } from "../../../../../Contexts/Contexts";
import { QuestionCard } from "./Components/QuestionCard";
import { useNavigate} from "react-router-dom";
import { getAllClassesUrl, getAllQuizUrl } from "../../../../../Urls";
import { useApiGet } from "../../../../../custom-hooks";
import { formatOptions } from "../../../../../utils/utilFns";
import { Controller, useForm } from "react-hook-form";
import { debounce } from "lodash";


type Filter = {
  search: string
  className: string
}

const GeneralKnowledge = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [questions, setQuestions] = useState<any>();


  const { control, watch } = useForm();
  const [searchFilter, setSearchFilter] = useState<Filter>({
    search: "",
    className:""
  })
  

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      search: value
    }));
  }, 1500);



  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const {
    data: generalQuiz,
    isLoading: isLoadingQuizes,
    refetch: fetchQuiz
  } = useApiGet(
    ["quizes"],
    () => getAllQuizUrl(searchFilter),
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


  useEffect(() => {
    if (generalQuiz) {
      setQuestions(generalQuiz?.data?.content)
    }
  },[generalQuiz])



  const handleSearchFilter = (e: any) => {
    const searchValue = e.target.value
    debouncedSearchFilterUpdate(searchValue);
  };

  const onClassSelect = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      className: value?.value,
    }));
    fetchQuiz()
  };

  useEffect(() => {
    fetchQuiz()
  }, [fetchQuiz, searchFilter])
  

  
  const navigate = useNavigate()
  // const handleOk = () => {
  //   setOpenModal(false);
  // };

  const handleSetQuestions = () => {
    setQuestions(null)
  }
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <UtilsHolder>
        <div>
          <Controller
            name="className"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
              options={allClasses}
              onChange={onClassSelect}
              defaultValue="Select Level"
              width={160}
            />
            )}
          />

          <ButtonElement
            icon={<CsvIcon />}
            label="Upload CSV"
            width={200}
            onClick={() => setOpenModal(true)}
          />
          <ButtonElement
            icon={<AddIcon />}
            label="Add New Question"
            width={200}
            onClick={()=>navigate("/general_knowledge/add_question")}
          />
        </div>
        <ButtonElement outline={true} label="Download CSV Format" width={250} />
      </UtilsHolder>

      <QuestionsContainer>
        <SearchContainer>
          <SearchInput
            onSearch={handleSearchFilter}
          />
          {/* <p>250 Results</p> */}
        </SearchContainer>
        <Questions>
  { questions && questions.map((question: any, index: number) =>
    question.questions.map((item: any, itemIndex: number) => (
      <QuestionCard
        id={index + 1}
        imageUrl={item?.imageUrl}
        key={itemIndex}
        question={item?.question}
        options={item?.options}
        answer={item?.answer}
      />
    ))
  )}
</Questions>
      </QuestionsContainer>
      <Modal cancel={handleCancel} width={"40%"}>
        <ModalContent>
          <UploadTick />
          <p>Question Uploaded Successfully</p>
          <ButtonElement label="Done" width={100} onClick={handleSetQuestions} />
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default GeneralKnowledge;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 0.8rem;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    h6 {
      font-size: 1rem;
      font-weight: 700;
    }
  }
`;

const Modal = styled(CenteredDialog)``;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;

  p {
    font-weight: 600;
  }
`;

const QuestionsContainer = styled.div`
  padding: 0 20%;
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

const Questions = styled.div``;

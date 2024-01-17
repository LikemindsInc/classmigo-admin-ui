import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  ImageInput,
  SelectInput,
} from "../../../../../Ui_elements";
import { AddIcon, CsvIcon, UploadTick } from "../../../../../Assets/Svgs";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";
import { ModalContext } from "../../../../../Contexts/Contexts";
import { QuestionCard } from "./Components/QuestionCard";
import { useNavigate } from "react-router-dom";
import { getAllClassesUrl } from "../../../../../Urls";
import { useApiGet, useApiPost } from "../../../../../custom-hooks";
import {
  downloadGeneralTemplate,
  formatOptions,
  generateQueryKey,
} from "../../../../../utils/utilFns";
import { Controller, useForm } from "react-hook-form";
import { debounce } from "lodash";
import {
  generalKnowledgeBulkUpload,
  getGeneralQuestions,
} from "../../../../../Urls/GeneralKnowledge";
import noData from "../../../../../Assets/noData.png";
import * as yup from "yup";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

type Filter = {
  search: string;
  className: string;
};

const schema = yup.object().shape({
  file: yup.mixed().required("Please add a file"),
});
const GeneralKnowledge = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [questions, setQuestions] = useState<any>();
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const fileRef = useRef(null);

  const { control, watch } = useForm();
  const [searchFilter, setSearchFilter] = useState<Filter>({
    search: "",
    className: "",
  });

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      search: value,
    }));
  }, 1500);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: classes, isLoading: isLoadingClasses } = useApiGet(
    ["allClasses"],
    () => getAllClassesUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      cacheTime: 0,
    }
  );

  const {
    data: generalQuiz,
    isLoading: isLoadingQuizes,
    refetch: fetchQuiz,
  } = useApiGet(
    [generateQueryKey("general-questions", searchFilter), "general-questions"],
    () => getGeneralQuestions(searchFilter),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const { mutate: updateQuestion, isLoading: updateLoading } = useApiPost(
    generalKnowledgeBulkUpload,
    () => {
      toast.success("Successfully added question", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      fetchQuiz();
      setOpenModalUpload(false);
    },

    (e: any) =>
      toast.error(`Something went wrong while adding question ${e}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      })
  );

  // const onSubmit = (data: any) => {
  //   const formData = new FormData();
  //   formData.append("file", data.file);
  //   console.log(formData)
  //   updateQuestion(formData as any);
  //   setOpenModal(false);
  // };

  const onSubmit = (data: any) => {
    const formData: any = new FormData();
    formData.append("file", data.file);

    // Iterate through the FormData entries to see its content
    for (const entry of formData.entries()) {
      console.log(entry);
    }

    // Pass formData to updateQuestion function
    updateQuestion(formData as any);
    // setOpenModal(false);
  };

  const activeClasses = classes?.data?.filter((item: any) => item.isActive);
  const allClasses = useMemo(
    () => formatOptions(activeClasses, "value", "name"),
    [activeClasses]
  );

  useEffect(() => {
    if (generalQuiz) {
      setQuestions(generalQuiz?.data?.content);
    }
  }, [generalQuiz]);

  const handleSearchFilter = (e: any) => {
    const searchValue = e.target.value;
    debouncedSearchFilterUpdate(searchValue);
  };

  const onClassSelect = (value: any) => {
    setSearchFilter((prev: any) => ({
      ...prev,
      className: value?.value,
    }));
    fetchQuiz();
  };

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz, searchFilter]);

  const navigate = useNavigate();
  // const handleOk = () => {
  //   setOpenModal(false);
  // };

  const handleSetQuestions = () => {
    setQuestions(null);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <UtilsHolder>
        <div>
          <SelectContainer>
            <Controller
              name="className"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={allClasses}
                  onChange={onClassSelect}
                  defaultValue="Select Class"
                  // width={160}
                />
              )}
            />
          </SelectContainer>

          <ButtonElement
            icon={<CsvIcon />}
            label="Upload CSV"
            // width={200}
            onClick={() => setOpenModalUpload(true)}
          />
          <ButtonElement
            icon={<AddIcon />}
            label="Add New Question"
            // width={200}
            onClick={() => navigate("/general_knowledge/add_question")}
          />
        </div>
        <ButtonElement
          outline={true}
          label="Download CSV Format"
          width={250}
          onClick={downloadGeneralTemplate}
        />
      </UtilsHolder>

      <QuestionsContainer>
        {isLoadingQuizes ? (
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
        ) : questions && generalQuiz.data.content.length > 0 ? (
          <div>
            {questions.map((question: any, index: number) => (
              <QuestionCard
                id={index + 1}
                imageUrl={question?.imageUrl}
                key={question?._id}
                question={question?.question}
                options={question?.options}
                answer={question?.correctOption}
                queryId={question?._id}
                item={question}
              />
            ))}
          </div>
        ) : (
          <NoData>
            <img src={noData} alt="No data" />
            <p>You haven’t added any question yet.</p>
            <p>Use the add question above to add a question.</p>
          </NoData>
        )}
      </QuestionsContainer>

      <Modal cancel={handleCancel} width={"40%"}>
        <ModalContent>
          <UploadTick />
          <p>Question Uploaded Successfully</p>
          <ButtonElement
            label="Done"
            width={100}
            onClick={handleSetQuestions}
          />
        </ModalContent>
      </Modal>

      <ModalUpload
        openState={openModalUpload}
        cancel={() => {
          setValue("file", null as any);
          setOpenModalUpload(false);
        }}
        width={"35%"}
      >
        <ModalContent2 onSubmit={handleSubmit(onSubmit)}>
          <h5>Upload question file</h5>
          <ImageInput
            error={errors.file}
            register={register}
            setValue={setValue}
            // clearItem={clearUpload}
            id="file"
            type="file"
            title="Upload file"
          />

          <ButtonElement
            type="submit"
            isLoading={updateLoading}
            label="Upload questions"
          />
        </ModalContent2>
      </ModalUpload>
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

const ModalUpload = styled(CenteredDialog)``;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media ${devices.tabletL} {
    flex-direction: column;
  }

  button {
    font-size: 0.8rem;
    width: 20vw;
    @media ${devices.tabletL} {
      width: 100% !important;
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    @media ${devices.tabletL} {
      width: 100%;
      flex-direction: column;
    }

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

const ModalContent2 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20%;
  height: 300px;
  @media ${devices.tablet} {
    width: 100px;
  }
`;

const QuestionsContainer = styled.div`
  padding: 0 20%;
  @media ${devices.tabletL} {
    padding: 0;
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

const Questions = styled.div``;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 10vw;
  @media ${devices.tabletL} {
    width: 100%;
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

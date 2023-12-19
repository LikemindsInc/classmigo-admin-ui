import { useState } from "react";
import { QuestionCard } from "./Components/QuestionCard";
import styled from "styled-components";
import {
  ButtonElement,
  ImageInput,
  SearchInput,
} from "../../../../../../../Ui_elements";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import {
  AddIcon,
  CsvIconPrimary,
} from "../../../../../../../Assets/Svgs";
import { useLocation, useNavigate } from "react-router-dom";
import noData from "../../../../../../../Assets/noData.png";
import dayjs from "dayjs";
import { useApiGet, useApiPost } from "../../../../../../../custom-hooks";
import {
  getAmigoQuizSingleQuestionsUrl,
  uploadQuestionsUrl,
} from "../../../../../../../Urls";
import { Skeleton } from "@mui/material";
import { downloadTemplate } from "../../../../../../../utils/utilFns";
import { CenteredDialog } from "../../../../../../../Ui_elements/Modal/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ViewQuestions = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;
  const [openModal, setOpenModal] = useState(false);

  const { register, setValue, handleSubmit } = useForm();

  const { data, isLoading, refetch } = useApiGet(
    ["amigoQuestion"],
    () => getAmigoQuizSingleQuestionsUrl(item._id),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const { mutate: updateQuestion, isLoading: updateLoading } = useApiPost(
    (_: any) => uploadQuestionsUrl(_, item._id),
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
      refetch();
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
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("file", data.file);
    updateQuestion(formData as any);
    setOpenModal(false);
  };

  return (
    <Container>
      <h6>{item?.className}</h6>
      <h3>{dayjs(item?.startDateTime).format("MMMM D, YYYY")}</h3>
      <UtilsHolder>
        {/* <SearchContainer>
          <SearchInput />
        </SearchContainer> */}
        <ButtonHolders>
          <ButtonElement
            outline
            icon={<CsvIconPrimary />}
            label="Download CSV Format"
            onClick={downloadTemplate}
          />
          <ButtonElement
            outline
            icon={<CsvIconPrimary />}
            label="Upload questions"
            onClick={() => setOpenModal(true)}
          />
          <ButtonElement
            icon={<AddIcon />}
            label="Add New Question"
            onClick={() =>
              navigate("#quiz/schedule_quiz/add_quiz_question", { state: item })
            }
          />
        </ButtonHolders>
      </UtilsHolder>
      <QuestionContainer>
        {data?.data?.questions.length > 0 ? (
          data?.data?.questions.map((item: any, index: number) => (
            <QuestionCard
              key={index}
              id={index + 1}
              question={item?.question}
              options={item?.options}
              imageUrl={item?.imageUrl}
              answer={item?.correctOption}
              detailId={item?._id}
              item={item}
              queryId={state}
            />
          ))
        ) : isLoading ? (
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
            <p>You do not have any questions yet.</p>
          </NoData>
        )}
      </QuestionContainer>
      <Modal
        openState={openModal}
        cancel={() => {
          setValue("file", null);
          setOpenModal(false);
        }}
        width={"35%"}
      >
        <ModalContent onSubmit={handleSubmit(onSubmit)}>
          <h5>Upload question file</h5>
          <ImageInput
            register={register}
            id="file"
            type="file"
            title="Upload file"
            setValue={setValue}
          />

          <ButtonElement
            type="submit"
            isLoading={updateLoading}
            label="Upload questions"
          />
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Container = styled.section`
  overflow-x: hidden;
  h6 {
    font-size: 1rem;
  }
  h3 {
    font-size: 1.2rem;
  }
`;

const UtilsHolder = styled.div`
  display: flex;
  margin: 3rem 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media ${devices.tabletL} {
    flex-direction: column;
  }

  h6 {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Modal = styled(CenteredDialog)``;

const ModalContent = styled.form`
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

export const SkeletonContainer = styled.div`
  margin-bottom: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 30%;
  p {
    font-weight: 600;
  }
  @media ${devices.tabletL} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const QuestionContainer = styled.section`
  padding: 0 20% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonHolders = styled.div`
  display: flex;
  gap: 1rem;

  button {
    font-size: 0.8rem;
    width: 100%;
    @media ${devices.tabletL} {
      width: 100% !important;
    }
  }

  @media ${devices.tabletL} {
    width: 100%;
    margin-top: 1rem;
    flex-direction: column;
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

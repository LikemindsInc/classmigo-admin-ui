import React, { useState } from "react";
import styled from "styled-components";
import { DeleteIcon, EditIcon } from "../../../../../../Assets/Svgs";

import Placeholder from "../../../../../../Assets/placeholder.png";
import { ButtonElement } from "../../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../../Ui_elements/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useApiPost } from "../../../../../../custom-hooks";
import { deleteGeneralQuestionUrl } from "../../../../../../Urls/GeneralKnowledge";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";

interface QuestionCardProp {
  imageUrl?: string | null;
  id?: number;
  question?: string;
  options?: any;
  answer?: any;
  detailId?: any;
  item?: any;
  queryId?: string;
}

export const QuestionCard = ({
  imageUrl,
  id,
  question,
  options,
  answer,
  detailId,
  item,
  queryId,
}: QuestionCardProp) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const { mutate: deleteQuestion, isLoading: isDeletingQuestion } = useApiPost(
    deleteGeneralQuestionUrl,
    () => {
      toast.success(`Successfully deleted question`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      setOpen(!open);
    },
    (e) => {
      toast.error(`Something went wrong ${e}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      setOpen(!open);
    },
    ["general-questions"]
  );

  const handleDelete = (quizId: any) => {
    deleteQuestion(quizId);
  };
  return (
    <Container>
      <QuestionHolder>
        <Number>
          <p>{id}</p>
        </Number>
        <QuestionContainer>
          <h5>{question}</h5>
          <OptionsContainer>
            {options.map((option: any, index: number) => (
              <div key={index}>
                <h6>{option.label}</h6>
                <p>{option.value}</p>{" "}
              </div>
            ))}
          </OptionsContainer>
          <Correct>Correct Answer: {answer}</Correct>
        </QuestionContainer>
      </QuestionHolder>

      <ImageContainer>
        <img
          src={imageUrl || Placeholder}
          alt=""
          onClick={() => setOpenImage(!openImage)}
        />
        <div>
          <ButtonElement
            outline
            icon={<EditIcon />}
            label="Edit"
            onClick={() =>
              navigate(`/general_knowledge/edit_question/${id}`, {
                state: { id: queryId, item: item },
              })
            }
          />
          <Delete onClick={() => setOpen(!open)} />
        </div>
      </ImageContainer>

      <Modal
        title="Delete Quiz?"
        okText="Delete"
        cancelText="Cancel"
        // okay={() => handleDelete(quizId)}
        cancel={() => setOpen(false)}
        openState={open}
      >
        <ModalContent>
          <p>Are you sure you want to delete this quiz?</p>
          <div>
            <ButtonElement outline label="No" onClick={() => setOpen(false)} />
            <ButtonElement
              label="Delete"
              onClick={() => handleDelete(queryId)}
              isLoading={isDeletingQuestion}
            />
          </div>
        </ModalContent>
      </Modal>

      <Modal
        cancelText="Cancel"
        width={"70%"}
        // okay={() => handleDelete(quizId)}
        cancel={() => setOpenImage(false)}
        openState={openImage}
      >
        <ModalContent>
          <img src={imageUrl || Placeholder} alt={"questionImage"} />
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 12px;
  gap: 1.5rem;
  width: 100%;
  background-color: var(--dashboardBackground);
  margin-bottom: 2rem;
  justify-content: space-between;
  @media ${devices.mobileM} {
    flex-direction: column;
    gap: 0.8rem;
  }
`;
const Number = styled.div`
  background-color: var(--primary-color);
  height: 0.3rem;
  width: 0.3rem;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
  }
  @media ${devices.tablet} {
    display: none;
  }
`;
const QuestionContainer = styled.div`
  h5 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;
const QuestionHolder = styled.div`
  display: flex;
  gap: 20px;
`;

const Correct = styled.h6`
  color: var(--primary-color);
  font-size: 1rem;
  @media ${devices.tabletL} {
    font-size: 0.8rem;
  }
`;

const OptionsContainer = styled.div`
  margin-top: 1rem;
  cursor: pointer;
  div {
    display: flex;
    /* margin-bottom: 0.5rem; */
    align-items: center;
    width: fit-content;
    &:hover {
      h6 {
        padding: 0.3rem;
        background-color: var(--primary-color);
        color: white;
      }
    }
    h6 {
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 1rem;
      margin-right: 0.1rem;
      height: 2rem;
      width: 2rem;
      padding: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      @media ${devices.tabletL} {
        font-size: 0.8rem;
      }
    }
    p {
      font-size: 0.9rem;
      @media ${devices.tabletL} {
        font-size: 0.8rem;
      }
    }
  }
`;

const ImageContainer = styled.div`
  img {
    width: 15vw;
    height: 150px;
    aspect-ratio: 1;
    object-fit: cover;
    background-color: var(--hover-color);
    @media ${devices.mobileM} {
      display: none;
    }
    @media ${devices.tabletL} {
      width: 30vw !important;
    }
  }
  > div {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    @media ${devices.mobileM} {
      justify-content: flex-start;
    }
    button {
      font-size: 0.7rem;
      width: fit-content !important;
      height: 30px;
    }
  }
`;

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;

const Modal = styled(CenteredDialog)``;
const ModalContent = styled.div`
  >div{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    /* transform: scale(1.2); */
  }
`;

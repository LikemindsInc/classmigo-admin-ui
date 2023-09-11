import React, { useContext, useState } from "react";
import styled from "styled-components";
// import { DeleteIcon, EditIcon } from "../../../../../../Assets/Svgs";
import { DeleteOutlined } from "@ant-design/icons";
import Placeholder from "../../../../../../../../Assets/placeholder.png";
// import { ButtonElement } from "../../../../../../Ui_elements";
// import { ModalContext } from "../../../../../../Contexts/Contexts";
import caution from "../../../../../../Assets/caution.png";
// import { useApiPost } from "../../../../../../custom-hooks";
// import { deleteQuizQuestionUrl } from "../../../../../../Urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CenteredDialog } from "../../../../../../../../Ui_elements/Modal/Modal";
import { ButtonElement } from "../../../../../../../../Ui_elements";
import { EditIcon } from "../../../../../../../../Assets/Svgs";
import { useApiPost } from "../../../../../../../../custom-hooks";

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
    // deleteQuizQuestionUrl,
    () => {},
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
      toast.error(`Something went wrong, ${e}`, {
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
    [`quiz${queryId}`]
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
          {/* <OptionsContainer>
            {options.map((option: any, index: number) => (
              <div key={index}>
                <h6>{option.label}</h6>
                <p>{option.value}</p>{" "}
              </div>
            ))}
          </OptionsContainer> */}
          {/* <Correct>Correct Answer: {answer}</Correct> */}
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
              navigate(`#practice/add_question`, {
                state: { id: detailId, item: item },
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
              onClick={() => handleDelete(detailId)}
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
`;
const Number = styled.div`
  background-color: var(--primary-color);
  height: 0.2rem;
  width: 0.2rem;
  padding: 0.7rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
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
const OptionsContainer = styled.div`
  margin-top: 1rem;
  cursor: pointer;
  div {
    display: flex;
    margin-bottom: 0.5rem;
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
      margin-right: 0.3rem;
      height: 1.3rem;
      width: 1.3rem;
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const ImageContainer = styled.div`
  img {
    width: 200px;
    height: 100px;
    object-fit: cover;
  }
  > div {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
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

const Correct = styled.h6`
  color: var(--primary-color);
  font-size: 1rem;
`;

const Modal = styled(CenteredDialog)``;
const ModalContent = styled.div`
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* transform: scale(1.2); */
  }
  p {
    margin: 10% 0;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

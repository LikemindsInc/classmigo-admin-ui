import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { useApiPost } from "../../../../../../custom-hooks";
import { deleteQuiz } from "../../../../../../Urls";
import { toast } from "react-toastify";
import { ButtonElement, Spinner } from "../../../../../../Ui_elements";
import { CenteredDialog } from "../../../../../../Ui_elements/Modal/Modal";
import { useContext, useState } from "react";
import { ModalContext } from "../../../../../../Contexts/Contexts";

interface Props {
  quizId?: number | string;
  details?: any;
}
export const Card = ({ quizId, details }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    toast.success("Successfully Deleted Quiz", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(`Something went wrong, couldn't delete quiz: ${error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: removeQuiz, isLoading: isDeletingQuiz } = useApiPost(
    deleteQuiz,
    onSuccess,
    onError,
    ["quizes"]
  );

  const handleDelete = (quizId: any) => {
    removeQuiz(quizId);
  };
  return (
    <OuterContainer>
      <Container>
        <DetailsContainer
          onClick={() => {
            navigate(`/quiz_library/${details?.name}`, {
              state: quizId,
            });
          }}
        >
          <h6>{details?.name}</h6>
        </DetailsContainer>
        <ToolsContainer>
          <Tools>{details?.questions.length} Questions</Tools>
        </ToolsContainer>
      </Container>
      {isDeletingQuiz ? (
        <Spinner color="var(--primary-color)" />
      ) : (
        <Delete onClick={() => setOpen(true)} />
      )}

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
              onClick={() => handleDelete(quizId)}
              isLoading={isDeletingQuiz}
            />
          </div>
        </ModalContent>
      </Modal>
    </OuterContainer>
  );
};

const Container = styled.div`
  background-color: var(--dashboardBackground);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-radius: 14px;
  width: 100%;
  max-width: 700px;
  transition: all 0.3s ease-in-out;

  @media ${devices.tabletL} {
    flex-direction: column;
  }

  @media ${devices.tabletL} {
    padding: 0.6rem 0.3rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    box-shadow: -1px 6px 13px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: -1px 6px 13px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 6px 13px -8px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const Tools = styled.p`
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  width: 114px;
  border-radius: 25px;
  background-color: white;
  border: 1px solid gray;
  text-align: center;
`;

const ToolsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const DetailsContainer = styled.div`
  width: 80%;
  max-width: auto;

  h6 {
    word-wrap: break-word;
    font-size: 1.2rem;
    font-weight: 700;
    @media ${devices.tablet} {
      background-colo: red !important;
      font-size: 0.9rem;
    }
  }
`;
export const SwitchContainer = styled.div`
  @media ${devices.mobileXS} {
    display: none;
  }
`;

const OuterContainer = styled.div`
  max-width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease-in-out;

  @media ${devices.tabletL} {
    flex-direction: column;
  }
`;

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  color: red;
`;

const Modal = styled(CenteredDialog)``;

const ModalContent = styled.div`
  text-align: center;
  p {
    margin: 10% 0;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

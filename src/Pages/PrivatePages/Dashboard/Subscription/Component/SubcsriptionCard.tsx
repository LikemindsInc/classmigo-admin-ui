import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SwitchElement } from "../../../../../Ui_elements/Switch/Switch";
import { ButtonElement } from "../../../../../Ui_elements";
import { CalculateDiscount } from "../../../../../utils/utilFns";
import { useApiDelete } from "../../../../../custom-hooks";
import {
  deleteSubscription,
  toggleIsPublic,
  toggleSubscription,
} from "../../../../../Urls";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ModalContext } from "../../../../../Contexts/Contexts";
import { CenteredDialog } from "../../../../../Ui_elements/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { Row } from "antd";

interface Props {
  subName: string;
  isActive: boolean;
  price: number;
  discount: number;
  planName: string;
  id: string;
  item: any;
  isPublic: boolean;
}
export const SubscriptionCard = ({
  subName,
  isActive,
  price,
  discount,
  planName,
  id,
  item,
  isPublic,
}: Props) => {
  const [active, setActive] = useState(isActive);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Successfully deleted subscription", {
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

  const onError = (e: AxiosError) => {
    toast.error(`Something went wrong. ${e}`, {
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

  const onSuccessToggle = () => {
    toast.success("Successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    setActive(!active);
  };

  const onErrorToggle = (e: AxiosError) => {
    toast.error(`Something went wrong. ${e}`, {
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

  const handleToggleActive = () => {
    const request: any = {
      id: id,
      isActive: !active,
    };
    activateToggleActive(request);
  };

  const handleChangeVisibility = () => {
    const request: any = {
      id: id,
      isPublic: !isPublic,
    };
    changeSubscriptionVisibility(request);
  };

  const { mutate: deleteSub, isLoading } = useApiDelete(
    () => deleteSubscription(id),
    onSuccess,
    onError,
    ["subscription"]
  );

  const { mutate: activateToggleActive } = useApiDelete(
    (_: any) => toggleSubscription(_, id),
    onSuccessToggle,
    onErrorToggle,
    ["subscription"]
  );

  const { mutate: changeSubscriptionVisibility } = useApiDelete(
    (_: any) => toggleIsPublic(_, id),
    onSuccessToggle,
    onErrorToggle,
    ["change-visibility", "subscription"]
  );

  const handleDelete = () => {
    deleteSub();
    setOpen(false);
  };
  const handleDeleteRequest = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Header>
        <h5>{subName}</h5>
        <Row>
          <div>
            <p>{active ? "Active" : "Disabled"}</p>
            <SwitchElement
              activeState={active}
              handleChange={handleToggleActive}
            />
          </div>
          <div>
            <p>{"Is Public"}</p>
            <SwitchElement
              activeState={isPublic}
              handleChange={handleChangeVisibility}
            />
          </div>
        </Row>
      </Header>
      <Details>
        <PlanContainer>
          <Plan>
            <PlanDetail>
              <b>Duration:</b>
              <h4>{planName}</h4>
            </PlanDetail>
            <PlanDetail>
              <b>Price:</b>
              <p>₦{price}</p>
            </PlanDetail>
            <PlanDetail>
              <b>Discount:</b>
              <p>
                ₦{discount} ({CalculateDiscount(discount, price)})%
              </p>
            </PlanDetail>
          </Plan>
        </PlanContainer>
        <ButtonContainer>
          <ButtonElement
            label="Update"
            onClick={() =>
              navigate("/subscription/create_plan", { state: item })
            }
          />
          <ButtonElement
            label="Delete"
            outline
            onClick={handleDeleteRequest}
            isLoading={isLoading}
          />
        </ButtonContainer>
      </Details>

      <Modal
        title="Delete Subcsription?"
        okText="Delete"
        cancelText="Cancel"
        cancel={() => setOpen(false)}
        openState={open}
      >
        <ModalContent>
          <p>Are you sure you want to delete this subscription?</p>
          <div>
            <ButtonElement outline label="No" onClick={() => setOpen(false)} />
            <ButtonElement label="Delete" onClick={handleDelete} />
          </div>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 1.5rem;
  border-radius: 6px;
`;

const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    font-weight: 800;
    font-size: 1.1rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const Details = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const PlanContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  justify-content: flex-end;
  flex: 0.15;
  gap: 5%;
  button {
    height: fit-content;
  }
`;

const Plan = styled.div`
  h4 {
    font-weight: 600;
    font-size: 1rem;
  }
  p,
  h4 {
    margin-bottom: 0.8rem;
  }
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

const PlanDetail = styled.div`
  display: flex;
  gap: 1rem;
`;

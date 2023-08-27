import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { MoveIcon } from "../../../../../../Assets/Svgs";
import { useApiGet } from "../../../../../../custom-hooks";
import { SwitchElement } from "../../../../../../Ui_elements/Switch/Switch";
import {
  activateSubtopicUrl,
  deactivateSubtopicUrl,
} from "../../../../../../Urls";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  indexCount: number;
  title: string;
  active?: boolean;
  handleChange?: () => void;
  parentItem?: any;
  id: string | number;
}
export const SubtopicCard = ({
  indexCount,
  title,
  active,
  id,
  parentItem,
  handleChange,
}: Props) => {
  console.log(active, "sub");

  const [localActive, setLocalActive] = useState(active)

  useEffect(() => {
    
  })
  const handleActivateSuccess = () => {
    toast.success("Successfully Activated topic", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    setLocalActive(!localActive)

  };
  const handleActivationError = (error: any) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const handleDeactivateSuccess = () => {
    toast.success("Successfully Deactivated topic", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
    setLocalActive(!localActive)
  };
  const handleDeactivationError = (error: any) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };
  const queryClient = useQueryClient();
  const { refetch: activateSubtopic, isFetching: isLoadingActivate } =
    useApiGet([`subject${indexCount}`], () => activateSubtopicUrl(id), {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: handleActivateSuccess,
      onError: handleActivationError,
    });

  const { refetch: deactivateSubtopic, isFetching: isLoadingDeactivate } =
    useApiGet([`subject${id}`], () => deactivateSubtopicUrl(id), {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: handleDeactivateSuccess,
      onError: handleDeactivationError,
    });

  const toggleSubtopicActive = () => {
    if (localActive) {
      deactivateSubtopic();
      queryClient.invalidateQueries([`sub_topic${parentItem}`]);
    } else {
      activateSubtopic();
      queryClient.invalidateQueries([`sub_topic${parentItem}`]);
    }
  };
  return (
    <Container>
      <Card>
        <div>
          <p>0{indexCount}.</p>
          <h6>{title}</h6>
        </div>
        <SwitchContainer>
          <SwitchElement
            activeState={localActive}
            handleChange={toggleSubtopicActive}
          />
        </SwitchContainer>
      </Card>
      <Move />
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const Card = styled.div`
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 90%;
  border-radius: 12px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  > div {
    display: flex;
    align-items: center;
    gap: 20px;
    h6 {
      font-size: 1rem;
    }
  }
`;

const SwitchContainer = styled.div`
  @media ${devices.mobileXS} {
    display: none;
  }
`;

const Move = styled(MoveIcon)`
  cursor: move;
  @media ${devices.tabletL} {
    display: none;
  }
`;

import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoreIcon } from "../../../../../../Assets/Svgs";
import {
  useApiPost,
  useFormattedDateTime,
} from "../../../../../../custom-hooks";
import { Tag } from "../../../../../../Ui_elements";
import { cancelLiveLesson } from "../../../../../../Urls/LiveSessions";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import live from "../../../../../../Assets/live.png";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";

interface Props {
  topic: string;
  time?: string;
  date?: string;
  item?: any;
}

export const UpcomingCard = ({ topic, time, date, item }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const newTimeFormat = useFormattedDateTime(item?.date);
  const currentTime = dayjs();
  const targetTime = dayjs(item?.date);
  const daysRemaining = targetTime.diff(currentTime, "day");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSuccess = () => {
    toast.success(`Successfully cancelled`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const handleError = () => {
    toast.error(`Something went wrong, could not cancel session`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: cancelSession } = useApiPost(
    cancelLiveLesson,
    handleSuccess,
    handleError,
    ["live-sessions"]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Details>
        <img src={live} alt="hi" />
        <div>
          <h6>{topic}</h6>
          <Time>
            <p>{newTimeFormat?.formattedDate}</p>
            <p>{newTimeFormat?.formattedTime}</p>
          </Time>
          <Start>
            {daysRemaining > 0 ? (
              <p>
                Starts in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
              </p>
            ) : (
              <p>Event has ended</p>
            )}
            <button id="basic-button" onClick={handleClick}>
              <MoreIcon />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Item
                onClick={() =>
                  navigate("/live_lessons/schedule_session", {
                    state: item,
                  })
                }
              >
                Edit
              </Item>
              <Item
                style={{ color: "red" }}
                onClick={() => cancelSession(item?._id)}
              >
                Cancel
              </Item>
            </Menu>
          </Start>

          <TagContainer>
            <Tag>{item?.subject?.name}</Tag>
            {/* <Tag>{item?.class}</Tag> */}
          </TagContainer>
        </div>
      </Details>
      {/* <ButtonElement
        label="Join"
        onClick={() =>
          navigate(`/live_lessons/${topic}`, {
            state: {
              item: item,
            },
          })
        }
      /> */}
    </Container>
  );
};

const Container = styled.div`
  min-width: 180px;
  width: 100%;
  max-width: 22vw;
  background-color: white;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 2vh;
  @media ${devices.tabletL} {
    min-width: 100% !important;
  }

  > button {
    margin-top: 0.8rem;
  }
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media ${devices.tabletL} {
    display: none !important;
    flex-direction: column;
  }
`;
const Details = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    @media ${devices.laptop} {
      display: none;
    }
  }
  > div {
    width: 100%;
    h6 {
      font-size: 1rem;
      font-weight: 800;
    }
  }
  display: flex;
  gap: 10px;

  @media ${devices.tabletL} {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const Time = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  p {
    font-size: 0.8vw;
    font-weight: 500;
    color: #585858;
    @media ${devices.laptop} {
      font-size: 0.7rem;
    }
  }
`;
const Start = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 0.8vw;
    color: var(--primary-color);
    font-weight: 700;
    @media ${devices.laptop} {
      font-size: 0.7rem;
    }
  }
  button {
    background-color: transparent;
  }
`;

const Item = styled(MenuItem)`
  font-size: 0.8rem;
  font-weight: 700;
`;

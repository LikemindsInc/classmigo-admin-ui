import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoreIcon } from "../../../../../../Assets/Svgs";
import {
  useApiPost,
  useFormattedDateTime,
} from "../../../../../../custom-hooks";
import { ButtonElement, Options, Tag } from "../../../../../../Ui_elements";
import { cancelLiveLesson } from "../../../../../../Urls/LiveSessions";

interface Props {
  topic: string;
  time?: string;
  date?: string;
  item: any;
}

export const UpcomingCard = ({ topic, time, date, item }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const newTimeFormat = useFormattedDateTime(item?.date);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(item)

  const { mutate: cancelSession } = useApiPost(
    cancelLiveLesson,
    () => {},
    () => {},
    ["live-sessions"]
  );
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Details>
        <img
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="hi"
        />
        <div>
          <h6>{topic}</h6>
          <Time>
            <p>{newTimeFormat?.formattedDate}</p>
            <p>{newTimeFormat?.formattedTime}</p>
          </Time>
          <Start>
            <p>Starts in 5 Days</p>
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
                onClick={()=>navigate("/live_lessons/schedule_session", {
                  state: item
                })}
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
          <Tag>{item?.subject}</Tag>
        </div>
      </Details>
      <ButtonElement
        label="Join"
        onClick={() =>
          navigate(`/live_lessons/${topic}`, {
            state: {
              item: item,
            },
          })
        }
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 1rem;

  > button {
    margin-top: 0.8rem;
  }
`;

const Details = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
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
`;

const Time = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  p {
    font-size: 0.8rem;
    font-weight: 00;
    color: #585858;
  }
`;
const Start = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 0.8rem;
    color: var(--primary-color);
    font-weight: 700;
  }
  button {
    background-color: transparent;
  }
`;

const Item = styled(MenuItem)`
  font-size: 0.8rem;
  font-weight: 700;
`;

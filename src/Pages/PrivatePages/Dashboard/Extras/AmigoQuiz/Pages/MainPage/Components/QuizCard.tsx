import React from "react";
import styled from "styled-components";
import { MoreIcon } from "../../../../../../../../Assets/Svgs";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  isActive?: false;
}
export const QuizCard = ({ isActive }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <section>
        <div id="basic-button" onClick={handleClick}>
          <MoreIcon />
        </div>
        {isActive === false ? (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                //   borderRadius: 6,
                marginTop: "10px",
                minWidth: 180,
                //   color:
                //     theme.palette.mode === "light"
                //       ? "rgb(55, 65, 81)"
                //       : theme.palette.grey[300],
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                "& .MuiMenu-list": {
                  padding: "4px 0",
                },
                "& .MuiMenuItem-root": {
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    //   color: theme.palette.text.secondary,
                    //   marginRight: theme.spacing(1.5),
                  },
                  "&:active": {
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  },
                  // "&:hover": {
                  //   backgroundColor: "var(--hover-color)",
                  // //   color: "white",
                  // },
                },
              },
            }}
          >
            <Item onClick={() => navigate("#quiz/schedule_quiz")}>
              Edit Details
            </Item>
            <Item
              style={{ color: "red" }}
              // onClick={() => cancelSession(item?._id)}
            >
              Delete Quiz
            </Item>
            <Item
            // onClick={() => cancelSession(item?._id)}
            >
              View Quiz Questions
            </Item>
            <Item onClick={() => navigate("#quiz/quiz_leaderboard")}>
              View Leaderboard
            </Item>
          </Menu>
        ) : (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                //   borderRadius: 6,
                marginTop: "10px",
                minWidth: 180,
                //   color:
                //     theme.palette.mode === "light"
                //       ? "rgb(55, 65, 81)"
                //       : theme.palette.grey[300],
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                "& .MuiMenu-list": {
                  padding: "4px 0",
                },
                "& .MuiMenuItem-root": {
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    //   color: theme.palette.text.secondary,
                    //   marginRight: theme.spacing(1.5),
                  },
                  "&:active": {
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  },
                  // "&:hover": {
                  //   backgroundColor: "var(--hover-color)",
                  // //   color: "white",
                  // },
                },
              },
            }}
          >
            <Item onClick={() => navigate("#quiz/schedule_quiz")}>
              Edit Details
            </Item>
            <Item
              style={{ color: "red" }}
              // onClick={() => cancelSession(item?._id)}
            >
              Delete Quiz
            </Item>
            <Item
              onClick={() => navigate(`#quiz/schedule_quiz/view_questions`)}
            >
              View Quiz Questions
            </Item>
          </Menu>
        )}
      </section>
      <div>
        <h6>October 7, 2023</h6>
        <p>8:00AM</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 15px 24px;
  width: 270px;
  border-radius: 12px;
  margin-bottom: 2%;
  section {
    display: flex;
    justify-content: flex-end;
  }
  h6 {
    width: 70%;
    font-size: 24px;
  }
  p {
    font-size: 0.8rem;
    margin-top: 10px;
  }
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Item = styled(MenuItem)`
  font-size: 0.8rem;
  font-weight: 700 !important;
  width: 200px;
`;

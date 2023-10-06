import { styled } from "styled-components";
import { NotificationIcon } from "../../../Assets/Svgs";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { NavbarContext, UserContext } from "../../../Contexts/Contexts";
import { Popover } from "antd";
import React from "react";
import { Breadcrumbs } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";
import { useNavigate } from "react-router-dom";
import { getFirstRouteName } from "../../../utils/utilFns";
import Cookies from "js-cookie";
import { Menu, MenuItem } from "@mui/material";

export const DashboardNavbar = () => {
  const { title, setTitle } = useContext(NavbarContext);
  const { setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    navigate("/");
  };

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setTitle(getFirstRouteName(window.location.href));
  }, [setTitle]);

  const handleClose = () => {
    setAnchorEl(null);
  };


  const content = (
    <Logout onClick={logout}>
      <p>Logout</p>
    </Logout>
  );

  return (
    <Container>
      <TitleContainer>
        <div>
          <h2>{title}</h2>
          <Breadcrumbs />
        </div>
      </TitleContainer>

      <NotificationContainer>
        {/* <NotificationIcon /> */}

        {/* <Popover content={content} trigger="click"> */}
        <Avatar size={32} icon={<UserOutlined />} onClick={handleClick}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Item onClick={logout}>Logout</Item>
        </Menu>
        {/* </Popover> */}
      </NotificationContainer>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  height: 5vh;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  position: sticky;
  top: 0;
  background-color: var(--dashboardBackground);

  @media ${devices.tabletL} {
    padding-left: 15%;
  }

  h2 {
    font-size: 1.7rem;
    @media ${devices.tabletL} {
      font-size: 1.2rem;
    }
  }
`;

const Logout = styled.div`
  width: fit-content;
  text-align: center;
  cursor: pointer;
  /* &:hover {
    background-color: #f5e9ff;
  } */
`;

const TitleContainer = styled.div`
  align-items: flex-end;
`;

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Item = styled(MenuItem)`
  font-size: 0.8rem;
  font-weight: 700;
`;

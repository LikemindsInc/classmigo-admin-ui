import { styled } from "styled-components";
import { NotificationIcon } from "../../../Assets/Svgs";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { NavbarContext, UserContext } from "../../../Contexts/Contexts";
import { Popover } from "antd";
import { Breadcrumbs } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";

export const DashboardNavbar = () => {
  const { title } = useContext(NavbarContext);
  const { setUser } = useContext(UserContext);
  const logout = () => {
    setUser(null);
  };

  const content = (
    <Logout onClick={logout}>
      <p>Logout</p>
    </Logout>
  );

  return (
    <Container>
      <div>
        <div>
          <h2>{title}</h2>
          <Breadcrumbs />
        </div>
      </div>

      <div>
        <NotificationIcon />
        <Popover content={content} trigger="click">
          <Avatar size={32} icon={<UserOutlined />} />
        </Popover>
      </div>
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

  h2 {
    font-size: 1.7rem;
    @media ${devices.tabletL} {
      font-size: 1.2rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  > div:first-child {
    align-items: flex-end;
  }
`;

const Logout = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f5e9ff;
  }
`;

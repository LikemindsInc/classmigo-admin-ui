import { styled } from "styled-components"
import { NotificationIcon } from "../../../Assets/Svgs"
import Avatar from "antd/es/avatar/avatar"
import { UserOutlined } from "@ant-design/icons"


export const DashboardNavbar = () => {
  return (
    <Container>
      <NotificationIcon />
      <Avatar size={32} icon={<UserOutlined/>} />
    </Container>
  )
}


const Container = styled.nav`
  width: 100%;
  height: 5vh;
  padding: 2rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  margin-bottom: 1.2rem;
  position: sticky;
  top:0;
  background-color: var(--dashboardBackground);
`



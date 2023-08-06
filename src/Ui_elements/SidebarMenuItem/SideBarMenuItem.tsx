import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useContext } from "react";
import { NavbarContext } from "../../Contexts/Contexts";

interface ButtonProps {
  icon: any;
  title: string;
  path: string;
}

export const SideBarMenuItem = ({ icon, title, path }: ButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle } = useContext(NavbarContext);

  const handleNavigate = (paths: string, title?: string) => {
    setTitle(title);
    navigate(paths);
  };

  return (
    <Container
      activeItem={location.pathname === path}
      onClick={() => handleNavigate(path, title)}
    >
      <div>{icon}</div>
      <p>{title}</p>
    </Container>
  );
};

const Container = styled.div<{ activeItem: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.9rem;
  transition: all ease 0.3s;
  padding: 11px 3.4rem;
  width: 100%;
  height: 100%;
  background: ${({ activeItem }) => (activeItem ? "#F5E9FF" : "transparent")};
  &:hover {
    cursor: pointer;
    background: #f5e9ff;
  }
  div {
    width: 20px;
    height: 20px;
  }
  p {
    font-size: 0.85rem;
  }
`;

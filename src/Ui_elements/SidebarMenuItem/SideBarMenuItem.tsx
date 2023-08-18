import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useContext } from "react";
import { NavbarContext } from "../../Contexts/Contexts";
import { devices } from "../../utils/mediaQueryBreakPoints";

interface ButtonProps {
  icon: any;
  title: string;
  path: string;
  setShowMenu?: () => boolean;
}

export const SideBarMenuItem = ({
  icon,
  title,
  path,
  setShowMenu,
}: ButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTitle } = useContext(NavbarContext);

  const handleNavigate = (paths: string, title?: string) => {
    // setShowMenu(false)

    setTitle(title);
    navigate(paths);
  };

  return (
    <Container
      activeItem={
        (location.pathname.slice(1).trim() === "" &&
          path.slice(1).trim() === "") ||
        (location.pathname.slice(1).includes(path.slice(1)) &&
          path.slice(1).trim() !== "")
      }
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

  @media ${devices.tablet} {
    p {
      display: none;
    }
    width: fill !important;
    padding: 11px 1rem;
  }
`;

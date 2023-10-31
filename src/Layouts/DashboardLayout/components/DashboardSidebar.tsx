// import { MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import styled from "styled-components";
import {
  AdminIcon,
  AmigoQuizIcon,
  AskIcon,
  HomeIcon,
  LessonIcon,
  Logo,
  PaymentIcon,
  QuizIcon,
  ScheduleIcon,
  SubscriptionIcon,
  UserIcon,
  VideoIcon,
} from "../../../Assets/Svgs";
import { SideBarMenuItem } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";
import { UserContext } from "../../../Contexts/Contexts";

export const DashboardSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useContext(UserContext);

  const userMenus = [
    {
      path: "/students",
      title: "Students",
      icon: <UserIcon />,
    },
    {
      path: "/parents",
      title: "Parents",
      icon: <UserIcon />,
    },
    {
      path: "/payments",
      title: "Payments",
      icon: <PaymentIcon />,
    },
    // {
    //   path: "/referals",
    //   title: "Referals",
    //   icon: <PaymentIcon />,
    // },
  ];

  const lessonMenus = [
    {
      path: "/lessons_criteria",
      title: "Lesson Criteria",
      icon: <LessonIcon />,
    },
    {
      path: "/video_library",
      title: "Video Library",
      icon: <VideoIcon />,
    },
    {
      path: "/quiz_library",
      title: "Quiz Library",
      icon: <QuizIcon />,
    },
    {
      path: "/schedule_lessons",
      title: "Schedule Weekly Lessons",
      icon: <ScheduleIcon />,
    },
    // {
    //   path: "/ask_the_teacher",
    //   title: "Ask The Teacher",
    //   icon: <AskIcon />,
    // },
    {
      path: "/live_lessons",
      title: "Live Lessons",
      icon: <ScheduleIcon />,
    },
  ];

  const extrasMenus = [
    // {
    //   path: "/assignment_help",
    //   title: "Assignment Help",
    //   icon: <UserIcon />,
    // },
    {
      path: "/general_knowledge",
      title: "General Knowledge",
      icon: <UserIcon />,
    },
    {
      path: "/amigo_quiz",
      title: "AmigoQuiz",
      icon: <AmigoQuizIcon />,
    },
  ];

  const subscriptionMenu = [
    {
      path: "/subscription",
      title: "Subscription",
      icon: <SubscriptionIcon />,
    },
  ];

  const showMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <OuterContainer fullWidth={menuOpen}>
      <Menu show={menuOpen} onClick={showMenu} />

      <Container show={menuOpen}>
        <div>
          <SideLogo />
          <section>
            <SideBarMenuItem
              icon={<HomeIcon />}
              path="/"
              title="Home"
              setMenuOpen={setMenuOpen}
            />
          </section>
          {user.role !== "TEACHER" && (
            <section>
              <h6>USERS</h6>
              {userMenus.map((item, index) => {
                return (
                  <SideBarMenuItem
                    // setShowMenu={setMenuOpen}
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    path={item.path}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                  />
                );
              })}
            </section>
          )}

          <section>
            <h6>LESSONS</h6>
            {lessonMenus.map((item, index) => {
              return (
                <SideBarMenuItem
                  // setShowMenu={setMenuOpen}
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              );
            })}
          </section>
          <section>
            <h6>EXTRAS</h6>
            {extrasMenus.map((item, index) => {
              return (
                <SideBarMenuItem
                  // setShowMenu={setMenuOpen}
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              );
            })}
          </section>

          {user?.role !== "TEACHER" && (
            <section>
              <h6>SUBSCRIPTION</h6>
              {subscriptionMenu.map((item, index) => {
                return (
                  <SideBarMenuItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    path={item.path}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                  />
                );
              })}
            </section>
          )}
        </div>

        {user?.role !== "TEACHER" && (
          <div>
            <SideBarMenuItem
              // setShowMenu={setMenuOpen}
              icon={<AdminIcon />}
              title="Admin Access"
              path={"/admin-access"}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          </div>
        )}
      </Container>

      <Touchable
        show={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      ></Touchable>
    </OuterContainer>
  );
};

const Container = styled.aside<{ show: boolean }>`
  max-height: 100vh;
  height: 100vh !important;
  padding: 1.5rem 0 3.4rem 0;
  width: 19vw !important;
  background-color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll !important;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${devices.tablet} {
    display: ${({ show }) => (show ? "block" : "none")};
    width: 5rem !important;
    padding: 0 !important;
  }

  > div {
    float: left;
  }

  h6 {
    font-size: 1rem;
    font-weight: 700;
    padding-left: 3.4rem;
    @media ${devices.tablet} {
      font-size: 0.8rem;
      color: gray;
      display: none;
    }
  }
  section {
    margin-bottom: 2.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const OuterContainer = styled.div<{ fullWidth: boolean }>`
  height: 100%;
  /* min-height: 100vh; */
  width: fit-content;
  @media ${devices.tablet} {
    display: flex;
    width: ${({ fullWidth }) => (fullWidth ? "100vw" : "fit-content")};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    overflow-y: scroll !important;
  }
`;

const Touchable = styled.div<{ show: boolean }>`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.08);
  display: ${({ show }) => (show ? "flex" : " none")};
`;

const SideLogo = styled(Logo)`
  width: clamp(3rem, 11vw, 11rem);
  height: clamp(1rem, 50vw, 1.5rem);
  margin-bottom: 2.8rem;
  margin-left: 3.4rem;
  @media ${devices.tablet} {
    display: none;
  }
`;

const Menu = styled(MenuOutlined)<{ show: boolean }>`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-top: 2.5rem;
  margin-left: 1.2rem;
  display: none;

  @media ${devices.tablet} {
    display: ${({ show }) => (show ? "none" : "block")};
  }
`;

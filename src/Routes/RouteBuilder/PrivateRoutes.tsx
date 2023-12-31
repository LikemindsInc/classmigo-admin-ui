import { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../../Ui_elements";
import { DashboardLayout } from "../../Layouts/DashboardLayout/DashboardLayout";
import Cookies from "js-cookie";
import { UserContext } from "../../Contexts/Contexts";

const LazyHome = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Home/Home")
);

//user menu routes
const LazyStudents = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Users/Students/Students")
);
const LazyParents = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Users/Parents/Parents")
);
const LazyPayments = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Users/Payments/Payments")
);

const LazyAmigoQuiz = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Extras/AmigoQuiz/AmigoQuiz")
);

// const LazyPracticeQuiz = lazy(
//   () =>
//     import(
//       "../../Pages/PrivatePages/Dashboard/Extras/AmigoQuiz/Pages/PracticeQuiz"
//     )
// );
// const LazyLeaderboard = lazy(
//   () =>
//     import(
//       "../../Pages/PrivatePages/Dashboard/Extras/AmigoQuiz/Pages/Leaderboard"
//     )
// );

//Lessons Menu routes
const LazyLessonCriteria = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/LessonCriteria"
    )
);
const LazyVideoLibrary = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/VideoLibrary/VideoLibrary"
    )
);
const LazyVideoLibraryDetails = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/VideoLibrary/Pages/VideoDetails"
    )
);

const LazyQuizLibrary = lazy(
  () =>
    import("../../Pages/PrivatePages/Dashboard/Lessons/QuizLibrary/QuizLibrary")
);
const LazyScheduleLessons = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/ScheduleWeeklyLessons/ScheduleLessons"
    )
);
const LazyAskTheTeacher = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/AskTheTeacher/AskTheTeacher"
    )
);

const LazyErrorPage = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Error/Error")
);

const LazySubscription = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Subscription/Subscription")
);

const LazySubscriptionCreatePlan = lazy(
  () =>
    import("../../Pages/PrivatePages/Dashboard/Subscription/Pages/CreatePlan")
);

const LazyScheduleLiveLessons = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LiveSessions/LiveSessions"
    )
);

const LazyScheduleLiveLessonsForm = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LiveSessions/Pages/LiveSessionsForm"
    )
);

//Extras Menu Routes
const LazyAssignmentHelp = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Extras/AssignmentHelp/AssignmentHelp"
    )
);
const LazyGeneralKnowledge = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge/GeneralKnowledge"
    )
);

const LazyChat = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Chat/Chat")
);

const LazyAddQuestionGeneralKnowledge = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge/Pages/AddQuestion"
    )
);

const LazyEditQuestionGeneralKnowledge = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge/Pages/EditQuestion"
    )
);

const LazyQuizLibraryAddQuestion = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/QuizLibrary/Pages/AddQuestion"
    )
);

const LazyQuizLibraryEditQuestion = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/QuizLibrary/Pages/EditQuestion"
    )
);

const LazyLessonSubject = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/Pages/Subject"
    )
);

const LazyLessonTopic = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/Pages/Topic"
    )
);

const AdminAccess = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Admin/Admin")
);

const LazyQuizDetails = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/QuizLibrary/Pages/QuizDetails"
    )
);

const CreateAdmin = lazy(
  () =>
    import("../../Pages/PrivatePages/Dashboard/Admin/CreateAdmin/CreateAdmin")
);

const AdminDetail = lazy(
  () =>
    import("../../Pages/PrivatePages/Dashboard/Admin/AdminDetail/AdminDetail")
);
const LazyLiveCall = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LiveSessions/Pages/LiveCall"
    )
);

const LazyAddSubtopic = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/Pages/Subtopic"
    )
);

const LazyReferals = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Users/Referals/Referals"
    )
);

export const PrivateRoutes = () => {
  const { user, setUser } = useContext(UserContext);
  const userDataFromCookie = Cookies.get("user");

  if (!userDataFromCookie) {
    setUser(null)
  }

  interface RouteConfig { 
    path: string;
    element: any;
    children?: RouteConfig[];
    restrictedRole?: string[];
  }

  const privateRoutes: RouteConfig[] = [
    {
      path: "/",
      element: <LazyHome />,
    },
    {
      path: "/students",
      element: <LazyStudents />,
      restrictedRole: ["TEACHER"],
    },
    {
      path: "/parents",
      element: <LazyParents />,
      restrictedRole: ["TEACHER"],
    },
    {
      path: "/payments",
      element: <LazyPayments />,
      restrictedRole: ["TEACHER"],
    },

    //lesson routes
    {
      path: "/lessons_criteria",
      element: <LazyLessonCriteria />,
    },
    {
      path: "/video_library",
      element: <LazyVideoLibrary />,
    },
    {
      path: "/video_library/:id",
      element: <LazyVideoLibraryDetails />,
    },
    {
      path: "/quiz_library",
      element: <LazyQuizLibrary />,
    },
    {
      path: "/quiz_library/:id",
      element: <LazyQuizDetails />,
    },
    {
      path: "/quiz_library/add_question",
      element: <LazyQuizLibraryAddQuestion />,
    },
    {
      path: "/quiz_library/edit_question/:id",
      element: <LazyQuizLibraryEditQuestion />,
    },
    {
      path: "/schedule_lessons",
      element: <LazyScheduleLessons />,
    },

    {
      path: "/ask_the_teacher",
      element: <LazyAskTheTeacher />,
    },
    {
      path: "/live_lessons",
      element: <LazyScheduleLiveLessons />,
    },
    {
      path: "/live_lessons/schedule_session",
      element: <LazyScheduleLiveLessonsForm />,
    },
    {
      path: "/assignment_help",
      element: <LazyAssignmentHelp />,
    },
    {
      path: "/general_knowledge",
      element: <LazyGeneralKnowledge />,
    },
    {
      path: "/general_knowledge/add_question",
      element: <LazyAddQuestionGeneralKnowledge />,
    },
    {
      path: "/general_knowledge/edit_question/:id",
      element: <LazyEditQuestionGeneralKnowledge />,
    },
    {
      path: "/general_knowledge/add_question",
      element: <LazyAddQuestionGeneralKnowledge />,
    },
    {
      path: "/assignment_help/:topic/discussion",
      element: <LazyChat />,
    },
    {
      path: "/ask_the_teacher/:topic/discussion",
      element: <LazyChat />,
    },
    {
      path: "/lessons_criteria/:subject",
      element: <LazyLessonSubject />,
    },
    {
      path: "/lessons_criteria/:subject/:lesson",
      element: <LazyLessonTopic />,
    },
    {
      path: "/lessons_criteria/:subject/:lesson/:topic",
      element: <LazyAddSubtopic />,
    },
    {
      path: "/live_lessons/:id",
      element: <LazyLiveCall />,
    },
    {
      path: "/subscription",
      element: <LazySubscription />,
      restrictedRole: ["TEACHER"],
    },
    {
      path: "/subscription/create_plan",
      element: <LazySubscriptionCreatePlan />,
      restrictedRole: ["TEACHER"],
    },

    {
      path: "/admin-access/create-user",
      element: <CreateAdmin />,
      restrictedRole: ["TEACHER"],
    },

    {
      path: "/admin-access",
      element: <AdminAccess />,
      restrictedRole: ["TEACHER"],
    },
    {
      path: "/admin-access/:id",
      element: <AdminDetail />,
      restrictedRole: ["TEACHER"],
    },
    {
      path: "/amigo_quiz",
      element: <LazyAmigoQuiz />,
      restrictedRole: ["TEACHER"],
    },
    {
      path: "/referals",
      element: <LazyReferals />,
      restrictedRole: ["TEACHER"],
    },

    // {
    //   path: "/amigo_quiz/practice_quiz",
    //   element: <LazyPracticeQuiz />,
    // },
    // {
    //   path: "/amigo_quiz/leaderboard",
    //   element: <LazyLeaderboard />,
    // },
    {
      path: "/*",
      element: <LazyErrorPage />,
    },
  ];


  return (
    <Routes>
      {privateRoutes.map((route: RouteConfig, index: number) => (
        <Route
          key={index}
          path={route.path}
          element={
            <DashboardLayout>
              <Suspense fallback={<Loader />}>
                {route.restrictedRole &&
                route.restrictedRole.length > 0 &&
                route.restrictedRole.includes(user?.role) ? (
                  <LazyErrorPage />
                ) : (
                  route.element
                )}
              </Suspense>
            </DashboardLayout>
          }
        ></Route>
      ))}
    </Routes>
  );
};

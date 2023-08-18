import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../../Ui_elements";
import { DashboardLayout } from "../../Layouts/DashboardLayout/DashboardLayout";
import { Container } from "../../Pages/PrivatePages/Dashboard/Users/Students/Students";

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
      "../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge/Pages/AddQuestion/AddQuestion"
    )
);

const LazyQuizLibraryAddQuestion = lazy(
  () =>
    import(
      "../../Pages/PrivatePages/Dashboard/Lessons/QuizLibrary/Pages/AddQuestion"
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

export const PrivateRoutes = () => {
  interface RouteConfig {
    path: string;
    element: any;
    children?: RouteConfig[];
  }

  const privateRoutes: RouteConfig[] = [
    {
      path: "/",
      element: <LazyHome />,
    },
    {
      path: "/students",
      element: <LazyStudents />,
    },
    {
      path: "/parents",
      element: <LazyParents />,
    },
    {
      path: "/payments",
      element: <LazyPayments />,
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
      path: "/quiz_library/add_question",
      element: <LazyQuizLibraryAddQuestion />,
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
      path: "/live_lessons/:id",
      element: <LazyLiveCall />,
    },

    {
      path: "/admin-access/create-user",
      element: <CreateAdmin />,
    },

    {
      path: "/admin-access",
      element: <AdminAccess />,
    },
    {
      path: "/admin-access/:id",
      element: <AdminDetail />,
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
              <Suspense fallback={<Loader />}>{route.element}</Suspense>
            </DashboardLayout>
          }
        ></Route>
      ))}
    </Routes>
  );
};

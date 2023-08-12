import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "../../Ui_elements";
import { DashboardLayout } from "../../Layouts/DashboardLayout/DashboardLayout";

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
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/LessonCriteria")
);
const LazyVideoLibrary = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/VideoLibrary")
);
const LazyQuizLibrary = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/QuizLibrary")
);
const LazyScheduleLessons = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/ScheduleLessons")
);
const LazyAskTheTeacher = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/AskTheTeacher")
);
const LazyScheduleLiveLessons = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/ScheduleLessons")
);

//Extras Menu Routes
const LazyAssignmentHelp = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Extras/AssignmentHelp/AssignmentHelp")
);
const LazyGeneralKnowledge = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge/GeneralKnowledge")
);

const LazyChat = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Chat/Chat")
);

const LazyAddQuestion = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge/Pages/AddQuestion/AddQuestion")
);

const LazyLessonSubject = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/Pages/Subject")
);

const LazyLessonTopic = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/LesssonCriteria/Pages/Topic")
);



export const PrivateRoutes = () => {
  interface RouteConfig {
    path: string;
    element: any;
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
      path: "/quiz_library",
      element: <LazyQuizLibrary />,
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
      path: "/assignment_help",
      element: <LazyAssignmentHelp />,
    },
    {
      path: "/general_knowledge",
      element: <LazyGeneralKnowledge />,
    },
    {
      path: "/general_knowledge/add_question",
      element: <LazyAddQuestion />,
    },
    {
      path: "/assignment_help/:topic/discussion",
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
        />
      ))}
    </Routes>
  );
};

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticationLayout } from "../../Layouts/AuthenticationLayout";
import { Loader } from "../../Ui_elements";
import { DashboardLayout } from "../../Layouts/DashboardLayout/DashboardLayout";

const LazyHome = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Home/Home")
);


//user menu routes
const LazyStudents = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Users/Students")
);
const LazyParents = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Users/Parents")
);
const LazyPayments = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Users/Payments")
);


//Lessons Menu routes
const LazyLessonCriteria = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Lessons/LessonCriteria")
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
  () => import("../../Pages/PrivatePages/Dashboard/Extras/AssignmentHelp")
);
const LazyGeneralKnowledge = lazy(
  () => import("../../Pages/PrivatePages/Dashboard/Extras/GeneralKnowledge")
);



export const PrivateRoutes = () => {
  interface RouteConfig {
    path: string;
    element: any;
  }

  const privateRoutes: RouteConfig[] = [
    {
      path: "/",
      element: <LazyHome/>,
    },
    {
      path: "/students",
      element: <LazyStudents/>,
    },
    {
      path: "/parents",
      element: <LazyParents />,
    },
    {
      path: "/payments",
      element: <LazyPayments/>,
    },

    //lesson routes
    {
      path: "/lessons_criteria",
      element: <LazyLessonCriteria/>,
    },
    {
      path: "/video_library",
      element: <LazyVideoLibrary/>,
    },
    {
      path: "/quiz_library",
      element: <LazyQuizLibrary />,
    },
    {
      path: "/schedule_lessons",
      element: <LazyScheduleLessons/>,
    },

    {
      path: "/ask_the_teacher",
      element: <LazyAskTheTeacher/>,
    },
    {
      path: "/live_lessons",
      element: <LazyScheduleLiveLessons />,
    },
    {
      path: "/assignment_help",
      element: <LazyAssignmentHelp/>,
    },
    {
      path: "/general_knowledge",
      element: <LazyGeneralKnowledge/>,
    },
  ];

  return (
    <Routes>
      {privateRoutes.map((route: RouteConfig, index: number) => (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense
              fallback={
                <Loader/>
              }
            >
              <DashboardLayout>{route.element}</DashboardLayout>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

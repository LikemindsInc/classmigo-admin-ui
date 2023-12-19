import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PrivateRoutes, SharedRoutes } from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material";
import {
  DrawerContextProvider,
  NavbarContextProvider,
} from "./Contexts/Providers";
import { ModalContextProvider } from "./Contexts/Providers/ModalContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useLayoutEffect } from "react";
import { UserContext } from "./Contexts/Contexts";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useIsOnline } from "./custom-hooks";
import Error from "./Pages/PrivatePages/Dashboard/Error/Error";
import { LessonCriteriaProvider } from "./Contexts/Providers/LessonCriteriaProvider";
import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isOnline = useIsOnline();
  const queryClient = new QueryClient();

  const customTheme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif",
      fontSize: 12,
      fontWeightBold: 1,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: { minWidth: "10px", borderRadius: "10px" },
        },
      },
    },
  });

  // useLayoutEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme}>
          <NavbarContextProvider>
            <DrawerContextProvider>
              <ModalContextProvider>
                <LessonCriteriaProvider>
                  {isOnline ? (
                    user ? (
                      <PrivateRoutes />
                    ) : (
                      <SharedRoutes />
                    )
                  ) : (
                    <Error />
                  )}

                  <ToastContainer />
                </LessonCriteriaProvider>
              </ModalContextProvider>
            </DrawerContextProvider>
          </NavbarContextProvider>
        </ThemeProvider>
      </LocalizationProvider>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;

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
import { useContext } from "react";
import { UserContext } from "./Contexts/Contexts";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useContext(UserContext);
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

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme}>
          <NavbarContextProvider>
            <DrawerContextProvider>
              <ModalContextProvider>
                {user ? <PrivateRoutes /> : <SharedRoutes />}
                <ToastContainer />
              </ModalContextProvider>
            </DrawerContextProvider>
          </NavbarContextProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;

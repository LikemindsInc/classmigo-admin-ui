import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PrivateRoutes } from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material";
import { DrawerContextProvider } from "./Contexts/Providers";
import { ModalContextProvider } from "./Contexts/Providers/ModalContextProvider";

function App() {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={customTheme}>
        <DrawerContextProvider>
          <ModalContextProvider>
            <PrivateRoutes />
          </ModalContextProvider>
        </DrawerContextProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;

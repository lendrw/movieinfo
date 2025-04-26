import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#ffffff',
        },

        secondary: {
            main: cyan[400],
            dark: cyan[500],
            light: cyan[300],
            contrastText: '#ffffff',
        },

        background: {
            paper: '#303134',
            default: '#202124',
        },
    },
    typography: {
        allVariants: {
            color: 'white',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: cyan[700],
                        '&:hover': {
                            backgroundColor: cyan[800],
                        },
                },
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                bar: {
                    backgroundColor: cyan[500], 
                },
                colorPrimary: {
                    backgroundColor: cyan[200], 
                },
                dashed: {
                    backgroundColor: cyan[100], 
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: cyan[700],
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: cyan[100],
              },
            },
          },
          MuiIcon: {
            styleOverrides: {
              root: {
                color: cyan[100],
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              input: {
                color: cyan[50],
              },
            },
          },
    }
});
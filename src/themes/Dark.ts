import { alpha, createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#17181c',
        },

        secondary: {
            main: cyan[300],
            dark: cyan[500],
            light: cyan[100],
            contrastText: '#101114',
        },

        background: {
            paper: '#181a20',
            default: '#101114',
        },
        divider: alpha('#ffffff', 0.1),
        text: {
            primary: '#f4f6fb',
            secondary: alpha('#f4f6fb', 0.68),
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            letterSpacing: 0,
        },
        h5: {
            letterSpacing: 0,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background:
                        'radial-gradient(circle at top left, rgba(251, 192, 45, 0.12), transparent 32rem), #101114',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: `1px solid ${alpha('#ffffff', 0.08)}`,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: '#17181c',
                    backgroundColor: yellow[700],
                        '&:hover': {
                            backgroundColor: yellow[600],
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
                backgroundColor: alpha('#101114', 0.78),
                color: '#f4f6fb',
                borderBottom: `1px solid ${alpha('#ffffff', 0.08)}`,
                backdropFilter: 'blur(18px)',
                boxShadow: 'none',
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: '#f4f6fb',
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              input: {
                color: '#f4f6fb',
              },
            },
          },
    }
});

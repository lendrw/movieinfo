import { alpha, createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#17181c',
        },

        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },

        background: {
            paper: '#ffffff',
            default: '#f6f7fb',
        },
        divider: alpha('#111827', 0.1),
        text: {
            primary: '#17181c',
            secondary: alpha('#17181c', 0.68),
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background:
                        'radial-gradient(circle at top left, rgba(251, 192, 45, 0.16), transparent 32rem), #f6f7fb',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: `1px solid ${alpha('#111827', 0.08)}`,
                    boxShadow: `0 18px 44px ${alpha('#111827', 0.08)}`,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha('#17181c', 0.82),
                    borderBottom: `1px solid ${alpha('#ffffff', 0.14)}`,
                    backdropFilter: 'blur(18px)',
                    boxShadow: 'none',
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
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.14),
                    },
                  },
            }
        }
    }
});

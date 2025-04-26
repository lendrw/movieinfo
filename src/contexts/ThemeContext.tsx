import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
    themeName: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

interface IAppThemeProviderProps {
    children: ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<"light" | "dark">("light");

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => (oldThemeName === "light" ? "dark" : "light"));
    }, []);

    const theme = useMemo(() => {
        return themeName === "light" ? LightTheme : DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box
                    width="100%" 
                    minHeight='100%'
                    bgcolor={theme.palette.background.default}
                >
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

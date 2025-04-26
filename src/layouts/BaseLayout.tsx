import React, { ReactNode } from "react";
import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IBaseLayoutProps {
    children: ReactNode,
    title: string,
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({ children, title }) => {
    const theme = useTheme();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));


    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            gap={1} 
            alignItems="center"
            marginTop={{xs: '56px', sm: '64px'}}
        >
            <Box
                padding={1} 
                height={theme.spacing(smDown ? 6 : mdDown ? 8 : 9)} 
                display="flex" 
                alignItems="center" 
                gap={1}
                margin={1}
            >
                <Typography 
                    variant={smDown ? "h5" : mdDown ? "h4" : "h4"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    width="100%"
                    textAlign="center"
                >
                    {title}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
                {children}
            </Box>
        </Box>
    )
}
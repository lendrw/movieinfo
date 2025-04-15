import React, { ReactNode } from "react";
import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IBaseLaoutProps {
    children: ReactNode,
    title: string,
}

export const BaseLayout: React.FC<IBaseLaoutProps> = ({ children, title }) => {
    const theme = useTheme();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));


    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box
                padding={1} 
                height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} 
                display="flex" 
                alignItems="center" 
                gap={1}
            >
                <Typography 
                        variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        {title}
                </Typography>
            </Box>


            {children}
        </Box>
    )
}
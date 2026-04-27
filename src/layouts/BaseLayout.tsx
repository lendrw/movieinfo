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
            gap={2}
            alignItems="center"
            paddingBottom={6}
        >
            <Box
                paddingX={2}
                paddingTop={{ xs: 3, md: 4 }}
                minHeight={theme.spacing(smDown ? 6 : mdDown ? 8 : 9)}
                display="flex"
                alignItems="center"
                gap={1}
                marginTop={1}
            >
                <Typography
                    variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    width="100%"
                    textAlign="center"
                    fontWeight={800}
                    letterSpacing={0}
                >
                    {title}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='center' width="100%">
                {children}
            </Box>
        </Box>
    )
}

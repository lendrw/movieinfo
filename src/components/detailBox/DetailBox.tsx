import { Box, Grid, Icon, Paper, Theme, Typography, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";



interface IDetailBoxProps {
    title: string;
    icon: string;
    info: string | number;
}

export const DetailBox: React.FC<IDetailBoxProps> = ({ title, icon, info}) => {
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return(
        <Grid size={{ xs: 12, sm: 6, md: 4 }} display='flex' justifyContent='center'>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: (theme) => alpha(theme.palette.primary.main, 0.34),
                        boxShadow: (theme) => `0 16px 34px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.24 : 0.08)}`,
                    },
                }}
            >
                <Box padding={2.5}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Icon sx={{ color: 'primary.main' }}>{icon}</Icon>
                        <Typography variant={mdDown ? "subtitle1" : "h6"} fontWeight={700}>
                            &nbsp;{title}:
                        </Typography>
                    </Box>
                    <Typography marginTop={1} variant="body2" textAlign='center' color="text.secondary">
                        {info}
                    </Typography>
                </Box>
            </Paper>
            
        </Grid>
    )
}

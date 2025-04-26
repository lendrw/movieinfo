import { Box, Grid, Icon, Paper, Theme, Typography, useMediaQuery } from "@mui/material";
import React from "react";



interface IDetailBoxProps {
    title: string;
    icon: string;
    info: string | number;
}

export const DetailBox: React.FC<IDetailBoxProps> = ({ title, icon, info}) => {
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return(
        <Grid size={{ xs: 12, sm: 6}} padding={1} display='flex' justifyContent='center'>
            <Paper elevation={5} sx={{width: '100%'}}>
                <Box padding={3}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Icon>{icon}</Icon>
                        <Typography variant={mdDown ? "h6" : "h5"}>
                            &nbsp;{title}:
                        </Typography>
                    </Box>
                    <Typography margin={1} variant="body1" textAlign='center'>
                        {info}
                    </Typography>
                </Box>
            </Paper>
            
        </Grid>
    )
}
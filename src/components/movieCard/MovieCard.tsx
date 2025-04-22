import { Box, Button, Card, CardContent, CardMedia, Icon, Typography } from "@mui/material";
import React from "react";
import { Environment } from "../../environment";
import { useNavigate } from "react-router-dom";



interface IMovieCardProps {
    id: number;
    poster: string;
    title: string;
    vote_average: number;
    showLink?: boolean;
    hasOverview?: boolean;
    overview?: string;
}

const imgURL = Environment.MOVIE_IMG;

export const MovieCard: React.FC<IMovieCardProps> = (
    { 
        id, 
        poster, 
        title, 
        vote_average, 
        showLink, 
        hasOverview,
        overview
    }
) => {

    const navigate = useNavigate();

    return (
        <Card>
            <CardMedia
                image={imgURL + poster}
                title={title}
                sx={{ minHeight: 450}}
            />
            <CardContent>
                <Typography variant="h6" textAlign='center'>
                    {title}
                </Typography>
                <Box
                    display='flex' 
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Typography variant="subtitle1" display='flex'>
                        <Box display="flex" alignItems="center">
                            <Icon fontSize="inherit">starrate</Icon>
                        </Box>
                        &nbsp;{vote_average.toFixed(2)}
                    </Typography>

                        {showLink && (
                            <Button 
                                variant="contained"
                                onClick={() => navigate(`/movie/${id}`)}
                                fullWidth
                            >
                                Details
                            </Button>
                        )}
                        {hasOverview && (
                            <Typography variant="body1">
                                {overview}
                            </Typography>
                        )}
                </Box>
            </CardContent>
        </Card>
    )
}
import { Box, Button, Card, CardContent, CardMedia, Icon, Typography } from "@mui/material";
import React from "react";
import { Environment } from "../../environment";
import { useNavigate } from "react-router-dom";
interface IMovieCardProps {
    id: number;
    title: string;
    tagline?: string;
    poster: string;
    vote_average: number;
    showLink?: boolean;
    variant: string;
}

const imgURL = Environment.MOVIE_IMG;

export const MovieCard: React.FC<IMovieCardProps> = (
    { 
        id, 
        poster, 
        title, 
        vote_average, 
        showLink, 
        tagline,
        variant,
    }
) => {

    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 550 }}>
            <CardMedia
                component="img"
                image={imgURL + poster}
                title={title}
                sx={{
                    objectFit: 'contain', 
                    width: '100%',
                    height: '100%', 
                }}
            />
            <CardContent>
                <Box
                    display='flex' 
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    gap={1}
                >
                    <Typography variant={variant} textAlign='center'>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center'}}>
                        <Icon fontSize="inherit">starrate</Icon>&nbsp;{vote_average.toFixed(2)}
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
                        {tagline && (
                            <Typography variant="body1" textAlign="center">
                                {tagline}
                            </Typography>
                        )}
                </Box>
            </CardContent>
        </Card>
    )
}
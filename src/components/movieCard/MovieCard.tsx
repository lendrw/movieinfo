import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Environment } from "../../environment";
import { useNavigate } from "react-router-dom";



interface IMovieCardProps {
    id: number;
    poster: string;
    title: string;
    vote_average: number;
    showLink?: boolean;
}

const imgURL = Environment.MOVIE_IMG;

export const MovieCard: React.FC<IMovieCardProps> = (
    { 
        id, 
        poster, 
        title, 
        vote_average, 
        showLink = true 
    }
) => {
    const navigate = useNavigate();

    return (
        <Card>
            <CardMedia
                image={imgURL + poster}
                title={title}
                sx={{ height: 450}}
            />
            <CardContent>
                <Typography variant="h5" textAlign='center'>
                    {title}
                </Typography>
                <Box
                    display='flex' 
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Typography variant="caption">
                        {vote_average.toFixed(2)}
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
                </Box>
            </CardContent>
        </Card>
    )
}
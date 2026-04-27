import { Box, Grid, Icon, Typography } from "@mui/material"
import { BaseLayout } from "../../layouts"
import { DetailBox, LinearBuffer, MovieCard } from "../../components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { MovieService, type IMoviesList } from "../../services/api/movies/MovieService"
import { validateMovieId } from "../../utils";


export const MovieDetails = ( ) => {
    const { id } = useParams<'id'>();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<IMoviesList>();
    const [recommendations, setRecommendations] = useState<IMoviesList[]>([]);
    const [error, setError] = useState<string>('');

    const formatCurrency = (number: number) => {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    };

    useEffect(() => {
        setLoading(true);
        setError('');
        setMovie(undefined);
        setRecommendations([]);

        const validation = validateMovieId(id);
        if (!validation.valid) {
            setError(validation.message || 'Invalid movie ID');
            setLoading(false);
            return;
        }

        const movieId = Number(id);

        MovieService.getById(movieId)
            .then((result) => {
                setLoading(false);

                if (!result.success) {
                    setError(result.error);
                } else {
                    setMovie(result.data);
                }
            })

        MovieService.getRecommendations(movieId)
            .then((result) => {
                if (result.success) {
                    setRecommendations(result.data.results.slice(0, 6));
                }
            });
    }, [id]);

    if (error) {
        return (
          <BaseLayout title="Error">
            <Box width='100vw' display='flex' justifyContent='center' alignItems='center' minHeight='50vh'>
                <Typography color="error">{error}</Typography>
            </Box>
          </BaseLayout>
        );
    }

    if (!movie || loading) {
        return (
          <BaseLayout title="Loading...">
            <Box
                width='100%'
            >
                <LinearBuffer/>
            </Box>
          </BaseLayout>
        );
      }

    return (
        <BaseLayout title={movie.title}>
            {!loading && (
                <Box
                    width={{ xs: '94dvw', md: 900, lg: 1100 }}
                    display='flex' 
                    flexDirection='column' 
                    alignItems='center' 
                    gap={3}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', md: '320px 1fr' }}
                        gap={3}
                        width="100%"
                        alignItems="start"
                    >
                        <MovieCard
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            vote_average={movie.vote_average}
                            tagline={movie.tagline}
                        />
                        <Box width='100%'>
                            <Typography marginBottom={2} variant="h5" sx={{display: 'flex', alignItems: 'center'}}>
                                <Icon>description</Icon> &nbsp; Overview:
                            </Typography>
                            <Typography variant="body1" textAlign='justify' color="text.secondary">
                                {movie.overview || 'No overview available.'}
                            </Typography>
                        </Box>
                    </Box>
                    <Grid 
                        container 
                        spacing={2}
                        width="100%"
                    >
                        <DetailBox
                            icon="theater_comedy"
                            title="Genres"
                            info={movie.genres?.map((genre) => genre.name).join(', ') || 'Unavailable'}
                        />
                        <DetailBox
                            icon="calendar_month"
                            title="Release date"
                            info={new Date(movie.release_date).toLocaleDateString('en-US')}
                        />
                        <DetailBox
                            icon="wallet"
                            title="Budget"
                            info={formatCurrency(movie.budget)}
                        />
                        <DetailBox
                            icon="trending_up"
                            title="Revenue"
                            info={formatCurrency(movie.revenue)}
                        />
                        <DetailBox
                            icon="access_time"
                            title="Runtime"
                            info={movie.runtime + ' minutes'}
                        />
                        <DetailBox
                            icon="ballot"
                            title="Vote count"
                            info={movie.vote_count}
                        />
                        <DetailBox
                            icon="thumbs_up_down"
                            title="Popularity"
                            info={movie.popularity}
                        />
                        <DetailBox
                            icon="language"
                            title="Original language"
                            info={movie.original_language}
                        />
                        <DetailBox
                            icon="title"
                            title="Original title"
                            info={movie.original_title}
                        />
                    </Grid>
                    {recommendations.length > 0 && (
                        <Box width="100%">
                            <Typography variant="h5" marginBottom={2}>
                                You might also like
                            </Typography>
                            <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
                                {recommendations.map((recommendation) => (
                                    <Grid
                                        key={recommendation.id}
                                        size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                                    >
                                        <MovieCard
                                            id={recommendation.id}
                                            title={recommendation.title}
                                            poster={recommendation.poster_path}
                                            vote_average={recommendation.vote_average}
                                            showLink
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            )}
        </BaseLayout>
    )
}

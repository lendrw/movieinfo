import { Box, Grid, Icon, Typography } from "@mui/material"
import { BaseLayout } from "../../layouts"
import { DetailBox, LinearBuffer, MovieCard } from "../../components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { IMovieDetails, MovieService } from "../../services/api/movies/MovieService"


export const MovieDetails = ( ) => {
    const { id } = useParams<'id'>();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<IMovieDetails>();

    const formatCurrency = (number: number) => {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    };

    useEffect(() => {
        setLoading(true);

        MovieService.getById(Number(id))
            .then((result) => {
                setLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setMovie(result)
                }
            })
    }, [id]);

    if (!movie || loading) {
        return (
          <BaseLayout title="Loading...">
            <Box
                width='100vw'
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
                    maxWidth={800} 
                    display='flex' 
                    flexDirection='column' 
                    alignItems='center' 
                    height='100%'
                >
                    <MovieCard
                        variant={"h5"}
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        vote_average={movie.vote_average}
                        tagline={movie.tagline}
                    />
                    <Box width='100%'>
                        <Typography margin={2} variant="h5" sx={{display: 'flex', alignItems: 'center'}}>
                            <Icon>description</Icon> &nbsp; Overview:
                        </Typography>
                        <Typography margin={2} variant="body1" textAlign='justify'>
                            {movie.overview}
                        </Typography>
                    </Box>
                    <Grid 
                        container 
                        margin={1} 
                        spacing={1}
                    >
                        <DetailBox
                            icon="theater_comedy"
                            title="Genres"
                            info={movie.genres?.map((genre) => genre.name).join(', ')}
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
                </Box>
            )}
        </BaseLayout>
    )
}
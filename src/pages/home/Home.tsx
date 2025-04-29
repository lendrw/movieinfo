import { Box, Grid } from "@mui/material"
import { BaseLayout } from "../../layouts"
import { LinearBuffer, MovieCard } from "../../components"
import { MovieService, IMoviesList } from "../../services/api/movies/MovieService"
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks"

export const Home = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<IMoviesList[]>([]);
    const [loading, setLoading] = useState(true);

    const { debounce } = useDebounce();

    useEffect(() => {
        setLoading(true);

        debounce(() => {
            MovieService.getTopRatedMovies()
                .then((result) => {
                    setLoading(false);

                    if (result instanceof Error) {
                        alert(result.message)
                        console.log(result);
                    } else {
                        console.log(result);
                        setTopRatedMovies(result.data);
                    }
                })
        })
    }, [debounce]);

    return (
        <BaseLayout
            title="Top rated movies"
        >
            <Box sx={{width: {xs: '95dvw', lg: '90dvw'}}}>
                {loading && (
                    <LinearBuffer/>
                )}
                {!loading && (
                    <Grid 
                        container 
                        margin={1} 
                        spacing={2}
                    >
                        {topRatedMovies.map(movie => (
                            <Grid 
                                key={movie.id} 
                                size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 2 }}>
                                <MovieCard
                                    variant={"h6"}
                                    id={movie.id}
                                    title={movie.title}
                                    poster={movie.poster_path}
                                    vote_average={movie.vote_average}
                                    showLink
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                
            </Box>
        </BaseLayout>
    )
}
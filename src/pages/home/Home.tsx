import { Box, Grid } from "@mui/material"
import { BaseLayout } from "../../layouts"
import { LinearBuffer, MovieCard } from "../../components"
import { MovieService, IMoviesList } from "../../services/api/movies/MovieService"
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks"


export const Home = () => {
    const [movies, setMovies] = useState<IMoviesList[]>([]);
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

                        setMovies(result.data);
                    }
                })
        })
    }, [debounce])

    return (
        <BaseLayout
            title="Top rated movies"
        >
            <Box sx={{width: {xs: '90%', sm: '95%'}}} display='flex'>
                {loading && (
                    <LinearBuffer/>
                )}
                {!loading && (
                    <Grid 
                        container 
                        margin={2} 
                        spacing={2}
                    >
                        {movies.map(movie => (
                            <Grid 
                                key={movie.id} 
                                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                                <MovieCard
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
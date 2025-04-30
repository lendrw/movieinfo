import { Box, Grid, Pagination } from "@mui/material"
import { BaseLayout } from "../../layouts"
import { LinearBuffer, MovieCard } from "../../components"
import { MovieService, IMoviesList } from "../../services/api/movies/MovieService"
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks"
import { useSearchParams } from "react-router-dom";

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [topRatedMovies, setTopRatedMovies] = useState<IMoviesList[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const { debounce } = useDebounce();

    const page = useMemo(() => {
        return Number(searchParams.get('page') || '1');
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);

        debounce(() => {
            MovieService.getTopRatedMovies(Number(page))
                .then((result) => {
                    setLoading(false);

                    if (result instanceof Error) {
                        alert(result.message)
                        console.log(result);
                    } else {
                        console.log(result);
                        setTotalCount(result.total_results);
                        setTotalPages(result.total_pages);
                        setTopRatedMovies(result.results);
                    }
                })
        })
    }, [debounce, page]);

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
                
                
                {(!loading && totalCount > 0 && totalCount > 19) && (
                    <Box margin={3} display='flex' justifyContent='center'>
                        <Pagination
                            sx={{display: 'flex'}}
                            page={page}
                            count={totalPages}
                            onChange={(_, newPage) => setSearchParams(
                                            { page: newPage.toString() }, 
                                            { replace: true })}
                        />
                    </Box>
                )}
                
            </Box>
            
        </BaseLayout>
    )
}
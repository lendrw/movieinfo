import { Box } from "@mui/material"
import { BaseLayout } from "../../layouts"
import { MovieCard } from "../../components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getById, IMovieDetails, MovieService } from "../../services/api/movies/MovieService"

export const MovieDetails = ( ) => {
    const { id } = useParams<'id'>();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<IMovieDetails>();

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

    if (!movie) {
        return (
          <BaseLayout title="Loading...">
            <Box>Carregando detalhes do filme...</Box>
          </BaseLayout>
        );
      }
      

    return (
        <BaseLayout title={movie.title}>
            <Box>
                <MovieCard
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        vote_average={movie.vote_average}
                />               
            </Box>
        </BaseLayout>
    )
}
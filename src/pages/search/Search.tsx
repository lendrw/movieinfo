import { Box, Grid, Pagination } from "@mui/material";
import { BaseLayout } from "../../layouts";
import { useEffect, useMemo, useState } from "react";
import {
  IMoviesList,
  MovieService,
} from "../../services/api/movies/MovieService";
import { useDebounce } from "../../hooks";
import { LinearBuffer, MovieCard } from "../../components";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<IMoviesList[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { query = "" } = useParams<{
    query: string;
  }>();

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const { debounce } = useDebounce();

  useEffect(() => {
    if (query.trim() === "") {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounce(() => {
      MovieService.getSearchMovie(Number(page), query).then((result) => {
        if (result instanceof Error) {
          alert("No movies found");
          setMovies([]);
        } else {
          setTotalCount(result.total_results);
          setTotalPages(result.total_pages);
          setMovies(result.results);
        }
        setLoading(false);
      });
    });
  }, [debounce, query, page]);

  return (
    <BaseLayout
      title={
        movies.length > 0
          ? `Showing results for: '${query}'`
          : "No movies found"
      }
    >
      <Box sx={{ width: { xs: "95dvw", lg: "90dvw" } }}>
        {loading && <LinearBuffer />}
        {!loading && movies && (
          <Grid container margin={1} spacing={2}>
            {movies.map((movie) => (
              <Grid
                key={movie.id}
                size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 2 }}
              >
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
        {!loading && totalCount > 0 && totalCount > 19 && (
          <Box margin={3} display="flex" justifyContent="center">
            <Pagination
              sx={{ display: "flex" }}
              page={page}
              count={totalPages > 500 ? 500 : totalPages}
              onChange={(_, newPage) =>
                setSearchParams({ page: newPage.toString() }, { replace: true })
              }
            />
          </Box>
        )}
      </Box>
    </BaseLayout>
  );
};

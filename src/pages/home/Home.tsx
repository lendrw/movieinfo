import { Box, Grid, Pagination, Tab, Tabs, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { BaseLayout } from "../../layouts";
import { LinearBuffer, MovieCard } from "../../components";
import {
  MOVIE_LIST_OPTIONS,
  MovieService,
  type IMoviesList,
  type MovieListCategory,
} from "../../services/api/movies/MovieService";
import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<IMoviesList[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string>("");

  const { debounce } = useDebounce();

  const category = useMemo<MovieListCategory>(() => {
    const value = searchParams.get("category");
    const exists = MOVIE_LIST_OPTIONS.some((option) => option.value === value);
    return exists ? (value as MovieListCategory) : "top_rated";
  }, [searchParams]);

  const currentCategory =
    MOVIE_LIST_OPTIONS.find((option) => option.value === category) ||
    MOVIE_LIST_OPTIONS[0];

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const handleCategoryChange = (_: SyntheticEvent, newCategory: string) => {
    setSearchParams({ category: newCategory, page: "1" }, { replace: true });
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    debounce(() => {
      MovieService.getMovieList(category, Number(page)).then((result) => {
        setLoading(false);

        if (!result.success) {
          setError(result.error);
          setMovies([]);
          setTotalCount(0);
          setTotalPages(0);
        } else {
          setTotalCount(result.data.total_results);
          setTotalPages(result.data.total_pages);
          setMovies(result.data.results);
        }
      });
    });
  }, [category, debounce, page]);

  return (
    <BaseLayout title={currentCategory.title}>
      <Box sx={{ width: { xs: "94dvw", lg: "90dvw" }, maxWidth: 1440 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={(theme) => ({
              minHeight: 44,
              p: 0.5,
              border: 1,
              borderColor: "divider",
              borderRadius: 999,
              bgcolor: alpha(
                theme.palette.background.paper,
                theme.palette.mode === "dark" ? 0.72 : 0.82,
              ),
              "& .MuiTabs-flexContainer": {
                gap: 0.5,
              },
              "& .MuiTab-root": {
                minHeight: 36,
                px: 2,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                color: "text.secondary",
              },
              "& .MuiTab-root.Mui-selected": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.contrastText
                    : theme.palette.primary.contrastText,
                bgcolor: theme.palette.primary.main,
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            })}
            aria-label="movie list categories"
          >
            {MOVIE_LIST_OPTIONS.map((option) => (
              <Tab
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Tabs>
        </Box>
        {loading && <LinearBuffer />}
        {!loading && (
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {error && (
              <Box width="100%" p={2} textAlign="center">
                <Typography color="error">{error}</Typography>
              </Box>
            )}
            {movies.map((movie) => (
              <Grid
                key={movie.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
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
                setSearchParams(
                  { category, page: newPage.toString() },
                  { replace: true },
                )
              }
            />
          </Box>
        )}
      </Box>
    </BaseLayout>
  );
};

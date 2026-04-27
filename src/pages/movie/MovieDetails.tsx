import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { BaseLayout } from "../../layouts";
import { DetailBox, LinearBuffer, MovieCard } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  getImageUrl,
  MovieService,
  type IMovieCastMember,
  type IMovieCrewMember,
  type IMovieVideo,
  type IMoviesList,
  type IWatchRegionProviders,
} from "../../services/api/movies/MovieService";
import { validateMovieId } from "../../utils";
import { Environment } from "../../environment";

const WATCH_REGION = Environment.WATCH_REGION;

export const MovieDetails = () => {
  const { id } = useParams<"id">();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<IMoviesList>();
  const [recommendations, setRecommendations] = useState<IMoviesList[]>([]);
  const [cast, setCast] = useState<IMovieCastMember[]>([]);
  const [crew, setCrew] = useState<IMovieCrewMember[]>([]);
  const [videos, setVideos] = useState<IMovieVideo[]>([]);
  const [watchProviders, setWatchProviders] = useState<IWatchRegionProviders>();
  const [error, setError] = useState<string>("");

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const directors = useMemo(() => {
    return crew.filter((member) => member.job === "Director");
  }, [crew]);

  const trailer = useMemo(() => {
    const youtubeVideos = videos.filter((video) => video.site === "YouTube");

    return (
      youtubeVideos.find(
        (video) => video.type === "Trailer" && video.official,
      ) ||
      youtubeVideos.find((video) => video.type === "Trailer") ||
      youtubeVideos[0]
    );
  }, [videos]);

  const streamingProviders = useMemo(() => {
    return [
      ...(watchProviders?.flatrate || []),
      ...(watchProviders?.rent || []),
      ...(watchProviders?.buy || []),
    ].filter((provider, index, providers) => {
      return (
        providers.findIndex(
          (item) => item.provider_id === provider.provider_id,
        ) === index
      );
    });
  }, [watchProviders]);

  useEffect(() => {
    setLoading(true);
    setError("");
    setMovie(undefined);
    setRecommendations([]);
    setCast([]);
    setCrew([]);
    setVideos([]);
    setWatchProviders(undefined);

    const validation = validateMovieId(id);
    if (!validation.valid) {
      setError(validation.message || "Invalid movie ID");
      setLoading(false);
      return;
    }

    const movieId = Number(id);

    MovieService.getById(movieId).then((result) => {
      setLoading(false);

      if (!result.success) {
        setError(result.error);
      } else {
        setMovie(result.data);
      }
    });

    MovieService.getRecommendations(movieId).then((result) => {
      if (result.success) {
        setRecommendations(result.data.results.slice(0, 6));
      }
    });

    Promise.all([
      MovieService.getCredits(movieId),
      MovieService.getVideos(movieId),
      MovieService.getWatchProviders(movieId),
    ]).then(([creditsResult, videosResult, providersResult]) => {
      if (creditsResult.success) {
        setCast(creditsResult.data.cast.slice(0, 8));
        setCrew(creditsResult.data.crew);
      }

      if (videosResult.success) {
        setVideos(videosResult.data.results);
      }

      if (providersResult.success) {
        setWatchProviders(providersResult.data.results[WATCH_REGION]);
      }
    });
  }, [id]);

  if (error) {
    return (
      <BaseLayout title="Error">
        <Box
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography color="error">{error}</Typography>
        </Box>
      </BaseLayout>
    );
  }

  if (!movie || loading) {
    return (
      <BaseLayout title="Loading...">
        <Box width="100%">
          <LinearBuffer />
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title={movie.title}>
      {!loading && (
        <Box
          width={{ xs: "94dvw", md: 900, lg: 1100 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
        >
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
            gap={3}
            width="100%"
            alignItems="start"
            sx={(theme) => ({
              position: "relative",
              overflow: "hidden",
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              border: 1,
              borderColor: "divider",
              bgcolor: alpha(
                theme.palette.background.paper,
                theme.palette.mode === "dark" ? 0.72 : 0.9,
              ),
              boxShadow: `0 28px 70px ${alpha(theme.palette.common.black, theme.palette.mode === "dark" ? 0.32 : 0.12)}`,
              "&::before": movie.backdrop_path
                ? {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(90deg, ${alpha(theme.palette.background.default, 0.92)} 0%, ${alpha(theme.palette.background.default, 0.76)} 48%, ${alpha(theme.palette.background.default, 0.9)} 100%), url(${getImageUrl(movie.backdrop_path)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scale(1.02)",
                  }
                : undefined,
              "& > *": {
                position: "relative",
                zIndex: 1,
              },
            })}
          >
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              vote_average={movie.vote_average}
              tagline={movie.tagline}
            />
            <Box width="100%">
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                marginBottom={2}
              >
                {movie.release_date && (
                  <Chip
                    icon={<Icon>calendar_month</Icon>}
                    label={new Date(movie.release_date).getFullYear()}
                    size="small"
                  />
                )}
                {movie.runtime > 0 && (
                  <Chip
                    icon={<Icon>schedule</Icon>}
                    label={`${movie.runtime} min`}
                    size="small"
                  />
                )}
                {movie.genres?.slice(0, 3).map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
              <Typography
                marginBottom={2}
                variant="h5"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Icon>description</Icon> &nbsp; Overview:
              </Typography>
              <Typography
                variant="body1"
                textAlign="justify"
                color="text.secondary"
              >
                {movie.overview || "No overview available."}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                marginTop={2}
              >
                {directors.length > 0 && (
                  <Chip
                    icon={<Icon>movie_filter</Icon>}
                    label={`Directed by ${directors.map((director) => director.name).join(", ")}`}
                    variant="outlined"
                  />
                )}
                {trailer && (
                  <Button
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    startIcon={<Icon>play_circle</Icon>}
                  >
                    Watch trailer
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
          <Grid container spacing={2} width="100%">
            <DetailBox
              icon="theater_comedy"
              title="Genres"
              info={
                movie.genres?.map((genre) => genre.name).join(", ") ||
                "Unavailable"
              }
            />
            <DetailBox
              icon="calendar_month"
              title="Release date"
              info={new Date(movie.release_date).toLocaleDateString("en-US")}
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
              info={movie.runtime + " minutes"}
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
          {(cast.length > 0 || streamingProviders.length > 0) && (
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", lg: "2fr 1fr" }}
              gap={3}
              width="100%"
            >
              {cast.length > 0 && (
                <Box width="100%">
                  <Typography variant="h5" marginBottom={2}>
                    Cast
                  </Typography>
                  <Grid container spacing={2}>
                    {cast.map((member) => (
                      <Grid key={member.id} size={{ xs: 6, sm: 4, md: 3 }}>
                        <Paper
                          elevation={0}
                          sx={{
                            height: "100%",
                            p: 2,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Avatar
                            src={getImageUrl(member.profile_path)}
                            alt={member.name}
                            sx={{
                              width: 72,
                              height: 72,
                              mx: "auto",
                              mb: 1,
                            }}
                          />
                          <Typography variant="body2" fontWeight={700}>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.character}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              {streamingProviders.length > 0 && (
                <Box width="100%">
                  <Typography variant="h5" marginBottom={2}>
                    Where to watch
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      marginBottom={2}
                    >
                      Available providers in {WATCH_REGION}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {streamingProviders.map((provider) => (
                        <Chip
                          key={provider.provider_id}
                          avatar={
                            provider.logo_path ? (
                              <Avatar
                                src={getImageUrl(provider.logo_path)}
                                alt={provider.provider_name}
                              />
                            ) : undefined
                          }
                          label={provider.provider_name}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                    {watchProviders?.link && (
                      <Button
                        href={watchProviders.link}
                        target="_blank"
                        rel="noreferrer"
                        variant="text"
                        endIcon={<Icon>open_in_new</Icon>}
                        sx={{ mt: 2 }}
                      >
                        View availability
                      </Button>
                    )}
                  </Paper>
                </Box>
              )}
            </Box>
          )}
          {recommendations.length > 0 && (
            <Box width="100%">
              <Typography variant="h5" marginBottom={2}>
                You might also like
              </Typography>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                justifyContent="center"
              >
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
                                            compactAction
                                        />
                                    </Grid>
                                ))}
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </BaseLayout>
  );
};

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import { getImageUrl } from "../../services/api/movies/MovieService";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "../../routes/paths";

interface IMovieCardProps {
  id: number;
  title: string;
  tagline?: string;
  poster: string | null;
  vote_average: number;
  showLink?: boolean;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
  id,
  poster,
  title,
  vote_average,
  showLink,
  tagline,
}) => {
  const navigate = useNavigate();
  const moviePath = AppPaths.movieDetails(id);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: showLink ? "translateY(-4px)" : "none",
          boxShadow: 8,
        },
      }}
    >
      <CardActionArea
        disabled={!showLink}
        onClick={() => showLink && navigate(moviePath)}
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "100%" }}
      >
        {poster ? (
          <CardMedia
            component="img"
            image={getImageUrl(poster)}
            title={title}
            sx={{
              aspectRatio: "2 / 3",
              objectFit: "cover",
              width: "100%",
              backgroundColor: "grey.900",
            }}
          />
        ) : (
          <Box
            sx={{
              aspectRatio: "2 / 3",
              width: "100%",
              backgroundColor: "grey.900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ color: "grey.500", fontSize: 48 }}>movie</Icon>
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={1.5}
          >
            <Typography
              variant="body1"
              fontWeight={700}
              sx={{
                lineHeight: 1.25,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "warning.main",
                whiteSpace: "nowrap",
              }}
            >
              <Icon fontSize="inherit">star_rate</Icon>
              {vote_average.toFixed(1)}
            </Typography>
          </Box>
          {tagline && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 1.5 }}
            >
              {tagline}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {showLink && (
        <Box px={2} pb={2}>
          <Button
            variant="contained"
            onClick={() => navigate(moviePath)}
            fullWidth
          >
            Details
          </Button>
        </Box>
      )}
    </Card>
  );
};

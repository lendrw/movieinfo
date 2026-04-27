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
import { alpha } from "@mui/material/styles";
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
  compactAction?: boolean;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
  id,
  poster,
  title,
  vote_average,
  showLink,
  tagline,
  compactAction,
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
        borderRadius: 3,
        overflow: "hidden",
        boxSizing: "border-box",
        bgcolor: "background.paper",
        transition:
          "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        "&:hover": {
          transform: showLink ? "translateY(-6px)" : "none",
          boxShadow: (theme) =>
            `0 24px 56px ${alpha(theme.palette.common.black, theme.palette.mode === "dark" ? 0.38 : 0.16)}`,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.38),
        },
        "&:hover .movie-card-poster": {
          transform: showLink ? "scale(1.035)" : "none",
        },
      }}
    >
      <CardActionArea
        disabled={!showLink}
        onClick={() => showLink && navigate(moviePath)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexGrow: 1,
          height: "100%",
          width: "100%",
          textAlign: "inherit",
          "& .MuiCardActionArea-focusHighlight": {
            backgroundColor: "transparent",
          },
          "&:hover .MuiCardActionArea-focusHighlight": {
            opacity: 0,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "2 / 3",
            overflow: "hidden",
            backgroundColor: "grey.900",
          }}
        >
          {poster ? (
            <CardMedia
              className="movie-card-poster"
              component="img"
              image={getImageUrl(poster)}
              title={title}
              sx={{
                height: "100%",
                objectFit: "cover",
                width: "100%",
                transition: "transform 320ms ease",
              }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon sx={{ color: "grey.500", fontSize: 52 }}>movie</Icon>
            </Box>
          )}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 36%, rgba(0,0,0,0.58) 100%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.45,
              borderRadius: 999,
              color: "primary.contrastText",
              bgcolor: "primary.main",
              boxShadow: (theme) =>
                `0 10px 24px ${alpha(theme.palette.common.black, 0.26)}`,
            }}
          >
            <Icon sx={{ fontSize: 16 }}>star_rate</Icon>
            <Typography variant="caption" fontWeight={800} lineHeight={1}>
              {vote_average.toFixed(1)}
            </Typography>
          </Box>
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.25,
            p: 2,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={0.5}
            sx={{ width: "100%", minWidth: 0 }}
          >
            <Typography
              variant="body1"
              fontWeight={700}
              textAlign="center"
              sx={{
                lineHeight: 1.25,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                width: "100%",
                overflowWrap: "anywhere",
              }}
            >
              {title}
            </Typography>
          </Box>
          {tagline && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {tagline}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {showLink && (
        <Box px={2} pb={2} sx={{ boxSizing: "border-box" }}>
          <Button
            variant="contained"
            endIcon={<Icon>arrow_forward</Icon>}
            onClick={() => navigate(moviePath)}
            fullWidth
            sx={{
              fontSize: compactAction ? "0.75rem" : undefined,
              px: compactAction ? 1 : undefined,
              whiteSpace: "nowrap",
            }}
          >
            View details
          </Button>
        </Box>
      )}
    </Card>
  );
};

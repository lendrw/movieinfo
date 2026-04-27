import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Icon, IconButton, Snackbar, Alert } from "@mui/material";

import { useAppThemeContext } from "../../contexts/ThemeContext";
import { useSearchContext } from "../../contexts";
import { Link, useNavigate } from "react-router-dom";
import { validateSearchQuery, sanitizeSearchQuery } from "../../utils";
import { AppPaths } from "../../routes/paths";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === "light" ? 0.32 : 0.16)}`,
  backgroundColor: alpha(
    theme.palette.common.white,
    theme.palette.mode === "light" ? 0.22 : 0.1,
  ),
  transition: theme.transitions.create([
    "background-color",
    "border-color",
    "box-shadow",
  ]),
  height: 42,
  flex: 1,
  minWidth: 0,
  "&:hover": {
    backgroundColor: alpha(
      theme.palette.common.white,
      theme.palette.mode === "light" ? 0.3 : 0.16,
    ),
    borderColor: alpha(
      theme.palette.common.white,
      theme.palette.mode === "light" ? 0.46 : 0.28,
    ),
  },
  "&:focus-within": {
    backgroundColor: alpha(
      theme.palette.common.white,
      theme.palette.mode === "light" ? 0.36 : 0.18,
    ),
    borderColor: alpha(theme.palette.primary.main, 0.72),
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 auto",
    width: 260,
  },
  [theme.breakpoints.up("md")]: {
    width: 340,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.white, 0.86),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "100%",
  width: "100%",
  alignItems: "center",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 1, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(2),
    height: "100%",
    boxSizing: "border-box",
    "&::placeholder": {
      color: alpha(theme.palette.common.white, 0.78),
      opacity: 1,
    },
  },
}));

export const Navbar: React.FC = () => {
  const { themeName, toggleTheme } = useAppThemeContext();
  const { setQuery } = useSearchContext();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      const sanitized = sanitizeSearchQuery(value);
      const validation = validateSearchQuery(sanitized);

      if (!validation.valid) {
        setSnackbarMessage(validation.message || "Invalid search");
        setSnackbarOpen(true);
        return;
      }

      navigate(AppPaths.search(sanitized));
    } else {
      navigate(AppPaths.home);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1.5 }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={AppPaths.home}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "inline-flex" },
              alignItems: "center",
              gap: 1,
              color: "#ffffff",
              textDecoration: "none",
              cursor: "pointer",
              fontWeight: 900,
              letterSpacing: 0,
            }}
          >
            <Icon sx={{ color: "primary.main" }}>local_movies</Icon>
            MovieInfo
          </Typography>
          <IconButton
            component={Link}
            to={AppPaths.home}
            aria-label="go-home"
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <Icon>local_movies</Icon>
          </IconButton>
          <IconButton onClick={toggleTheme} aria-label="toggle-theme">
            <Icon>{themeName === "dark" ? "dark_mode" : "light_mode"}</Icon>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

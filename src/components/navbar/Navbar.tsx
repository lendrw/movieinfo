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
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "5%",
  width: "85%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Navbar: React.FC = () => {
  const { themeName, toggleTheme } = useAppThemeContext();
  const { setQuery } = useSearchContext();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      const sanitized = sanitizeSearchQuery(value);
      const validation = validateSearchQuery(sanitized);
      
      if (!validation.valid) {
        setSnackbarMessage(validation.message || 'Invalid search');
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
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={AppPaths.home}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            MovieInfo
          </Typography>
          <IconButton
            component={Link}
            to={AppPaths.home}
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
          >
            <Icon>arrow_back</Icon>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

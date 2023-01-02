import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  CssBaseline,
  Menu,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useAuth from "../things_for_auth/useAuth";
import useAxiosWithJWT from "../things_for_auth/useAxiosWithJWT";
import { styles } from "../style";

export function MyAppBar() {
  const [success, setSuccess] = useState(false);
  const [dark, setDark] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const axiosWithJWT = useAxiosWithJWT();
  const { auth } = useAuth();

  const loggedUser = sessionStorage.getItem("name");

  useEffect(() => {
    if (success) {
      auth.name = "";
      auth.accessToken = "";
      navigate("/", { replace: true });
    }
  }, [success]);

  const handleClick = (event) => {
    setSuccess(false);
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axiosWithJWT.post(
        "/logOut",
        JSON.stringify({ username: loggedUser })
      );
      setSuccess(true);
    } catch (error) {
      console.log(error?.response);
    }
    sessionStorage.removeItem("name");
    handleClose();
  };

  const toggleDarkMode = () => {
    setDark(!dark);
    sessionStorage.setItem("darkMode", !dark);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        sx={styles.appbar}
        position="fixed"
        color="primary">
        <Toolbar>
          <Typography
            sx={styles.title}
            variant="h6">
            Schedge To The Edge
          </Typography>
          <IconButton onClick={toggleDarkMode}>
            <DarkModeIcon />
          </IconButton>

          {loggedUser ? (
            <>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <AccountCircleIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}>
                <MenuItem disabled> Hello {loggedUser} </MenuItem>
                <hr />
                <MenuItem onClick={handleLogout}>
                  LogOut
                  <LogoutIcon />
                </MenuItem>
              </Menu>
            </>
          ) : (
            []
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

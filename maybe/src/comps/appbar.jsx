import { Typography, AppBar, Toolbar, IconButton, MenuList, MenuItem, CssBaseline, Stack, Paper, ClickAwayListener, Menu } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useAuth from '../things_for_auth/useAuth';
import { styles } from '../style';

export function MyAppBar() {

    let location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    // const { auth } = useAuth(); // get current user
    // const loggedUser = auth.name;

    // useEffect(() => {
    //     { location === 'In' ? { flexGrow: `0.66` } : { flexGrow: `1` } }
    //     console.log("changed");
    // }, [location])

    return (
        <>
            <CssBaseline />

            <AppBar
                sx={styles.appbar}
                position="fixed"
                color="primary"
            >
                <Toolbar >
                    {/* <Stack flexDirection='row' justifyContent='space-evenly'> */}

                    <Typography
                        sx={styles.title}
                        variant='h6'
                    >
                        Schedge To The Edge
                    </Typography>


                    <IconButton
                        id='open-button'
                        onClick={handleClick}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                    >
                        <AccountCircleIcon />
                    </IconButton>

                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'open-button',
                                }}>
                                <MenuList
                                    autoFocusItem={open}
                                    aria-labelledby="composition-button"
                                >
                                    <MenuItem onClick={handleClose}>
                                        LogOut <LogoutIcon />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </ClickAwayListener>
                    </Paper>
                </Toolbar>
            </AppBar>

            <Toolbar />
        </>
    );
}
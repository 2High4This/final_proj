import { Typography, AppBar, Toolbar, IconButton, Drawer, CssBaseline, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';

import useAuth from '../things_for_auth/useAuth';
import { styles } from '../style';

export function MyAppBar() {

    const { auth } = useAuth(); // get current user
    const loggedUser = auth.name;

    const [openDrawer, setOpenDrawer] = useState(false);

    // const toggleDrawer = ((change) => {
    //     // if (openDrawer) {
    //     //     styles.appbar.width = '100%';
    //     // } else {
    //     //     styles.appbar.width = `calc(100% - ${drawerWidth}px)`;
    //     // }
    //     setOpenDrawer(change);
    // });

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
                        sx={{ flexGrow: `0.66` }}
                        variant='h6'
                    >
                        Schedge To The Edge
                    </Typography>

                    <Typography
                        sx={{ flexGrow: `1` }}
                        variant='h6'
                    >
                        Hello {loggedUser}
                    </Typography>

                    <IconButton
                        onClick={() => setOpenDrawer(true)}
                    >
                        <ListIcon />
                    </IconButton>
                    {/* </Stack> */}
                    <Stack flexDirection='column'>
                        <Drawer
                            sx={styles.drawer}
                            open={openDrawer}
                            anchor='right'
                        >
                            <IconButton
                                onClick={() => { setOpenDrawer(false) }}>
                                <CloseIcon />
                            </IconButton>
                            <Typography paddingLeft={1}>
                                Item one
                            </Typography>
                            <Typography paddingLeft={1}>
                                Item two
                            </Typography>
                        </Drawer>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Toolbar />
        </>
    );
}
import { Typography, AppBar, Toolbar, IconButton, Drawer, CssBaseline, Stack } from '@mui/material';
// import { Box } from "@mui/system";
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

import { styles, drawerWidth } from '../style';


export function MyAppBar() {

    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = ((change) => {
        // if (openDrawer) {
        //     styles.appbar.width = '100%';
        // } else {
        //     styles.appbar.width = `calc(100% - ${drawerWidth}px)`;
        // }
        setOpenDrawer(change);
    });

    return (
        <>
            <CssBaseline />

            <AppBar
                sx={styles.appbar}
                position="fixed"
                color="primary"
            >
                <Toolbar >
                    <Typography
                        sx={styles.title}
                    >
                        Schedge To The Edge
                    </Typography>

                    <IconButton
                        onClick={() => setOpenDrawer(true)}
                    >
                        <ListIcon />
                    </IconButton>
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
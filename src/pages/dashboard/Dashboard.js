import React, { useMemo, useState } from 'react'
import {
    Box,
    Toolbar,
    CssBaseline,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import { AppBar } from '@mui/material/Appbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const navigate = useNavigate();

    function handleDrawerOpen() {
        setOpen(true)
    }

    const darkTheme = useMemo(
        () => createTheme({
            palette: {
                mode: dark ? 'dark' : 'light',
            },
        }),
        [dark]
    );

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Box sc={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open} sx={{ background: 'linear-gradient(180deg, #FF95B5 0%, #C93A87 100%) ' }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...Dashboard(open && { display: 'none' })
                                }}
                            >
                                <Menu />
                            </IconButton>
                            <Tooltip title="Go back to home page">
                                <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                                    <Home />
                                </IconButton>
                            </Tooltip>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flezGrow: 1 }}
                            >
                                FF Back Officr
                            </Typography>
                            <IconButton onClick={() => setDark(!dark)}>
                                {dark ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        </div>
    )
}
